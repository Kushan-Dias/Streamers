<?php

namespace App\Repositories;

use App\Mail\UnilivinMail;
use App\Models\EmailTemplate;
use App\Services\Constants;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;

class EmailRepository extends BaseRepository
{

  /**
   * The Mailer instance.
   */
  protected Mailable $mailable;

  /**
   * Instantiate a new controller instance.
   *
   * @param EmailTemplate $emailTemplate
   * @return void
   */
  public function __construct(EmailTemplate $emailTemplate)
  {
    $this->model = $emailTemplate;
  }

  /**
   * @param $addressData
   * @return array
   */
  public function getEmailData($addressData): array
  {
    $data['toEmail'] = $addressData['toEmail'];
    $data['toName'] = $addressData['toName'] ?? '';
    $data['ccEmail'] = $addressData['ccEmail'] ?? '';
    $data['ccName'] = $addressData['ccName'] ?? '';
    $data['fromEmail'] = $addressData['fromEmail'] ?? env('MAIL_FROM_ADDRESS');
    $data['fromName'] = $addressData['fromName'] ?? env('MAIL_FROM_NAME');
    return $data;
  }

  /**
   * @param array $emailParams
   * @param EmailTemplate $template
   * @return array
   */
  public function getEmailContent(array $emailParams, EmailTemplate $template): array
  {
    $subject = $template->subject;
    $message = $template->message;
    // Todo: Implement template modifications

    return ['subject' => $subject, 'body' => $message];
  }

  /**
   * @param array $emailParams
   * $emailParams = [
   *    'subject' => '',  // Email subject
   *    'addressData' => [  // all addresses and names
   *
   *    ],
   *    'emailData' => [ // all variables for email
   *
   *    ]
   * ]
   * @param string $templateView
   * @return void
   */
  public function sendMail(array $emailParams, string $templateView)
  {
    $defaultMail = new UnilivinMail();
    $addressData = $this->getEmailData($emailParams['addressData']);
    $template = $this->findWhere('template_view', '=', $templateView);

    if ($template) {
      $emailContent = $this->getEmailContent($emailParams['emailData'], $template);
      $emailParams['emailData']['body'] = $emailContent['body'];
      Mail::to($addressData['toEmail'])
        ->send(
          $defaultMail->from($addressData['fromEmail'], $addressData['fromName'])
            ->subject($emailContent['subject'])
            ->view(Constants::DEFAULT_EMAIL_VIEW)
            ->with($emailParams['emailData'])
        );
    } else {
      Mail::to($addressData['toEmail'])
        ->send(
          $defaultMail->from($addressData['fromEmail'], $addressData['fromName'])
            ->subject($emailParams['subject'])
            ->view($templateView)
            ->with($emailParams['emailData'])
        );
    }

    // Todo: Modify send
  }
}
