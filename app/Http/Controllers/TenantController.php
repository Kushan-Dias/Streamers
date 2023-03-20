<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use App\Repositories\EmailRepository;
use App\Services\Constants;
use Exception;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TenantController extends BaseController
{
  private EmailRepository $emailRepository;
  private User $tenant_admin;

  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct(EmailRepository $emailRepository)
  {
    $this->middleware('auth:api');
    $this->middleware('role:super-admin');

    $this->emailRepository = $emailRepository;
  }

  /**
   * List all resources.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $tenants = Tenant::with('domains')->with('one_flow_account')->get();

    if ($tenants) {
      $message = __('allTenants');
      $data = [
        'count' => count($tenants),
        'tenants' => $tenants,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Store a newly created resource in storage after validation.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request): JsonResponse
  {
    $rules = [
      'domain' => ['required', 'alpha_num', 'min:3', 'max:10'],
      'name' => ['required', 'string', 'max:255'],
      'plan' => ['required', 'string', 'max:10'],
      'status' => ['string', 'max:10'],
      'first_name' => ['required', 'string', 'max:25'],
      'last_name' => ['required', 'string', 'max:50'],
      'username' => ['required', 'string', 'max:255', 'unique:users'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'string', 'min:8'],
      'confirm_password' => ['required', 'string', 'same:password'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $tenant_params = $request->only(['domain', 'name', 'plan', 'status']);
    $tenant_params['id'] = $request['domain'];

    $tenant = Tenant::create($tenant_params);

    $domain = $tenant->domains()->create($request->only('domain'));

    $tenant->run(function () use ($request) {
      $this->tenant_admin = User::create([
        'first_name' => $request['first_name'],
        'last_name' => $request['last_name'],
        'username' => $request['username'],
        'email' => $request['email'],
        'password' => Hash::make($request['password']),
        'status' => Constants::ACTIVE,
        'must_change_password' => true,
      ]);

      $role = new Role();

      try {
        $role = Role::findByName('manager');

        if (!$role) {
          $role = Role::create([
            'name' => 'manager',
            'title' => 'Manager',
            'guard_name' => 'api'
          ]);
        }
      } catch (Exception $e) {
        if ($e instanceof RoleDoesNotExist) {
          $role = Role::create([
            'name' => 'manager',
            'title' => 'Manager',
            'guard_name' => 'api'
          ]);
        }
      }

      $permissions = Permission::pluck('id', 'id')->all();
      $role->syncPermissions($permissions);

      $this->tenant_admin->assignRole($role->id);

      if ($this->tenant_admin->markEmailAsVerified()) {
        event(new Verified($this->tenant_admin));
      }
    });

    $emailParams = [
      'subject' => 'Welcome to Unilivin',
      'addressData' => [  // all addresses and names
        'toEmail' => $this->tenant_admin->email,
        'toName' => $this->tenant_admin->first_name . ' ' . $this->tenant_admin->last_name,
        'fromEmail' => 'noreply@unilivin.com',
        'fromName' => 'UnilivinTeam',
      ],
      'emailData' => [ // all variables for email
        'appName' => env('APP_NAME'),
        'appUrl' => env('APP_URL'),
        'firstName' => $this->tenant_admin->first_name,
        'password' => $request['password'],
        'tenantLoginUrl' => $tenant->id . '.' . env('FRONT_URL') . '/login'
      ],
    ];

    $this->emailRepository->sendMail($emailParams, 'emails.welcome');

    $message = __('tenantCreated');
    $data['domain'] = strtolower($domain->domain);
    $data['name'] = $tenant->name;
    $data['base_url'] = request()->secure() ? 'https://' : 'http://' . $domain->domain . '.' . $request->getHttpHost();
    $data['tenant_admin'] = $this->tenant_admin->first_name . " " . $this->tenant_admin->last_name;
    $data['tenant_admin_email'] = $this->tenant_admin->email;

    return $this->sendResponse($message, $data);
  }

  /**
   * Display the specified resource.
   *
   * @param string $id
   * @return JsonResponse
   */
  public function show(string $id): JsonResponse
  {
    $tenant = Tenant::where('id', $id)
      ->with('domains')->with('one_flow_account')
      ->first();

    if ($tenant) {
      $message = __('tenantFound');
      $data['tenant'] = $tenant;

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param Request $request
   * @param string $id
   * @return JsonResponse
   */
  public function update(Request $request, string $id): JsonResponse
  {
    $tenant = Tenant::find($id);

    if ($tenant) {
      $tenant->update($request->except('id', 'domain'));

      $message = __('tenantUpdated');
      $data = [
        'tenant' => $tenant,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param string $id
   * @return JsonResponse
   */
  public function destroy(string $id): JsonResponse
  {
    $tenant = Tenant::find($id);

    if ($tenant) {
      Tenant::destroy($id);

      $message = __('tenantDeleted');
      $data = [
        'tenant' => $tenant,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
