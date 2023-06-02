<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contract extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'id',
    'template_id',
    'participant_id',
    'user_id',
    'signed',
  ];

  /**
   * Get the user that owns the contract.
   */
  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  /**
   * Get the template that owns the contract.
   */
  public function template(): BelongsTo
  {
    return $this->belongsTo(ContractTemplate::class);
  }
}
