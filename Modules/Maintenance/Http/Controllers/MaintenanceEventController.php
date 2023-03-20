<?php

namespace Modules\Maintenance\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\MaintenanceEvent\MaintenanceEventExclusion;
use App\Repositories\MaintenanceRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Maintenance\Entities\MaintenanceEvent\MaintenanceEvent;

class MaintenanceEventController extends BaseController
{
  private MaintenanceRepository $maintenanceRepository;

  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct(MaintenanceRepository $maintenanceRepository)
  {
    $this->middleware('auth:api');
    $this->middleware('role_or_permission:manager|list-mt-events')->only('index', 'calendar');
    $this->middleware('role_or_permission:manager|view-mt-event')->only('show');
    $this->middleware('role_or_permission:manager|edit-mt-event')->only('update', 'addExclusion', 'removeExclusion');
    $this->middleware('role_or_permission:manager|delete-mt-event')->only('delete');

    $this->maintenanceRepository = $maintenanceRepository;
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $events = MaintenanceEvent::with('event_recurring_pattern')
      ->with('event_exclusions')
      ->get();

    if ($events) {
      $message = __('allEvents');
      $data = [
        'count' => count($events),
        'events' => $events,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function calendar(): JsonResponse
  {
    $events = MaintenanceEvent::with('event_recurring_pattern')
      ->with('event_exclusions')
      ->with('maintenance')
      ->get();

    if (!$events) {
      $message = __('resourceNotFound');
      $data['reason'] = 'resource-not-found';

      return $this->sendError($message, $data);
    }

    $normalEvents = array_filter($events->toArray(), function ($e) {
      return $e['event_recurring_pattern'] === null;
    });

    $recurringEvents = array_filter($events->toArray(), function ($e) {
      return $e['event_recurring_pattern'] !== null;
    }, ARRAY_FILTER_USE_BOTH);

    $calendarEvents = array_merge(
      $this->maintenanceRepository->mapCalendarEvents($normalEvents),
      $this->maintenanceRepository->mapRecurringEvents($recurringEvents)
    );

    $message = __('allCalendarEvents');
    $data = [
      'count' => count($events),
      'events' => $calendarEvents,
    ];

    return $this->sendResponse($message, $data);
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return JsonResponse
   */
  public function show(int $id): JsonResponse
  {
    $event = MaintenanceEvent::where('id', $id)
      ->with('event_recurring_pattern')
      ->with('maintenance')
      ->with('event_exclusions');

    if ($event) {
      $message = __('Event found');
      $data['event'] = $event->first();
      if ($data['event']['event_recurring_pattern'] !== null) {
        $data['recurring_data'] = $this->maintenanceRepository->mapRecurringEvents($event->get()->toArray(), false);
      } else {
        $data['recurring_data'] = null;
      }

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param Request $request
   * @param int $id
   * @return JsonResponse
   */
  public function update(Request $request, int $id): JsonResponse
  {
    $event = MaintenanceEvent::find($id);

    if ($event) {
      $event->update($request->all());

      $message = __('eventUpdated');
      $data = [
        'event' => $event,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return JsonResponse
   */
  public function destroy(int $id): JsonResponse
  {
    $event = MaintenanceEvent::find($id);

    if ($event) {
      MaintenanceEvent::destroy($id);

      $message = __('eventDeleted');
      $data = [
        'event' => $event,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function addExclusion(Request $request): JsonResponse
  {
    $rules = [
      'event_id' => ['required', 'integer', 'exists:events,id'],
      'date' => ['required', 'date_format:Y-m-d'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $eventExclusion = MaintenanceEventExclusion::create($request->only('event_id', 'date'));

    $message = __('eventExclusionAdded');
    $data['event_exclusion'] = $eventExclusion;

    return $this->sendResponse($message, $data);
  }

  /**
   * @param int $id
   * @return JsonResponse
   */
  public function removeExclusion(int $id): JsonResponse
  {
    $eventExclusion = MaintenanceEventExclusion::find($id);

    if ($eventExclusion) {
      MaintenanceEventExclusion::destroy($id);

      $message = __('eventExclusionRemoved');
      $data = [
        'event_exclusion' => $eventExclusion,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
