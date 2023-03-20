<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Spatie\Permission\Models\Role;

class RoleController extends BaseController
{
  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api');
    $this->middleware('role:super-admin|manager');
    $this->middleware('role_or_permission:super-admin|manager|assign-permission')->only('syncRoleWithPermissions', 'syncRolesWithPermissions');
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $roles = Role::with('permissions:id,name,title')->get();

    $message = __('allRoles');
    $data['count'] = count($roles);
    $data['roles'] = $roles;

    if ($roles === null) {
      $message = __('allRoles');
    }

    return $this->sendResponse($message, $data);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request): JsonResponse
  {
    $rules = [
      'name' => ['required', 'unique:roles,name'],
      'title' => ['required', 'unique:roles,title'],
      'permissions' => ['array'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }


    $role = Role::create(['name' => $request->input('name'), 'title' => $request->input('title')]);

    $data['role'] = $role;
    $message = __('roleCreated');

    if ($request->input('permissions')) {
      $role->syncPermissions($request->input('permissions'));

      $data['role'] = $role;
      $message = __('roleCreatedWithPermissions');
    }

    Artisan::call('cache:forget spatie.permission.cache');

    return $this->sendResponse($message, $data);
  }

  /**
   * Sync Permissions to a Role.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function syncRoleWithPermissions(Request $request): JsonResponse
  {
    $rules = [
      'role_name' => ['required', ':roles,name', 'string'],
      'permissions' => ['required', 'array'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $role = Role::findByName($request->input('role_name'));
    $role->syncPermissions($request->input('permissions'));

    Artisan::call('cache:forget spatie.permission.cache');

    $data['role'] = $role;
    $message = __('roleSyncedWithPermissions');

    return $this->sendResponse($message, $data);
  }

  /**
   * Sync multiple Roles and Permissions.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function syncRolesWithPermissions(Request $request): JsonResponse
  {
    $rules = [
      'roles_permissions' => ['required'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $roles_permissions = $request->input('roles_permissions');

    foreach ($roles_permissions as $role_name => $permissions) {
      $role = Role::findByName($role_name);
      if (!empty($role)) {
        $role->syncPermissions($permissions);
      }
    }

    Artisan::call('cache:forget spatie.permission.cache');

    $data['role'] = '$role';
    $message = __('roleSyncedWithPermissions');

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
    $role = Role::where('id', $id)->with('permissions:id,name,title')->get();

    if (count($role) === 0) {
      return $this->notFound();
    }

    $data['role'] = $role;
    $message = __('roleFound');

    return $this->sendResponse($message, $data);
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
    $role = Role::find($id);

    if ($role) {
      $role->update($request->only('title'));

      $message = __('roleUpdated');
      $data = [
        'role' => $role,
      ];

      Artisan::call('cache:forget spatie.permission.cache');

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
    $role = Role::find($id);

    if ($role) {
      Role::destroy($id);

      $message = __('roleDeleted');
      $data = [
        'role' => $role,
      ];

      Artisan::call('cache:forget spatie.permission.cache');

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
