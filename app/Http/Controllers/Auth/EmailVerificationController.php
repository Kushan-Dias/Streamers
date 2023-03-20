<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationController extends BaseController
{

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function __invoke(Request $request): JsonResponse
  {
    $user = User::find($request->route('id'));

    if ($user->hasVerifiedEmail()) {
      $message = __('emailAlreadyVerified');
      $data['reason'] = 'email-already-verified';

      return $this->sendError($message, $data, 403);
    }

    if ($user->markEmailAsVerified()) {
      event(new Verified($user));
    }

    $message = __('emailVerificationSuccessful');
    $data = [
      'redirect' => '/email/verify/success',
    ];

    return $this->sendResponse($message, $data);
  }

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function resend(Request $request): JsonResponse
  {
    $user = User::where('email', $request['email'])->first();
    if ($user) {
      if ($user->hasVerifiedEmail()) {
        $message = __('emailAlreadyVerified');
        $data['reason'] = 'email-already-verified';

        return $this->sendError($message, $data, 403);
      }

      $user->sendEmailVerificationNotification();

      $message = __('emailVerificationSent', ["email" => $user->email]);
      $data = [];

      return $this->sendResponse($message, $data);
    } else {
      $message = __('somethingWentWrong');
      $data['reason'] = 'something-went-wrong';

      return $this->sendError($message, $data, 500);
    }
  }
}
