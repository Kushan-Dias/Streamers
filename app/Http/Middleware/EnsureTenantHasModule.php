<?php

namespace App\Http\Middleware;

use App\Services\Constants;
use App\Services\CustomModules;
use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EnsureTenantHasModule
{
  /**
   * Handle an incoming request.
   *
   * @param Request $request
   * @param Closure $next
   * @param $module
   * @return JsonResponse
   * @throws AuthorizationException
   */
  public function handle(Request $request, Closure $next, $module): JsonResponse
  {
    $tenantModules = CustomModules::getTenantModules(tenant('id'));

    if ($tenantModules) {
      foreach ($tenantModules as $tenantModule) {
        if ($tenantModule['name'] === $module && $tenantModule['status'] === Constants::ACTIVE) {
          return $next($request);
        }
      }
    } else {
      throw new AuthorizationException('You do not have permission to access this module.');
    }
  }
}
