<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @method static create(array $array)
 */
class User extends Authenticatable implements JWTSubject, MustVerifyEmail, HasMedia
{
  use HasFactory, Notifiable, HasRoles, HasPermissions, InteractsWithMedia;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'first_name',
    'last_name',
    'username',
    'gender',
    'email',
    'password',
    'mobile',
    'country_id',
    'address_one',
    'address_two',
    'country',
    'state',
    'city',
    'zip',
    'mobile_verification_code',
    'status',
    'must_change_password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'mobile_verified_at' => 'datetime',
  ];

  /**
   * Get the identifier that will be stored in the subject claim of the JWT.
   *
   * @return mixed
   */
  public function getJWTIdentifier(): mixed
  {
    return $this->getKey();
  }

  /**
   * Return a key value array, containing any custom claims to be added to the JWT.
   *
   * @return array
   */
  public function getJWTCustomClaims(): array
  {
    return [
      'id' => $this->id,
      'tenant_id' => tenant('id'),
      'first_name' => $this->first_name,
      'last_name' => $this->last_name,
      'gender' => $this->gender,
      'email' => $this->email,
      'mobile' => $this->mobile,
      'avatar_url' => $this->getFirstMediaUrl('avatars', 'thumb'),
      'status' => $this->status,
      'roles' => $this->getRoleNames(),
      'permissions' => $this->getPermissionNames(),
      'contracts' => $this->getContracts(),
      'theme' => $this->theme,
      'dashboard_configuration' => $this->dashboard_configuration,
      'points' => $this->points,
      'extended_data' => $this->extended_data,
      'time_zone_utc' => $this->time_zone_utc,
      'must_change_password' => $this->must_change_password,
      'created_at' => $this->created_at,
      'updated_updated_at' => $this->updated_at,
    ];
  }

  /**
   * @return BelongsTo
   */
  public function country(): BelongsTo
  {
    return $this->belongsTo(Country::class);
  }

  /**
   * @return HasMany
   */
  public function contracts(): HasMany
  {
    return $this->hasMany(Contract::class);
  }

  /**
   * Return all contracts directly coupled to the model.
   */
  public function getContracts(): ?Collection
  {
    if (in_array("student", $this->getRoleNames()->toArray())) {
      return $this->contracts()->get(['id', 'signed', 'signed_at']);
    } else {
      return null;
    }
  }
}
