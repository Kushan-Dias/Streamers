<?php

namespace Modules\Maintenance\Entities\MaintenanceEvent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaintenanceEventRecurringPattern extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'event_id',
    'recurring_type',
    'occurrence',
    'end_date',
    'custom_dates',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'end_date' => 'datetime:Y-m-d',
  ];

  /**
   * @return BelongsTo
   */
  public function event(): BelongsTo
  {
    return $this->belongsTo(MaintenanceEvent::class, 'event_id');
  }
}
