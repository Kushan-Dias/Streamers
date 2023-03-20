<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Services\CustomModules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModuleController extends BaseController
{
  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api');
    $this->middleware('role:super-admin');
  }

  /**
   * List all resources.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $allModules = CustomModules::getAllModules();

    $message = __('allModules');
    $data = [
      'count' => count($allModules),
      'modules' => $allModules,
    ];

    return $this->sendResponse($message, $data);
  }

  /**
   * List modules of Tenant
   *
   * @param string $id
   * @return JsonResponse
   */
  public function tenantModules(string $id): JsonResponse
  {
    $tenant = Tenant::find($id);

    if ($tenant) {
      $tenantModules = CustomModules::getTenantModules($id);

      $message = __('tenantModules');
      $data = [
        'count' => $tenantModules != null ? count($tenantModules) : 0,
        'modules' => $tenantModules != null ? $tenantModules : [],
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Update modules of Tenant
   *
   * @param string $id
   * @param Request $request
   * @return JsonResponse
   */
  public function addUpdateTenantModules(string $id, Request $request): JsonResponse
  {
    $rules = [
      'modules' => ['required'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $tenant = Tenant::find($id);

    if ($tenant) {
      $updatedModules = CustomModules::addUpdateTenantModules($id, $request->only('modules'));

      $message = __('tenantModules');
      $data = [
        'count' => count($updatedModules),
        'modules' => $updatedModules,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Remove modules of Tenant
   *
   * @param string $id
   * @param Request $request
   * @return JsonResponse
   */
  public function removeTenantModules(string $id, Request $request): JsonResponse
  {
    $rules = [
      'modules' => ['required'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $tenant = Tenant::find($id);

    if ($tenant) {
      $removedModules = CustomModules::removeTenantModules($id, $request->only('modules'));

      $message = __('removedModules');
      $data = [
        'count' => count($removedModules),
        'modules' => $removedModules,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
