<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\Constants;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RegisterController extends BaseController
{
  /*
  |--------------------------------------------------------------------------
  | Register Controller
  |--------------------------------------------------------------------------
  |
  | This controller handles the registration of new users as well as their
  | validation and creation. By default, this controller uses a trait to
  | provide this functionality without requiring any additional code.
  |
  */

  use RegistersUsers;

  private UserRepository $userRepository;

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct(UserRepository $userRepository)
  {
    $this->middleware('auth:api');
    $this->middleware('role_or_permission:super-admin|manager|create-user')->only('register');

    $this->userRepository = $userRepository;
  }

  /**
   * Create a new user instance after a valid registration.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function register(Request $request): JsonResponse
  {
    $rules = [
      'first_name' => ['required', 'string', 'max:25'],
      'last_name' => ['required', 'string', 'max:50'],
      'username' => ['required', 'string', 'max:255', 'unique:users'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'string', 'min:8'],
      'confirm_password' => ['required', 'string', 'same:password'],
      'role' => ['required', 'string', 'max:20'],
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

    $user = User::create([
      'first_name' => $request['first_name'],
      'last_name' => $request['last_name'],
      'username' => $request['username'],
      'email' => $request['email'],
      'password' => Hash::make($request['password']),
      'status' => Constants::ACTIVE,
      'must_change_password' => true,
    ]);

    $role = Role::findByName($request['role']);

    if ($role) {
      $user->assignRole([$role->id]);
    }

    event(new Registered($user));

    $message = __('userRegistrationSuccessful');
    $data = [
      'user' => $user,
    ];

    return $this->sendResponse($message, $data);
  }
}
