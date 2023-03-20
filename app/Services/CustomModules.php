<?php

namespace App\Services;


use Nwidart\Modules\Facades\Module;

/**
 * Custom Modules
 */
class CustomModules
{
  /**
   * Get Modules in an array
   *
   * @param bool $status
   * @return array
   */
  public static function getAllModules(bool $status = true): array
  {
    if ($status) {
      $modules = Module::allEnabled();
    } else {
      $modules = Module::all();
    }

    $data = [];

    foreach ($modules as $module) {
      $moduleData = json_decode(Module::find($module->getName())->json(), true);
      $data[] = [
        'name' => $module->getName(),
        'description' => $moduleData['description'],
      ];
    }

    return $data;
  }

  /**
   * Get Module names in an array
   *
   * @return array
   */
  public static function getModuleNames(): array
  {
    if (file_exists(base_path(Constants::MODULE_STATUSES_TENANT))) {
      $moduleStatuses = file_get_contents(base_path(Constants::MODULE_STATUSES));
      $data = json_decode($moduleStatuses, true);
      $moduleNames = [];

      if ($data) {
        foreach ($data as $key => $value) {
          if ($value) {
            $moduleNames[] = $key;
          }
        }
      }

      return $moduleNames;
    }

    return [];
  }

  /**
   * Get modules of a Tenant
   *
   * @param String $id
   * @return array|null
   */
  public static function getTenantModules(string $id): ?array
  {
    if (file_exists(base_path(Constants::MODULE_STATUSES_TENANT))) {
      $tenantModules = file_get_contents(base_path(Constants::MODULE_STATUSES_TENANT));
      $data = json_decode($tenantModules, true);
      $tenantModules = null;

      if ($data) {
        foreach ($data as $key => $value) {
          if ($key == $id) {
            $value = array_map(function ($module) {
              $moduleData = json_decode(Module::find($module['name'])->json(), true);
              $module['description'] = $moduleData['description'];
              $module['version'] = $moduleData['version'];
              $module['author'] = $moduleData['author'];
              $module['repository'] = $moduleData['repository'];

              return $module;
            }, $value);

            $tenantModules = $value;
            break;
          }
        }
      }

      return $tenantModules;
    }

    return null;
  }

  /**
   * Update modules of a Tenant
   *
   * @param String $tenantId
   * @param array $moduleData
   * @return array
   */
  public static function addUpdateTenantModules(string $tenantId, array $moduleData): array
  {
    if (file_exists(base_path(Constants::MODULE_STATUSES_TENANT))) {
      $tenantFileModules = file_get_contents(base_path(Constants::MODULE_STATUSES_TENANT));
      $data = json_decode($tenantFileModules, true);
      $tenantModules = null;

      if ($data) {
        foreach ($data as $key => $value) {
          if ($key == $tenantId) {
            $tenantModules = $value;
            break;
          }
        }
      }

      if ($tenantModules) {
        $data[$tenantId] = array_replace($data[$tenantId], $moduleData['modules']);
      } else {
        $data[$tenantId] = $moduleData['modules'];
      }

      $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
      file_put_contents(base_path(Constants::MODULE_STATUSES_TENANT), stripslashes($newJsonString));

      return $data[$tenantId];
    }

    return [];
  }

  /**
   * Remove modules of a Tenant
   *
   * @param String $id
   * @param array $moduleNames
   * @return array|null
   */
  public static function removeTenantModules(string $id, array $moduleNames): ?array
  {
    if (file_exists(base_path(Constants::MODULE_STATUSES_TENANT))) {
      $tenantFileModules = file_get_contents(base_path(Constants::MODULE_STATUSES_TENANT));
      $data = json_decode($tenantFileModules, true);
      $tenantModules = null;

      if ($data) {
        foreach ($data as $key => $value) {
          if ($key == $id) {
            $tenantModules = $value;
            break;
          }
        }
      }

      if ($tenantModules) {
        foreach ($data[$id] as $tenantModule) {
          if (in_array($tenantModule['name'], $moduleNames['modules'])) {
            unset($data[$id][array_search($tenantModule, $data[$id])]);
          }
        }

        $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(base_path(Constants::MODULE_STATUSES_TENANT), stripslashes($newJsonString));
      } else {
        return null;
      }

      return $moduleNames['modules'];
    }

    return null;
  }
}
