<?php

namespace App\Http\Controllers;

use App\Repositories\BaseRepository;
use App\Repositories\EmailRepository;
use Illuminate\Http\JsonResponse;

class EmailController extends BaseRepository
{
  private EmailRepository $emailRepository;

  public function __construct(EmailRepository $emailRepository)
  {
    $this->emailRepository = $emailRepository;
  }

  public function sendEmail(): JsonResponse
  {
    $emailParams = [
      'subject' => 'Welcome to Unilivin',
      'addressData' => [  // all addresses and names
        'toEmail' => 'user@test.com',
        'toName' => 'Test User',
        'fromEmail' => 'noreply@unilivin.com',
        'fromName' => 'UnilivinTeam',
      ],
      'emailData' => [ // all variables for email
        'appName' => env('APP_NAME'),
        'appUrl' => env('APP_URL'),
        'firstName' => 'Bruce',
        'tenantLoginUrl' => 'http://' . tenant('id') . '.unilivin.com:8000/login'
      ],
    ];

    $this->emailRepository->sendMail($emailParams, 'emails.welcome');

    return response()->json('Mail sent');
  }
}
