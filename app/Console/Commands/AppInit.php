<?php

namespace App\Console\Commands;

use App\Services\Constants;
use Illuminate\Console\Command;

class AppInit extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:init';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Initialize application modules and settings';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return void
   */
  public function createModuleStatusFiles()
  {
    $path = "./Modules";
    $dirs = [];

    $dir = dir($path);

    while (false !== ($entry = $dir->read())) {
      if ($entry != '.' && $entry != '..') {
        if (is_dir($path . '/' . $entry)) {
          $dirs[] = $entry;
        }
      }
    }

    if (file_exists(base_path(Constants::MODULE_STATUSES))) {
      $moduleStatusesData = json_decode(file_get_contents(base_path(Constants::MODULE_STATUSES)), true);
      $modules = array_filter($moduleStatusesData, function ($value) {
        return $value;
      });

      $modules = array_keys($modules);

      $data = [];

      if (count($dirs) > 0) {
        foreach ($dirs as $dir) {
          if (in_array($dir, $modules)) {
            $data[$dir] = true;
          } else {
            $data[$dir] = false;
          }
        }

        file_put_contents(base_path(Constants::MODULE_STATUSES), stripslashes(json_encode($data, JSON_PRETTY_PRINT)));
      }
    } else {
      $moduleStatusesJson = fopen(base_path(Constants::MODULE_STATUSES), "w");
      fwrite($moduleStatusesJson, "{}");
    }

    if (file_exists(base_path(Constants::MODULE_STATUSES_TENANT))) {

    } else {
      $moduleStatusesTenantJson = fopen(base_path(Constants::MODULE_STATUSES_TENANT), "w");
      fwrite($moduleStatusesTenantJson, "{}");
    }
  }

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $this->createModuleStatusFiles();
  }
}
