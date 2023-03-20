<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
  /**
   * Instantiate a new controller instance.
   *
   * @param User $user
   */
  public function __construct(User $user)
  {
    $this->model = $user;
  }

}
