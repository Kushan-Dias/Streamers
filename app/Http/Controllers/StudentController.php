<?php

namespace App\Http\Controllers;

use App\Http\Middleware\EnsureContractIsSigned;
use Illuminate\Http\JsonResponse;

class StudentController extends BaseController
{
  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api');
    $this->middleware('role:student');
    $this->middleware(EnsureContractIsSigned::class);
  }

  public function dashboard(): JsonResponse
  {
    $message = "You have entered the Student Dashboard";
    $data['user'] = auth()->payload();

    return $this->sendResponse($message, $data);
  }
}
