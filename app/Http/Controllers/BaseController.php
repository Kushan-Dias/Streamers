<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller as Controller;
use App\Services\Constants;
use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;


class BaseController extends Controller
{
  /**
   * Get a validator for an incoming request.
   *
   * @param array $data
   * @param array $rules
   * @param array $messages
   * @return Validation
   */
  protected function validator(array $data, array $rules, array $messages = []): Validation
  {
    return Validator::make($data, $rules, $messages);
  }

  /**
   * Success response method.
   *
   * @param mixed $data
   * @param string $message
   * @param int $code
   * @return JsonResponse
   */
  public function sendResponse(string $message, mixed $data = [], int $code = 200): JsonResponse
  {
    $response = [
      'status' => $code,
      'success' => true,
      'message' => $message,
      'data' => $data,
    ];

    return response()->json($response, $code);
  }

  /**
   * Return error response.
   *
   * @param string $error
   * @param array $errorMessages
   * @param int $code
   * @return JsonResponse
   */
  public function sendError(string $error, array $errorMessages = [], int $code = 404): JsonResponse
  {
    $response = [
      'status' => $code,
      'success' => false,
      'message' => $error,
      'data' => [],
    ];

    if (!empty($errorMessages)) {
      $response['data'] = $errorMessages;
    }

    return response()->json($response, $code);
  }

  /**
   * Return user status
   *
   * @param string $status
   * @return string
   */
  public function showAccountStatusMessage(string $status): string
  {
    return match ($status) {
      Constants::INACTIVE => __('accountNotActivated'),
      Constants::DELETED => __('accountDeleted'),
      Constants::RESTRICTED => __('accountRestricted'),
      default => __('welcome'),
    };
  }

  /**
   * Return unauthorized response.
   *
   * @return JsonResponse
   */
  public function noAuth(): JsonResponse
  {
    $message = __('notAuthorized');
    $data['reason'] = 'invalid-authorization';

    return $this->sendError($message, $data, 401);
  }

  /**
   * Return not found response.
   *
   * @return JsonResponse
   */
  public function notFound(): JsonResponse
  {
    $message = __('resourceNotFound');
    $data['reason'] = 'not-found';

    return $this->sendError($message, $data, 404);
  }

  /**
   * Return server error response.
   *
   * @return JsonResponse
   */
  public function serverError(): JsonResponse
  {
    $message = __('somethingWentWrong');
    $data['reason'] = 'server-error';

    return $this->sendError($message, $data, 500);
  }
}
