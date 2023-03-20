<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $permissions = [
      // TENANTS
      ['name' => 'create-tenant', 'title' => 'Create tenant', 'guard_name' => 'api'],
      ['name' => 'list-tenants', 'title' => 'View tenants list', 'guard_name' => 'api'],
      ['name' => 'view-tenant', 'title' => 'View tenant', 'guard_name' => 'api'],
      ['name' => 'edit-tenant', 'title' => 'Edit tenant', 'guard_name' => 'api'],
      ['name' => 'delete-tenant', 'title' => 'Delete tenant', 'guard_name' => 'api'],
      // ROLES
      ['name' => 'create-role', 'title' => 'Create role', 'guard_name' => 'api'],
      ['name' => 'list-roles', 'title' => 'View roles list', 'guard_name' => 'api'],
      ['name' => 'view-role', 'title' => 'View role', 'guard_name' => 'api'],
      ['name' => 'edit-role', 'title' => 'Edit role', 'guard_name' => 'api'],
      ['name' => 'delete-role', 'title' => 'Delete role', 'guard_name' => 'api'],
      // USERS
      ['name' => 'create-user', 'title' => 'Create user', 'guard_name' => 'api'],
      ['name' => 'list-users', 'title' => 'View users list', 'guard_name' => 'api'],
      ['name' => 'view-user', 'title' => 'View user', 'guard_name' => 'api'],
      ['name' => 'edit-user', 'title' => 'Edit user', 'guard_name' => 'api'],
      ['name' => 'delete-user', 'title' => 'Delete user', 'guard_name' => 'api'],
      // CONTRACTS
      ['name' => 'create-contract', 'title' => 'Create contract template', 'guard_name' => 'api'],
      ['name' => 'list-contracts', 'title' => 'View contract templates list', 'guard_name' => 'api'],
      ['name' => 'view-contract', 'title' => 'View contract template', 'guard_name' => 'api'],
      ['name' => 'edit-contract', 'title' => 'Edit contract template', 'guard_name' => 'api'],
      ['name' => 'remove-contract', 'title' => 'Remove contract template', 'guard_name' => 'api'],
      ['name' => 'add-oneflow', 'title' => 'Add OneFlow Account', 'guard_name' => 'api'],
      ['name' => 'list-oneflows', 'title' => 'View OneFlow accounts list', 'guard_name' => 'api'],
      // MODULES
      ['name' => 'create-module', 'title' => 'Create module', 'guard_name' => 'api'],
      ['name' => 'list-modules', 'title' => 'View modules list', 'guard_name' => 'api'],
      ['name' => 'view-module', 'title' => 'View module', 'guard_name' => 'api'],
      ['name' => 'edit-module', 'title' => 'Edit module', 'guard_name' => 'api'],
      ['name' => 'delete-module', 'title' => 'Delete module', 'guard_name' => 'api'],
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
