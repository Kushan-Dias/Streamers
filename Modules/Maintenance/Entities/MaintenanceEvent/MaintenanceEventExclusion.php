<?php

namespace Modules\Maintenance\Entities\MaintenanceEvent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MaintenanceEventExclusion extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'event_id',
    'date'
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'date' => 'datetime:Y-m-d',
  ];

  /**
   * @return BelongsToMany
   */
  public function event(): BelongsToMany
  {
    return $this->belongsToMany(MaintenanceEvent::class);
  }
}
