<?php

namespace App\Http\Controllers;

use App\Models\OneFlowAccount;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OneFlowAccountController extends BaseController
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
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $oneFlowAccounts = OneFlowAccount::with('tenant')->get();

    if ($oneFlowAccounts) {
      $message = __('allOneFlowAccounts');
      $data = [
        'count' => count($oneFlowAccounts),
        'oneflow_accounts' => $oneFlowAccounts,
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
   * @return JsonResponse
   */
  public function store(Request $request): JsonResponse
  {
    $rules = [
      'tenant_id' => ['required', 'unique:one_flow_accounts,tenant_id', 'exists:tenants,id'],
      'title' => ['required', 'string'],
      'name' => ['required', 'string'],
      'email' => ['required', 'email'],
      'token' => ['required', 'string'],
      'mobile' => ['required', 'string'],
      'country_code' => ['required', 'string'],
    ];

    $validator = $this->validator($request->except('id'), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $oneFlowAccount = OneFlowAccount::create($request->all());

    $data['oneflow_account'] = $oneFlowAccount;
    $message = __('oneFlowAccountAdded');

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
    $oneFlowAccount = OneFlowAccount::where('id', $id)->with('tenant')->first();

    if ($oneFlowAccount) {
      $data['oneflow_account'] = $oneFlowAccount;
      $message = __('oneFlowAccountFound');

      return $this->sendResponse($message, $data);
    }

    return $this->notFound();
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
    $rules = [
      'tenant_id' => ['required', 'exists:tenants,id'],
      'name' => ['required', 'string'],
      'email' => ['required', 'email'],
      'token' => ['required', 'string'],
      'mobile' => ['required', 'string'],
      'country_code' => ['required', 'string'],
    ];

    $validator = $this->validator($request->except('id'), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $oneFlowAccount = OneFlowAccount::find($id);

    if ($oneFlowAccount) {
      $oneFlowAccount->update($request->except('id'));

      $message = __('oneFlowAccountUpdated');
      $data = [
        'oneflow_account' => $oneFlowAccount,
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
  public
  function destroy(int $id): JsonResponse
  {
    $oneFlowAccount = OneFlowAccount::find($id);

    if ($oneFlowAccount) {
      OneFlowAccount::destroy($id);

      $message = __('oneFlowAccountDeleted');
      $data = [
        'oneflow_account' => $oneFlowAccount,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
