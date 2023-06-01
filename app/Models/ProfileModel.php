<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileModel extends Model
{
    protected $table = 'users';

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

}
