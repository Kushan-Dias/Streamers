<?php

namespace Database\Seeders\Tenant;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class TenantRoleTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $roles = [
      ['name' => 'manager', 'title' => 'Manager', 'guard_name' => 'api'],
      ['name' => 'student', 'title' => 'Student', 'guard_name' => 'api'], // Todo:
    ];

    foreach ($roles as $role) {
      Role::create([
        'name' => $role['name'],
        'title' => $role['title'],
        'guard_name' => $role['guard_name']
      ]);
    }
  }
}
