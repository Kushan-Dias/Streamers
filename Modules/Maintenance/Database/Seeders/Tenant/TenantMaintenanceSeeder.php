<?php

namespace Modules\Maintenance\Database\Seeders\Tenant;

use Exception;
use Illuminate\Database\Seeder;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TenantMaintenanceSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {

    $role = new Role();
    $roleManager = Role::findByName('manager');

    try {
      $role = Role::findByName('maintainer');

      if (!$role) {
        $role = Role::create([
          'name' => 'maintainer',
          'title' => 'Maintainer',
          'guard_name' => 'api'
        ]);
      }
    } catch (Exception $e) {
      if ($e instanceof RoleDoesNotExist) {
        $role = Role::create([
          'name' => 'maintainer',
          'title' => 'Maintainer',
          'guard_name' => 'api'
        ]);
      }
    }

    $permissions = [
      // ASSETS
      ['name' => 'create-asset', 'title' => 'Create asset', 'guard_name' => 'api'],
      ['name' => 'list-assets', 'title' => 'View assets list', 'guard_name' => 'api'],
      ['name' => 'view-asset', 'title' => 'View asset', 'guard_name' => 'api'],
      ['name' => 'edit-asset', 'title' => 'Edit asset', 'guard_name' => 'api'],
      ['name' => 'delete-asset', 'title' => 'Delete asset', 'guard_name' => 'api'],
      // MAINTENANCE
      ['name' => 'create-maintenance', 'title' => 'Create maintenance', 'guard_name' => 'api'],
      ['name' => 'list-maintenances', 'title' => 'View maintenances list', 'guard_name' => 'api'],
      ['name' => 'view-maintenance', 'title' => 'View maintenance', 'guard_name' => 'api'],
      ['name' => 'edit-maintenance', 'title' => 'Edit maintenance', 'guard_name' => 'api'],
      ['name' => 'delete-maintenance', 'title' => 'Delete maintenance', 'guard_name' => 'api'],
      ['name' => 'assign-maintenance', 'title' => 'Assign maintenance', 'guard_name' => 'api'],
      // MAINTENANCE EVENTS
      ['name' => 'list-mt-events', 'title' => 'View maintenance events list', 'guard_name' => 'api'],
      ['name' => 'view-mt-event', 'title' => 'View maintenance event', 'guard_name' => 'api'],
      ['name' => 'edit-mt-event', 'title' => 'Edit maintenance event', 'guard_name' => 'api'],
      ['name' => 'delete-mt-event', 'title' => 'Delete maintenance event', 'guard_name' => 'api'],
    ];

    foreach ($permissions as $permission) {
      $p = Permission::create([
        'name' => $permission['name'],
        'title' => $permission['title'],
        'guard_name' => $permission['guard_name'],
      ]);

      $roleManager->givePermissionTo($p);
    }
  }
}
