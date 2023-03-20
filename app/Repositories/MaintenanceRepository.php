<?php

namespace App\Repositories;

use App\Services\Constants;
use Carbon\Carbon;
use Modules\Maintenance\Entities\MaintenanceEvent\MaintenanceEvent;

class MaintenanceRepository extends BaseRepository
{
  private string $eventType = 'maintenance';

  /**
   * Instantiate a new controller instance.
   *
   * @param MaintenanceEvent $maintenanceEvent
   */
  public function __construct(MaintenanceEvent $maintenanceEvent)
  {
    $this->model = $maintenanceEvent;
  }

  /**
   * @param $normalEvents
   * @return array
   */
  public function mapCalendarEvents($normalEvents): array
  {
    $calendarEvents = [];

    foreach ($normalEvents as $normalEvent) {
      $event = [];
      $extendedProps = [];

      $event['title'] = $normalEvent['maintenance']['title'];
      $event['start'] = $normalEvent['start_time'];
      $event['end'] = $normalEvent['end_time'];

      $extendedProps['eventId'] = $normalEvent['id'];
      $extendedProps['maintenanceId'] = $normalEvent['maintenance']['id'];
      $extendedProps['type'] = $this->eventType;

      $event['extendedProps'] = $extendedProps;
      $calendarEvents[] = $event;
    }

    return $calendarEvents;
  }

  /**
   * @param $recurringEvents
   * @param bool $removeExclusions
   * @return array
   */
  public function mapRecurringEvents($recurringEvents, bool $removeExclusions = true): array
  {
    $calendarEvents = [];

    foreach ($recurringEvents as $recurringEvent) {
      $recurring_pattern = $recurringEvent['event_recurring_pattern'];
      $recurring_type = $recurring_pattern['recurring_type'];
      $recurringId = $recurring_pattern['id'];
      $occurrence = $recurring_pattern['occurrence'];
      $event_exclusions = array_map(function ($e) {
        return $e['date'];
      }, $recurringEvent['event_exclusions']);

      $extendedProps = [
        'eventId' => $recurringEvent['id'],
        'maintenanceId' => $recurringEvent['maintenance']['id'],
        'type' => $this->eventType,
        'isRecurring' => true,
        'recurringId' => $recurringId,
      ];

      if ($recurring_type === Constants::REPEAT) {
        $startTime = Carbon::createFromFormat('Y-m-d\TH:i:sO', $recurringEvent['start_time']);
        $endTime = Carbon::createFromFormat('Y-m-d\TH:i:sO', $recurringEvent['end_time']);
        $endDate = Carbon::createFromFormat('Y-m-d', $recurring_pattern['end_date']);

        $extendedProps['isRepeating'] = true;
        $extendedProps['occurrence'] = $occurrence;

        do {
          $event = [];

          if (!in_array($startTime->format('Y-m-d'), $event_exclusions) || !$removeExclusions) {
            $event['title'] = $recurringEvent['maintenance']['title'];
            $event['start'] = $startTime->format('Y-m-d\TH:i:sO');
            $event['end'] = $endTime->format('Y-m-d\TH:i:sO');

            $event['extendedProps'] = $extendedProps;
            $calendarEvents[] = $event;
          }

          if ($occurrence === Constants::REPEAT_DAILY) {
            $startTime = $startTime->addDay();
            $endTime = $endTime->addDay();
          }

          if ($occurrence === Constants::REPEAT_WEEKLY) {
            $startTime = $startTime->addDays(7);
            $endTime = $endTime->addDays(7);
          }

          if ($occurrence === Constants::REPEAT_MONTHLY) {
            $startTime = $startTime->addMonth();
            $endTime = $endTime->addMonth();
          }

          if ($startTime->gt($endDate->format('Y-m-d') . ' ' . $startTime->format('H:i:s'))) {
            break;
          }

        } while ($startTime->lte($endDate->format('Y-m-d') . ' ' . $startTime->format('H:i:s')));
      }

      if ($recurring_type === Constants::CUSTOM) {
        $startTime = Carbon::createFromFormat('Y-m-d\TH:i:sO', $recurringEvent['start_time']);
        $endTime = Carbon::createFromFormat('Y-m-d\TH:i:sO', $recurringEvent['end_time']);
        $customDates = explode(', ', trim($recurring_pattern['custom_dates'], "\""));

        $event = [];
        $extendedProps['isCustom'] = true;
        $extendedProps['customIndex'] = 1;

        $event['title'] = $recurringEvent['maintenance']['title'];
        $event['start'] = $startTime->format('Y-m-d\TH:i:sO');
        $event['end'] = $endTime->format('Y-m-d\TH:i:sO');

        $event['extendedProps'] = $extendedProps;
        $calendarEvents[] = $event;

        foreach ($customDates as $i => $customDate) {
          $start = $customDate . 'T' . $startTime->format('H:i:sO');
          $end = $customDate . 'T' . $endTime->format('H:i:sO');

          $event = [];
          $event['title'] = $recurringEvent['maintenance']['title'];
          $event['start'] = $start;
          $event['end'] = $end;

          $extendedProps['customIndex'] = $i + 2;

          $event['extendedProps'] = $extendedProps;
          $calendarEvents[] = $event;
        }
      }
    }

    return $calendarEvents;
  }

  /**
   * @param array $maintenanceLogs
   * @return array
   */
  public function mapMaintenanceLogs(array $maintenanceLogs): array
  {
    $logs = [];
    if (count($maintenanceLogs) > 0) {
      foreach ($maintenanceLogs as $maintenanceLog) {
        $log = [];

        $log['title'] = $this->mapTitle($maintenanceLog['log_message']);
        $log['description'] = $this->mapDescription($maintenanceLog);
        $log['log_data'] = json_decode($maintenanceLog['log_data']);
        $log['created_at'] = $maintenanceLog['created_at'];

        $logs[] = $log;
      }
    }

    return $logs;
  }

  /**
   * @param $logMessage
   * @return string
   */
  private function mapTitle($logMessage): string
  {
    return match ($logMessage) {
      'request-created' => __('requestCreatedTitle'),
      'maintainer-assigned' => __('maintainerAssignedTitle'),
      default => '',
    };
  }

  /**
   * @param $maintenanceLog
   * @return string
   */
  private function mapDescription($maintenanceLog): string
  {
    return match ($maintenanceLog['log_message']) {
      'request-created' => __('maintenanceRequestCreatedMessage', ['maintainer' => $maintenanceLog['created_by']['first_name'] . ' ' . $maintenanceLog['created_by']['last_name']]),
      'maintainer-assigned' => __('maintainerAssignedMessage', ['maintainer' => json_decode($maintenanceLog['log_data'])->maintainer]),
      default => '',
    };
  }
}
