<?php

namespace Modules\Maintenance\Entities;

use App\Services\Constants;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Asset extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'id',
    'name',
    'description',
    'images',
    'parent_id',
  ];

  /**
   * Get the parent asset that owns the asset.
   */
  public function parent(): BelongsTo
  {
    return $this->belongsTo(Asset::class, 'parent_id');
  }

  /**
   * Get the maintenances related to the asset.
   */
  public function maintenances(): HasMany
  {
    return $this->hasMany(Maintenance::class);
  }

  /**
   * Get the ongoing maintenances related to the asset.
   */
  public function ongoing_maintenances(): HasMany
  {
    return $this->maintenances()->where('status', '!=', Constants::RESOLVED);
  }
}
