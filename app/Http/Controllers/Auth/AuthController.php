<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Models\User;
use App\Services\Constants;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;

class AuthController extends BaseController
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
    $this->middleware('auth:api')->only('user', 'logout');
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
      $data['roles'] = $roles;

      if (in_array("student", $roles)) {
        $message = __('useMobileApp');
        $data['reason'] = 'login-not-allowed';
        return $this->sendError($message, $data, 405);
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
        $message = __('mustChangePassword');
        $data['reason'] = 'must-change-password';
        $data['user'] = [
          'email' => $user->email,
        ];
        $data['redirect'] = '/api/auth/password/change';

        return $this->sendError($message, $data, 401);
      }

      $message = __('loginSuccessful');
      $data = $this->respondWithNewToken($token);

      return $this->sendResponse($message, $data);
    }
  }

  /**
   * Log the user out (Invalidate the token).
   *
   * @return JsonResponse
   */
  public function logout(): JsonResponse
  {
    auth()->logout();

    $message = __('logoutSuccessful');

    return $this->sendResponse($message, []);
  }

  /**
   * Refresh a token.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function refresh(Request $request): JsonResponse
  {
    $token = null;
    $message = null;

    try {
      $token = auth()->refresh();
      $message = __('tokenRefreshSuccessful');
    } catch (TokenBlacklistedException $exception) {
      $message = $exception->getMessage();
      $data['reason'] = 'token-blacklisted';

      return $this->sendError($message, $data, 403);
    }

    $data = $this->respondWithNewToken($token);

    return $this->sendResponse($message, $data);
  }

  /**
   * Get the authenticated User.
   *
   * @return JsonResponse
   */
  public function user(): JsonResponse
  {
    $message = __('authUser');
    $data = [
      'user' => auth()->user(),
    ];

    return $this->sendResponse($message, $data);
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
