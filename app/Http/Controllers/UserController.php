<?php

namespace App\Http\Controllers;

use App\Models\ContractTemplate;
use App\Models\OneFlowAccount;
use App\Models\User;
use App\Repositories\EmailRepository;
use App\Services\Constants;
use App\Services\ContractService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends BaseController
{
  use RegistersUsers;

  private EmailRepository $emailRepository;

  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct(EmailRepository $emailRepository)
  {
    $this->middleware('auth:api');
    $this->middleware('role_or_permission:super-admin|manager|list-users')->only('index', 'datatable', 'role');
    $this->middleware('role_or_permission:super-admin|manager|create-user')->only('store');
    $this->middleware('role_or_permission:super-admin|manager|view-user')->only('show');
    $this->middleware('role_or_permission:super-admin|manager|edit-user')->only('update');
    $this->middleware('role_or_permission:super-admin|manager|delete-user')->only('delete');

    $this->emailRepository = $emailRepository;
  }

  /**
   * Fetch data into the Datatable.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function datatable(Request $request): JsonResponse
  {
    $user_data = [];

    $columns_list = [
      0 => 'created_at',
      1 => 'first_name',
      2 => 'last_name',
      3 => 'gender',
      4 => 'email',
      5 => 'roles',
      6 => 'created_at',
      7 => 'status',
    ];

    $draw = $request->input('draw');
    $recordsTotal = User::count();
    $recordsFiltered = $recordsTotal;

    $length = $request->input('length');
    $start = $request->input('start');
    $order = $columns_list[$request->input('order.0.column')];
    $dir = $request->input('order.0.dir');

    if (empty($request->input('search.value'))) {
      $user_data = User::offset($start)
        ->with('roles:name,title')
        ->limit($length)
        ->orderBy($order, $dir)
        ->get();
    } else {
      $search_text = $request->input('search.value');

      $user_data = User::where('first_name', 'LIKE', "%{$search_text}%")
        ->orWhere('last_name', 'LIKE', "%{$search_text}%")
        ->offset($start)
        ->limit($length)
        ->orderBy($order, $dir)
        ->with('roles:name,title')
        ->get();

      $recordsFiltered = count($user_data);
    }

    $message = __('All users');
    $data['draw'] = $draw;
    $data['recordsTotal'] = $recordsTotal;
    $data['recordsFiltered'] = $recordsFiltered;
    $data['data'] = $user_data;

    return $this->sendResponse($message, $data);
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $users = User::with('roles:name,title')
      ->get();

    if ($users) {
      $message = __('All users');
      $data = [
        'count' => count($users),
        'users' => $users,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Create a new user instance after a valid registration.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request): JsonResponse
  {
    $rules = [
      'first_name' => ['required', 'string', 'max:25'],
      'last_name' => ['required', 'string', 'max:50'],
      'username' => ['required', 'string', 'max:255', 'unique:users'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'string', 'min:8'],
      'confirm_password' => ['required', 'string', 'same:password'],
      'address_one' => ['required', 'string'],
      'address_two' => ['required', 'string'],
      'role' => ['required', 'integer'],
    ];
  
    $messages = [
      'confirm_password.same' => 'Passwords do not match',
    ];

    $validator = $this->validator($request->all(), $rules, $messages);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $user = User::create([
      'first_name' => $request['first_name'],
      'last_name' => $request['last_name'],
      'username' => $request['username'],
      'email' => $request['email'],
      'password' => Hash::make($request['password']),
      'gender' => $request['gender'],
      'country_id' => $request['country_id'],
      'address_one' => $request['address_one'],
      'address_two' => $request['address_two'],
      'status' => Constants::ACTIVE,
      'must_change_password' => true,
    ]);

    $role = Role::find($request['role']);

    if ($role) {
      $user->assignRole([$role->id]);
    }

    if ($role->name === 'student') {
      $user->login_code = Str::random(32);
      $user->save();
    }

    $emailParams = [
      'subject' => 'Welcome to Unilivin',
      'addressData' => [  // all addresses and names
        'toEmail' => $user->email,
        'toName' => $user->first_name . ' ' . $user->last_name,
        'fromEmail' => 'noreply@unilivin.com',
        'fromName' => 'UnilivinTeam',
      ],
      'emailData' => [ // all variables for email
        'appName' => env('APP_NAME'),
        'appUrl' => env('APP_URL'),
        'firstName' => $user->first_name,
        'password' => $request['password'],
        'tenantLoginUrl' => tenant('id') . '.' . env('FRONT_URL') . '/login' // Todo: Set QR scan URL
      ],
    ];

    $this->emailRepository->sendMail($emailParams, 'emails.welcome');
    event(new Registered($user));

    $contractResponse = [];
    if ($role->name === 'student') {
      $contract_templates = ContractTemplate::where('role_id', $role->id)->where('status', Constants::ACTIVE)->get(['id', 'workspace_id', 'name']);
      $oneFlowAccount = tenancy()->central(function ($tenant) {
        return OneFlowAccount::where('tenant_id', $tenant->id)->first();
      });

      foreach ($contract_templates as $template) {
        $contractCreate = ContractService::createOneFlowContract($template, $oneFlowAccount, $user);
        if ($contractCreate->ok()) {
          $contractResponse[$template['id']]['create'] = $contractCreate->json();

          $contractPublish = ContractService::publishOneFlowContract($template, $oneFlowAccount, $contractCreate['id']);
          if ($contractPublish->ok()) {
            $contractResponse[$template['id']]['publish'] = $contractPublish->json();
            $contractResponse[$template['id']]['contract'] = ContractService::createContract($template['id'], $contractPublish, $user['id']);
          }

          if ($contractPublish->failed()) {
            $contractResponse[$template['id']]['error'] = [
              "message" => "Error publishing " . $template['name'],
              "details" => $contractPublish->json(),
            ];
            Log::error($contractPublish->body());
          }

          if ($contractPublish->serverError()) {
            $contractResponse[$template['id']]['error'] = [
              "message" => "Server error occurred publishing " . $template['name'],
              "details" => $contractPublish->json(),
            ];
            Log::error($contractPublish->body());
          }
        }

        if ($contractCreate->failed()) {
          $contractResponse[$template['id']]['error'] = [
            "message" => "Error creating " . $template['name'],
            "details" => $contractCreate->json(),
          ];
          Log::error($contractCreate->body());
        }

        if ($contractCreate->serverError()) {
          $contractResponse[$template['id']]['error'] = [
            "message" => "Server error occurred creating " . $template['name'],
            "details" => $contractCreate->json(),
          ];
          Log::error($contractCreate->body());
        }
      }

      $data['contract_templates'] = $contract_templates;
      $data['contracts'] = $contractResponse;
    }

    $message = __('userRegistrationSuccessful');
    $data['user'] = $user;

    return $this->sendResponse($message, $data);
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return JsonResponse
   */
  public function show(int $id): JsonResponse
  {
    if (tenant('id')) {
      $user = User::where('id', $id)
        ->with('roles:id,name,title')
        ->with('contracts')
        ->first();
      if ($user) {
        $user['tenant_id'] = tenant('id');
        $user['avatar_url'] = $user->getFirstMediaUrl('avatars', 'thumb');
      }
    } else {
      $user = User::where('id', $id)
        ->with('roles:id,name,title')
        ->first();
    }

    if ($user) {
      $message = __('User found');
      $data['user'] = $user;

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
   * @param int $id
   * @return JsonResponse
   */
  public function update(Request $request, int $id): JsonResponse
  {
    $user = User::find($id);

    if ($user) {
      $user->update($request->all());

      if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
        Log::debug($request);
        $user->clearMediaCollection('avatars');
        $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');
      }

      $message = __('User updated successfully');
      $data = [
        'user' => $user,
        'access_token' => auth()->login($user),
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
   * @param int $id
   * @return JsonResponse
   */
  public function destroy(int $id): JsonResponse
  {
    $user = User::find($id);

    if ($user) {
      User::destroy($id);

      $message = __('User deleted successfully');
      $data = [
        'user' => $user
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Get users with role Maintainer
   *
   * @param mixed $nameOrId
   * @return JsonResponse
   */
  public function role(mixed $nameOrId): JsonResponse
  {
    $maintainers = User::whereHas("roles", function ($q) use ($nameOrId) {
      $q->where("id", $nameOrId)
        ->orWhere("name", $nameOrId);
    })->get();

    $message = __('Users with role');
    $data['count'] = count($maintainers);
    $data['maintainers'] = $maintainers;

    return $this->sendResponse($message, $data);
  }
}
