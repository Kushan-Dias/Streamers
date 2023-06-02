<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coupon extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'store_id',
    'user_id',
    'code',
  ];

  public function store(): BelongsTo
  {
    return $this->belongsTo(Store::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}