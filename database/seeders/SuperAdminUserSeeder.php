<?php

namespace Database\Seeders;

use App\Models\User;
use App\Services\Constants;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Seeder;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SuperAdminUserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $user = User::create([
      'first_name' => 'Super',
      'last_name' => 'Admin',
      'username' => 'superAdmin',
      'email' => 'admin@fclanka.com',
      'password' => bcrypt('12345678'),
      'status' => Constants::ACTIVE,
      'email_verified_at' => Carbon::now(),
      'must_change_password' => true,
    ]);

    $role = new Role();

    try {
      $role = Role::findByName('super-admin');

      if (!$role) {
        $role = Role::create([
          'name' => 'super-admin',
          'title' => 'Super Admin',
          'guard_name' => 'api'
        ]);
      }
    } catch (Exception $e) {
      if ($e instanceof RoleDoesNotExist) {
        $role = Role::create([
          'name' => 'super-admin',
          'title' => 'Super Admin',
          'guard_name' => 'api'
        ]);
      }
    }

    $permissions = Permission::pluck('id', 'id')->all();
    $role->syncPermissions($permissions);

    $user->assignRole($role->id);
  }
}
