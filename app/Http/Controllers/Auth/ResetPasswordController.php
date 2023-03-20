<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Models\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ResetPasswordController extends BaseController
{
  /*
  |--------------------------------------------------------------------------
  | Password Reset Controller
  |--------------------------------------------------------------------------
  |
  | This controller is responsible for handling password reset requests
  | and uses a simple trait to include this behavior. You're free to
  | explore this trait and override any methods you wish to tweak.
  |
  */

  use ResetsPasswords;

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function changePassword(Request $request): JsonResponse
  {
    $rules = [
      'email' => ['required', 'string', 'email'],
      'password' => ['required', 'string', 'min:8'],
      'new_password' => ['required', 'string', 'min:8'],
      'confirm_password' => ['required', 'string', 'same:new_password'],
    ];

    $messages = [
      'confirm_password.same' => 'Passwords do not match',
    ];

    $validator = $this->validator($request->all(), $rules, $messages);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
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

      $user->password = bcrypt($request['new_password']);

      if ($user->must_change_password) {
        $user->must_change_password = false;
      }

      if (in_array("student", $roles)) {
        $user->login_code = null;
      }

      $user->save();
    }

    $message = __('passwordResetSuccessful');
    $data['email'] = $request['email'];
    $data['access_token'] = $token;

    return $this->sendResponse($message, $data);
  }
}
