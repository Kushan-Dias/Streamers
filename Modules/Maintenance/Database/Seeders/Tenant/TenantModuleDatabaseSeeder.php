<?php

namespace Modules\Maintenance\Database\Seeders\Tenant;

use Illuminate\Database\Seeder;

class TenantModuleDatabaseSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $this->call(TenantMaintenanceSeeder::class);
  }
}
