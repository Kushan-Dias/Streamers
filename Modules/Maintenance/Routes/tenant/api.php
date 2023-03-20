<?php

use Illuminate\Support\Facades\Route;
use Modules\Maintenance\Http\Controllers\AssetController;
use Modules\Maintenance\Http\Controllers\MaintenanceController;
use Modules\Maintenance\Http\Controllers\MaintenanceEventController;

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

Route::middleware([
  'tenant_has_module:Maintenance',
])->group(function () {
  // ASSET MANAGEMENT
  Route::prefix('assets')->group(function () {
    Route::post('/datatable', [AssetController::class, 'datatable']);
    Route::get('/parent/{id}', [AssetController::class, 'getByParent']);
  });
  Route::apiResource('assets', AssetController::class);

  // MAINTENANCE MANAGEMENT
  Route::prefix('maintenances')->group(function () {
    Route::post('/datatable', [MaintenanceController::class, 'datatable']);
    Route::get('/maintainers', [MaintenanceController::class, 'maintainers']);
    Route::post('/assign', [MaintenanceController::class, 'assign']);
    Route::get('/logs/{id}', [MaintenanceController::class, 'logs']);

    // MAINTENANCE EVENTS
    Route::prefix('events')->group(function () {
      Route::get('/calendar', [MaintenanceEventController::class, 'calendar']);
      Route::post('/exclusions', [MaintenanceEventController::class, 'addExclusion']);
      Route::delete('/exclusions/{id}', [MaintenanceEventController::class, 'removeExclusion']);
    });
    Route::apiResource('events', MaintenanceEventController::class);
  });
  Route::apiResource('maintenances', MaintenanceController::class);
});
