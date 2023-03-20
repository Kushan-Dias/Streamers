<?php

namespace App\Models\Event;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @method static create(array $array)
 */
class Event extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'name',
    'description',
    'image_url',
    'organizer',
    'start_time',
    'end_time',
    'event_date',
    'location_name',
    'location_url',
    'status',
    'limit',
    'rating',
    'created_by',
    'updated_by',
    'canceled_by',
    'postponed_by',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'event_date' => 'datetime:Y-m-d\TH:i:sO',
    'start_time' => 'datetime:Y-m-d\TH:i:sO',
    'end_time' => 'datetime:Y-m-d\TH:i:sO',
  ];

  /**
   * @return HasOne
   */
  public function event_recurring_pattern(): HasOne
  {
    return $this->hasOne(EventRecurringPattern::class);
  }

  /**
   * @return HasMany
   */
  public function event_exclusions(): HasMany
  {
    return $this->hasMany(EventExclusion::class);
  }
}
