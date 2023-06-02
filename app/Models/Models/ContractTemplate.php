<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Models\Role;

class ContractTemplate extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'id',
    'workspace_id',
    'name',
    'version',
    'role_id',
    'status',
  ];

  /**
   * @return HasMany
   */
  public function contracts(): HasMany
  {
    return $this->hasMany(Contract::class);
  }

  /**
   * @return BelongsTo
   */
  public function role(): BelongsTo
  {
    return $this->belongsTo(Role::class);
  }
}
