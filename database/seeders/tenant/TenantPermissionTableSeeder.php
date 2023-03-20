<?php

namespace Database\Seeders\Tenant;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class TenantPermissionTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $permissions = [
      // ROLES
      ['name' => 'create-role', 'title' => 'Create role', 'guard_name' => 'api'],
      ['name' => 'list-roles', 'title' => 'View roles list', 'guard_name' => 'api'],
      ['name' => 'view-role', 'title' => 'View role', 'guard_name' => 'api'],
      ['name' => 'edit-role', 'title' => 'Edit role', 'guard_name' => 'api'],
      ['name' => 'delete-role', 'title' => 'Delete role', 'guard_name' => 'api'],
      // PERMISSIONS
      ['name' => 'assign-permission', 'title' => 'Assign permission', 'guard_name' => 'api'],
      // USERS
      ['name' => 'create-user', 'title' => 'Create user', 'guard_name' => 'api'],
      ['name' => 'list-users', 'title' => 'View users list', 'guard_name' => 'api'],
      ['name' => 'view-user', 'title' => 'View user', 'guard_name' => 'api'],
      ['name' => 'edit-user', 'title' => 'Edit user', 'guard_name' => 'api'],
      ['name' => 'delete-user', 'title' => 'Delete user', 'guard_name' => 'api'],
      // EVENTS
      ['name' => 'create-event', 'title' => 'Create event', 'guard_name' => 'api'],
      ['name' => 'list-events', 'title' => 'View events list', 'guard_name' => 'api'],
      ['name' => 'view-event', 'title' => 'View event', 'guard_name' => 'api'],
      ['name' => 'edit-event', 'title' => 'Edit event', 'guard_name' => 'api'],
      ['name' => 'delete-event', 'title' => 'Delete event', 'guard_name' => 'api'],
    ];

    foreach ($permissions as $permission) {
      Permission::create([
        'name' => $permission['name'],
        'title' => $permission['title'],
        'guard_name' => $permission['guard_name']
      ]);
    }
  }
}
