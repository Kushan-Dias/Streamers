<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends BaseController
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
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $permissions = Permission::with('roles:id,name,title')->get();

    $message = __('allPermissions');
    $data['count'] = count($permissions);
    $data['permissions'] = $permissions;

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
      'name' => 'required|unique:permissions,name',
      'title' => 'required|unique:permissions,title',
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $permission = Permission::create(['name' => $request->input('name'), 'title' => $request->input('title')]);

    $message = __('permissionCreated');
    $data['permission'] = $permission;

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
    $permission = Permission::where('id', $id)->with('roles:id,name,title')->get();

    if (count($permission) === 0) {
      return $this->notFound();
    }

    $message = __('permissionFound');
    $data['permission'] = $permission;

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
    $permission = Permission::find($id);

    if ($permission) {
      $permission->update($request->only('title'));

      $message = __('permissionUpdated');
      $data = [
        'permission' => $permission,
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
    $permission = Role::find($id);

    if ($permission) {
      Role::destroy($id);

      $message = __('roleDeleted');
      $data = [
        'permission' => $permission,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
