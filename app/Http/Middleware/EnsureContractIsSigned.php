<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EnsureContractIsSigned
{
  /**
   * Handle an incoming request.
   *
   * @param Request $request
   * @param Closure $next
   * @return RedirectResponse|mixed
   */
  public function handle(Request $request, Closure $next): mixed
  {
    // $payload = auth()->payload();

    // Todo: Check JWT payload
    // Todo: Check with ContractTemplates

    $user = User::find(auth()->id());
    $contracts = $user->contracts()->get(['id', 'signed']);

    if (count($contracts) > 0) {
      foreach ($contracts as $contract) {
        if (!$contract->signed) {
          if ($request->wantsJson()) {
            return redirect()->route('error.api.contracts.unsigned');
          }
        }
      }
    } else {
      if ($request->wantsJson()) {
        return redirect()->route('error.api.contracts.unsigned');
      }
    }

    return $next($request);
  }
}
