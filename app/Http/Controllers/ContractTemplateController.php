<?php

namespace App\Http\Controllers;

use App\Models\ContractTemplate;
use App\Models\Tenant;
use App\Services\Constants;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContractTemplateController extends BaseController
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
   * Display a listing of the resource.
   *
   * @param string $tenant_id
   * @return JsonResponse
   */
  public function index(string $tenant_id): JsonResponse
  {
    $tenant = Tenant::where('id', $tenant_id)->first();

    if (!$tenant) {
      $message = __('resourceNotFound');
      $data['reason'] = 'resource-not-found';

      return $this->sendError($message, $data);
    }

    $contractTemplates = $tenant->run(function () {
      $contractTemplates = ContractTemplate::with('role')
        ->get();

      if (!$contractTemplates) {
        return null;
      }

      return $contractTemplates->toArray();
    });

    if ($contractTemplates !== null) {
      $message = __('allContractTemplates');
      $data = [
        'count' => count($contractTemplates),
        'templates' => $contractTemplates,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @param string $tenant_id
   * @return JsonResponse
   */
  public function store(Request $request, string $tenant_id): JsonResponse
  {
    $rules = [
      'template_id' => ['required', 'integer'],
      'workspace_id' => ['required', 'integer'],
      'name' => ['required', 'string'],
      'version' => ['required', 'integer'],
      'role_id' => ['required', 'integer'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $tenant = Tenant::where('id', $tenant_id)->first();

    if (!$tenant) {
      $message = __('resourceNotFound');
      $data['reason'] = 'resource-not-found';

      return $this->sendError($message, $data);
    }

    $contractTemplate = $tenant->run(function () use ($request) {
      $contractTemplate = ContractTemplate::find($request['template_id']);

      if ($contractTemplate) {
        return null;
      }

      return ContractTemplate::create([
        'id' => $request['template_id'],
        'workspace_id' => $request['workspace_id'],
        'name' => $request['name'],
        'version' => $request['version'],
        'role_id' => $request['role_id'],
        'status' => $request['status'] ? $request['status'] : Constants::ACTIVE,
      ]);
    });

    if ($contractTemplate) {
      $message = __('contractTemplateAdded');
      $data['template'] = $contractTemplate;

      return $this->sendResponse($message);
    }

    $message = __('contractTemplateExists');
    $data['reason'] = 'template-already-exists';

    return $this->sendError($message, $data, 409);
  }

  /**
   * Display the specified resource.
   *
   * @param string $tenant_id
   * @param int $id
   * @return JsonResponse
   */
  public function show(string $tenant_id, int $id): JsonResponse
  {
    $tenant = Tenant::where('id', $tenant_id)->first();

    if (!$tenant) {
      $message = __('resourceNotFound');
      $data['reason'] = 'resource-not-found';

      return $this->sendError($message, $data);
    }

    $contractTemplate = $tenant->run(function () use ($id) {
      $contractTemplate = ContractTemplate::where('id', $id)->first();

      if (!$contractTemplate) {
        return null;
      }

      return $contractTemplate->toArray();
    });

    if ($contractTemplate) {
      $data['template'] = $contractTemplate;
      $message = __("messages.contractTemplateFound");

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
   * @param string $tenant_id
   * @param int $id
   * @return JsonResponse
   */
  public function update(Request $request, string $tenant_id, int $id): JsonResponse
  {
    $rules = [
      'template_id' => ['required', 'integer'],
      'workspace_id' => ['required', 'integer'],
      'name' => ['required', 'string'],
      'version' => ['required', 'integer'],
      'role_id' => ['required', 'integer'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $tenant = Tenant::where('id', $tenant_id)->first();

    if (!$tenant) {
      $message = __('resourceNotFound');
      $data['reason'] = 'resource-not-found';

      return $this->sendError($message, $data);
    }

    $contractTemplate = $tenant->run(function () use ($request, $id) {
      $contractTemplate = ContractTemplate::where('id', $id)->first();

      if (!$contractTemplate) {
        return null;
      }

      $contractTemplate->update($request->all());

      return $contractTemplate->toArray();
    });

    if ($contractTemplate) {
      $message = __('contractTemplateUpdated');
      $data['template'] = $contractTemplate;

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param string $tenant_id
   * @param int $id
   * @return JsonResponse
   */
  public function destroy(string $tenant_id, int $id): JsonResponse
  {
    $tenant = Tenant::where('id', $tenant_id)->first();

    if (!$tenant) {
      $message = __('resourceNotFound');
      $data['reason'] = 'resource-not-found';

      return $this->sendError($message, $data);
    }

    $contractTemplate = $tenant->run(function () use ($id) {
      $contractTemplate = ContractTemplate::where('id', $id)->first();

      if (!$contractTemplate) {
        return null;
      }

      ContractTemplate::destroy($id);

      return $contractTemplate->toArray();
    });

    if ($contractTemplate) {
      $message = __('contractTemplateDeleted');
      $data['template'] = $contractTemplate;

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
