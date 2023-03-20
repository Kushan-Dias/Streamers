<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountriesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   * Todo: UPDATE NEEDED
   *
   * @return void
   */
  public function run()
  {
    $countries = [
      ['name' => 'Sri Lanka', 'code' => 'LK', 'region_name' => 'South Asia', 'region_code' => 'SA'],
    ];

    foreach ($countries as $country) {
      Country::create([
        'name' => $country['name'],
        'code' => $country['code'],
        'region_name' => $country['region_name'],
        'region_code' => $country['region_code'],
      ]);
    }
  }
}
