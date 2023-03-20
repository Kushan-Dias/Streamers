<?php

namespace Modules\Maintenance\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaintenanceLog extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'id',
    'maintenance_id',
    'log_message',
    'log_data',
    'created_by',
  ];

  /**
   * @return BelongsTo
   */
  public function created_by(): BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }
}
