<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Models\User;
use App\Services\Constants;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentAuthController extends BaseController
{
  /*
  |--------------------------------------------------------------------------
  | Login Controller
  |--------------------------------------------------------------------------
  |
  | This controller handles authenticating users for the application and
  | redirecting them to your home screen. The controller uses a trait
  | to conveniently provide its functionality to your applications.
  |
  */

  use AuthenticatesUsers;

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api')->only('refresh', 'user');
  }

  /**
   * Login a user after a valid authentication
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function login(Request $request): JsonResponse
  {
    $rules = [
      'email' => ['required', 'email', 'string'],
      'password' => ['required', 'string', 'min:8'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['fields'] = $validator->errors();
      return $this->sendError($message, $data, 422);
    }

    $token = auth()->setTTL(env('JWT_TTL', 1440))->attempt($request->only('email', 'password'));

    if (!$token) {
      $message = __('credentialsDoNotMatch');
      $data['reason'] = 'invalid-credentials';

      return $this->sendError($message, $data, 401);

    } else {
      $user = User::where('email', $request['email'])->firstOrFail();
      $roles = $user->getRoleNames()->toArray();

      if (!in_array("student", $roles)) {
        $message = __('credentialsDoNotMatch');
        $data['reason'] = 'invalid-credentials';
        return $this->sendError($message, $data, 401);
      }

      if ($user->status != Constants::ACTIVE) {
        $message = $this->showAccountStatusMessage($user['status']);
        $data['reason'] = 'invalid-account-status';

        return $this->sendError($message, $data, 401);
      }

      if (!$user->hasVerifiedEmail()) {

        $message = __('verifyEmail');
        $data['reason'] = 'email-not-verified';

        return $this->sendError($message, $data);
      }

      if ($user->must_change_password) {
        $message = __('mustChangeCurrentPassword');
        $data['reason'] = 'must-change-password';
        $data['user'] = [
          'email' => $user->email,
        ];

        return $this->sendError($message, $data, 401);
      }

      $message = __('loginSuccessful');
      $data = $this->respondWithNewToken($token);

      return $this->sendResponse($message, $data);
    }
  }

  public function loginWithCode(Request $request): JsonResponse
  {
    $rules = [
      'login_code' => ['required', 'string'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['fields'] = $validator->errors();
      return $this->sendError($message, $data, 422);
    }

    $user = User::where('login_code', $request['login_code'])->first();

    if ($user) {
      $roles = $user->getRoleNames()->toArray();

      if (!in_array("student", $roles)) {
        $message = __('loginCodeExpired');
        $data['reason'] = 'login-code-expired';
        return $this->sendError($message, $data, 401);
      }

      if ($user->status != Constants::ACTIVE) {
        $message = $this->showAccountStatusMessage($user['status']);
        $data['reason'] = 'invalid-account-status';

        return $this->sendError($message, $data, 401);
      }

      if (!$user->hasVerifiedEmail()) {

        $message = __('verifyEmail');
        $data['reason'] = 'email-not-verified';

        return $this->sendError($message, $data);
      }

      if ($user->must_change_password) {
        $message = __('mustChangeCurrentPassword');
        $data['reason'] = 'must-change-password';
        $data['user'] = [
          'email' => $user->email,
        ];

        return $this->sendError($message, $data, 401);
      }

      $message = __('somethingWentWrong');
      $data['reason'] = 'something-went-wrong';

      return $this->sendError($message, $data, 500);
    } else {
      $message = __('loginCodeExpired');
      $data['reason'] = 'login-code-expired';

      return $this->sendError($message, $data, 401);
    }
  }

  /**
   * Get the token array structure.
   *
   * @param string $token
   * @return array
   */
  protected function respondWithNewToken(string $token): array
  {
    return [
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
    ];
  }
}
