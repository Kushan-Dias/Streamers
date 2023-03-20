<?php

namespace Modules\Maintenance\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Modules\Maintenance\Entities\MaintenanceEvent\MaintenanceEvent;

class Maintenance extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'id',
    'title',
    'description',
    'attachments',
    'problem_nature',
    'asset_id',
    'location',
    'convenient_date',
    'convenient_from',
    'convenient_to',
    'priority',
    'status',
    'maintainer',
    'assigned_at',
    'maintenance_at',
    'completed_at',
    'requested_by',
    'created_by',
    'updated_by',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'convenient_date' => 'datetime:Y-m-d\TH:i:sO',
    'convenient_from' => 'datetime:Y-m-d\TH:i:sO',
    'convenient_to' => 'datetime:Y-m-d\TH:i:sO',
    'assigned_at' => 'datetime:Y-m-d\TH:i:sO',
    'maintenance_at' => 'datetime:Y-m-d\TH:i:sO',
    'completed_at' => 'datetime:Y-m-d\TH:i:sO',
  ];

  /**
   * @return BelongsTo
   */
  public function asset(): BelongsTo
  {
    return $this->belongsTo(Asset::class);
  }

  /**
   * @return BelongsTo
   */
  public function requested_by(): BelongsTo
  {
    return $this->belongsTo(User::class, 'requested_by');
  }

  /**
   * @return BelongsTo
   */
  public function created_by(): BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }

  /**
   * @return BelongsTo
   */
  public function maintainer(): BelongsTo
  {
    return $this->belongsTo(User::class, 'maintainer');
  }

  /**
   * @return HasOne
   */
  public function maintenance_event(): HasOne
  {
    return $this->hasOne(MaintenanceEvent::class);
  }
}
