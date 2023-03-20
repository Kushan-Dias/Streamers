<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UnilivinMail extends Mailable
{
  use Queueable, SerializesModels;

  public string $mailFrom;
  public string $mailName;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct(string $mailName = 'UnilivinTeam', string $mailFrom = 'noreply@unilivin.com')
  {
    $this->mailFrom = $mailFrom;
    $this->mailName = $mailName;
  }

  /**
   * Build the message.
   *
   * @return static
   */
  public function build(): static
  {
    return $this->from($this->mailFrom, $this->mailName);
  }
}
