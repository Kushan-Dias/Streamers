<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestController extends BaseController
{
  public function studentContractTest(Request $request): JsonResponse
  {
    return $this->sendResponse('It works at: /user/create', []);
  }
}
