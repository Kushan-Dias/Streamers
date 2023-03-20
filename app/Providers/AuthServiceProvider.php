<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\URL;

class AuthServiceProvider extends ServiceProvider
{
  /**
   * The policy mappings for the application.
   *
   * @var array
   */
  protected $policies = [
    'App\Models\Model' => 'App\Policies\ModelPolicy',
  ];

  /**
   * Register any authentication / authorization services.
   *
   * @return void
   */
  public function boot()
  {
    $this->registerPolicies();

    // https://stackoverflow.com/a/69954311/10399001
    VerifyEmail::createUrlUsing(function ($notifiable) {
      $params = [
        "expires" => Carbon::now()
          ->addMinutes(60)
          ->getTimestamp(),
        "id" => $notifiable->getKey(),
        "hash" => sha1($notifiable->getEmailForVerification()),
      ];

      ksort($params);

      // then create API url for verification. my API have `/api` prefix,
      // so i don't want to show that url to users
      $url = URL::route("email.verification.verify", $params, true);

      // get APP_KEY from config and create signature
      $key = config("app.key");
      $signature = hash_hmac("sha256", $url, $key);

      // generate url for yous SPA page to send it to user
      $urlSuffix = "/user/verify-email/" .
        $params["id"] .
        "/" .
        $params["hash"] .
        "?expires=" .
        $params["expires"] .
        "&signature=" .
        $signature;

      $http_val = env('HTTPS', 'false') ? 'https://' : 'http://';

      return tenant('id') ? $http_val . tenant('id') . '.' . env('FRONT_URL', 'unilivin.com') . $urlSuffix : $http_val . env('FRONT_URL', 'unilivin.com') . $urlSuffix;
    });
  }
}
