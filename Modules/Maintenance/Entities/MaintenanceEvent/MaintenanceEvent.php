<?php

namespace Modules\Maintenance\Entities\MaintenanceEvent;

use Modules\Maintenance\Entities\Maintenance;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MaintenanceEvent extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'maintenance_id',
    'event_date',
    'start_time',
    'end_time',
    'status',
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
    return $this->hasOne(MaintenanceEventRecurringPattern::class, 'event_id');
  }

  /**
   * @return HasMany
   */
  public function event_exclusions(): HasMany
  {
    return $this->hasMany(MaintenanceEventExclusion::class, 'event_id');
  }

  /**
   * @return BelongsTo
   */
  public function maintenance(): BelongsTo
  {
    return $this->belongsTo(Maintenance::class)->with('maintainer');
  }
}
