<?php

namespace App\Http\Controllers;

use App\Models\Event\Event;
use App\Models\Event\EventExclusion;
use App\Repositories\EventRepository;
use App\Services\Constants;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EventController extends BaseController
{
  private EventRepository $eventRepository;

  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct(EventRepository $eventRepository)
  {
    $this->middleware('auth:api');
    $this->middleware('role_or_permission:manager|list-events')->only('index', 'calendar');
    $this->middleware('role_or_permission:manager|create-event')->only('store');
    $this->middleware('role_or_permission:manager|view-event')->only('show');
    $this->middleware('role_or_permission:manager|edit-event')->only('update', 'addExclusion', 'removeExclusion');
    $this->middleware('role_or_permission:manager|delete-event')->only('delete');

    $this->eventRepository = $eventRepository;
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $events = Event::with('event_recurring_pattern')
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
    $events = Event::with('event_recurring_pattern')
      ->with('event_exclusions')
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
      $this->eventRepository->mapCalendarEvents($normalEvents),
      $this->eventRepository->mapRecurringEvents($recurringEvents)
    );

    $message = __('allCalendarEvents');
    $data = [
      'count' => count($events),
      'events' => $calendarEvents,
    ];

    return $this->sendResponse($message, $data);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request): JsonResponse
  {
    $rules = [
      'name' => ['required', 'string'],
      'description' => ['required', 'string'],
      'image_url' => ['required', 'string'],
      'organizer' => ['required', 'string'],
      'event_date' => ['required', 'date_format:Y-m-d', 'after_or_equal:' . date('Y-m-d')],
      'start_time' => ['required', 'date_format:Y-m-d\TH:i:sO', 'after_or_equal:now'],
      'end_time' => ['required', 'date_format:Y-m-d\TH:i:sO', 'after:start_time'],
      'location_name' => ['required', 'string'],
      'location_url' => ['string'],
      'status' => ['string', Rule::in(Constants::EVENT_STATUSES)],
      'limit' => ['integer'],
      'recurring_type' => ['required', 'string', Rule::in(Constants::EVENT_RECURRING_TYPES)],
      'occurrence' => ['required_if:recurring_type,' . Constants::REPEAT, 'string', Rule::in(Constants::EVENT_OCCURRENCES)],
      'end_date' => ['required_if:recurring_type,' . Constants::REPEAT, 'date_format:Y-m-d'],
      'custom_dates' => ['required_if:recurring_type,' . Constants::CUSTOM, 'string'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $event_data = $request->all();
    $event_data['start_time'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['start_time'])->tz('UTC');
    $event_data['end_time'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['end_time'])->tz('UTC');
    $event_data['event_date'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['start_time'])->tz('UTC')->toDateString();
    $event_data['created_by'] = auth()->id();

    $event = Event::create($event_data);

    if ($request->input('recurring_type') === Constants::REPEAT) {
      $recurring_data = $request->only('recurring_type', 'occurrence', 'end_date');
      if (!empty($request->input('custom_dates'))) {
        $recurring_data['custom_dates'] = json_encode($request->input('custom_dates'));
      }
      $recurring_data['event_id'] = $event->id;
      $event->event_recurring_pattern()->create($recurring_data);
    } else if ($request->input('recurring_type') === Constants::CUSTOM) {
      $recurring_data = $request->only('recurring_type');
      if (!empty($request->input('custom_dates'))) {
        $recurring_data['custom_dates'] = json_encode($request->input('custom_dates'));
      }
      $recurring_data['event_id'] = $event->id;
      $event->event_recurring_pattern()->create($recurring_data);
    }

    $message = __('eventCreated');
    $data['event'] = $event;

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
    $event = Event::where('id', $id)
      ->with('event_recurring_pattern')
      ->with('event_exclusions');

    if ($event) {
      $message = __('Event found');
      $data['event'] = $event->first();
      if ($data['event']['event_recurring_pattern'] !== null) {
        $data['recurring_data'] = $this->eventRepository->mapRecurringEvents($event->get()->toArray(), false);
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
    $event = Event::find($id);

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
    $event = Event::find($id);

    if ($event) {
      Event::destroy($id);

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

    $eventExclusion = EventExclusion::create($request->only('event_id', 'date'));

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
    $eventExclusion = EventExclusion::find($id);

    if ($eventExclusion) {
      EventExclusion::destroy($id);

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
