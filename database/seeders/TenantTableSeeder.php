<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use App\Services\Constants;
use Exception;
use Illuminate\Database\Seeder;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TenantTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $tenant1 = Tenant::create([
      'id' => 'yugo',
      'name' => 'Yugo',
      'plan' => Constants::PREMIUM,
    ]);

    $tenant1->domains()->create(['domain' => 'yugo']);

    \App\Models\Tenant::all()->runForEach(function () {
      $user = \App\Models\User::create([
        'first_name' => 'Manager',
        'last_name' => 'Yugo',
        'username' => 'yugoManager',
        'email' => 'test.manager@yugo.com',
        'password' => bcrypt('12345678'),
        'status' => Constants::ACTIVE,
      ]);

      $role = new Role();

      try {
        $role = Role::findByName('manager');

        if (!$role) {
          $role = Role::create([
            'name' => 'manager',
            'title' => 'Manager',
            'guard_name' => 'api'
          ]);
        }
      } catch (Exception $e) {
        if ($e instanceof RoleDoesNotExist) {
          $role = Role::create([
            'name' => 'manager',
            'title' => 'Manager',
            'guard_name' => 'api'
          ]);
        }
      }

      $permissions = Permission::pluck('id', 'id')->all();
      $role->syncPermissions($permissions);

      $user->assignRole($role->id);
    });
  }
}
