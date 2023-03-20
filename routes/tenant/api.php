<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\StudentAuthController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\Permission\PermissionController;
use App\Http\Controllers\Permission\RoleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureContractIsSigned;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tenant API Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware(['api'])->group(function () {
  Route::get('/', function () {
    return __("This is your multi-tenant API. The id of the current tenant is :tenant_id", ["tenant_id" => tenant('id')]);
  });

  // AUTHENTICATION
  Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/student/login', [StudentAuthController::class, 'login']);
    Route::post('/student/login/code', [StudentAuthController::class, 'loginWithCode']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [RegisterController::class, 'register']);
    Route::get('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/password/change', [ResetPasswordController::class, 'changePassword']);

    Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, '__invoke'])
      ->middleware(['signed', 'throttle:6,1'])
      ->name('email.verification.verify');
    Route::post('/email/verify/resend', [EmailVerificationController::class, 'resend'])
      ->middleware(['throttle:6,1'])
      ->name('email.verification.resend');
  });


  // ROLES AND PERMISSIONS
  Route::apiResource('roles', RoleController::class);
  Route::prefix('roles')->group(function () {
    Route::post('/sync', [RoleController::class, 'syncRolesWithPermissions']);
  });
  Route::apiResource('permissions', PermissionController::class);


  // USER MANAGEMENT
  Route::prefix('users')->group(function () {
    Route::post('/datatable', [UserController::class, 'datatable']);
    Route::get('/role/{nameOrId}', [UserController::class, 'role']);
  });
  Route::apiResource('users', UserController::class);

  // STUDENT RELATED
  Route::prefix('student')->group(function () {
    Route::get('/dashboard', [StudentController::class, 'dashboard']);
  });

  // CONTRACT MANAGEMENT
  Route::prefix('contracts')->group(function () {
    Route::get('/', [ContractController::class, 'index']);
    Route::get('/{id}', [ContractController::class, 'show']);
    Route::post('/oneflow/webhook', [ContractController::class, 'webhook']);
  });

  // EVENT MANAGEMENT
  Route::prefix('events')->group(function () {
    Route::get('/calendar', [EventController::class, 'calendar']);
    Route::post('/exclusions', [EventController::class, 'addExclusion']);
    Route::delete('/exclusions/{id}', [EventController::class, 'removeExclusion']);
  });
  Route::apiResource('events', EventController::class);

  // FOR TESTING/DEBUG PURPOSES:
  Route::prefix('debug')->group(function () {
    Route::get('/test/email', [EmailController::class, 'sendEmail']);

    Route::middleware([EnsureContractIsSigned::class, 'auth:api'])->get('test-contract', function () {
      return "ALL SIGNED";
    });
    Route::post('/student-contract', [TestController::class, 'studentContractTest']);
    Route::get('localization', function (Request $request) {
      $data['message'] = __('Welcome to our website');
      $data['request'] = $request->header();
      return response()->json($data);
    });
  });
});
