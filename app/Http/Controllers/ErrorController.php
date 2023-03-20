<?php

namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;

class ErrorController extends BaseController
{
  /**
   * Display the specified resource.
   *
   * @return JsonResponse
   */
  public function tenantNotActive(): JsonResponse
  {
    $message = __('tenantIsInactive');
    $data['reason'] = 'tenant-inactive';

    return $this->sendError($message, $data, 403);
  }

  /**
   * Display the specified resource.
   *
   * @return JsonResponse
   */
  public function contractsNotSigned(): JsonResponse
  {
    $message = __('contractsNotSigned');
    $data['reason'] = 'contracts-not-signed';

    return $this->sendError($message, $data, 403);
  }
}
