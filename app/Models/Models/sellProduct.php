<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sellProduct extends Model
{
  protected $table = 'sell_product';

  protected $fillable = [
      'first_name',
      'last_name',
      'country',
      'email',
      'phone',
      'payment_method_title',
      'order_id',
      'coupon_code',
      'discount',
      'streamer_id',
      'Item_name',
      'subtotal',
      'total',
      'date',
      'fetched_to_obs',
      'fetched_time',
      'full_json',
      'obs_response',

  ];
}
