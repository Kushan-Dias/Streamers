<?php

namespace Database\Seeders\Tenant;

use App\Services\CustomModules;
use Illuminate\Database\Seeder;

class TenantDatabaseSeeder extends Seeder
{
  /**
   * Seed the tenant's database.
   *
   * @return void
   */
  public function run()
  {
    $this->call(TenantRoleTableSeeder::class);
    $this->call(TenantPermissionTableSeeder::class);
    $this->call(TenantCountriesTableSeeder::class);

    // Module Seeders
    $moduleNames = CustomModules::getModuleNames();

    foreach ($moduleNames as $moduleName) {
      if (file_exists(module_path($moduleName, 'Database/Seeders/Tenant/TenantModuleDatabaseSeeder.php'))) {
        $this->call('Modules\\' . $moduleName . '\Database\Seeders\Tenant\TenantModuleDatabaseSeeder');
      }
    }
  }
}
