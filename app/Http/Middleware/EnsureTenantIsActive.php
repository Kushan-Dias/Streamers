<?php

namespace App\Http\Middleware;

use App\Services\Constants;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EnsureTenantIsActive
{
  /**
   * Handle an incoming request.
   *
   * @param Request $request
   * @param Closure $next
   * @return RedirectResponse|mixed
   */
  public function handle(Request $request, Closure $next)
  {
    if (tenant('status') != Constants::ACTIVE) {
      if ($request->wantsJson()) {
        return redirect()->route('error.api.tenant.inactive');
      } else {
        return redirect('http://localhost:8000/tenants/status/disabled');
      }
    }

    return $next($request);
  }
}
