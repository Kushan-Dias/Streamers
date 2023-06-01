<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\ContractTemplateController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\OneFlowAccountController;
use App\Http\Controllers\Permission\PermissionController;
use App\Http\Controllers\Permission\RoleController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;
use App\Services\CustomModules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware([])->group(function () {
  Route::get('/profile', [ProfileController::class, 'getProfileData']);
  Route::get('/login', function () {
    return redirect('/login');
  })->name('login');

  Route::group(['prefix' => 'error'], function () {
    Route::get('/auth', [BaseController::class, 'noAuth'])->name('noAuth');
  });

  // AUTHENTICATION
  Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
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


  // TENANT MANAGEMENT
  Route::apiResource('tenants', TenantController::class);

  // CONTRACT MANAGEMENT
  Route::prefix('contracts')->group(function () {
    Route::apiResource('oneflow', OneFlowAccountController::class);

    Route::prefix('templates')->group(function () {
      Route::get('/{tenant_id}', [ContractTemplateController::class, 'index']);
      Route::post('/{tenant_id}', [ContractTemplateController::class, 'store']);
      Route::get('/{tenant_id}/{id}', [ContractTemplateController::class, 'show']);
      Route::put('/{tenant_id}/{id}', [ContractTemplateController::class, 'update']);
      Route::delete('/{tenant_id}/{id}', [ContractTemplateController::class, 'destroy']);
    });
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

  // MODULE MANAGEMENT
  Route::prefix('modules')->group(function () {
    Route::get('/', [ModuleController::class, 'index']);
    Route::get('/tenant/{id}', [ModuleController::class, 'tenantModules']);
    Route::post('/tenant/{id}', [ModuleController::class, 'addUpdateTenantModules']);
    Route::delete('/tenant/{id}', [ModuleController::class, 'removeTenantModules']);
  });


  // ERROR RELATED
  Route::prefix('error')->group(function () {
    Route::get('tenant/inactive', [ErrorController::class, 'tenantNotActive'])->name('error.api.tenant.inactive');
    Route::get('contracts/not-signed', [ErrorController::class, 'contractsNotSigned'])->name('error.api.contracts.unsigned');
  });


  // FOR TESTING/DEBUG PURPOSES:
  Route::prefix('debug')->group(function () {
    Route::get('test-modules', function () {
      return array_values(array_merge([database_path('migrations/tenant')], array_map(function ($moduleName) {
        return base_path('Modules/' . $moduleName . '/Database/Migrations/tenant');
      }, CustomModules::getModuleNames())));
    });
    Route::get('localization', function (Request $request) {
      $data['message'] = __('Welcome to our website');
      $data['request'] = $request->header();
      return response()->json($data);
    });
  });
});


  //kushan

//added by kushan for streamer profile controling


