<?php

namespace Modules\Maintenance\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\User;
use App\Repositories\MaintenanceRepository;
use App\Services\Constants;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Modules\Maintenance\Entities\Maintenance;
use Modules\Maintenance\Entities\MaintenanceLog;

class MaintenanceController extends BaseController
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
    $this->middleware('role_or_permission:manager|list-maintenances')->only('index', 'datatable');
    $this->middleware('role_or_permission:manager|create-maintenance')->only('store');
    $this->middleware('role_or_permission:manager|view-maintenance')->only('show', 'logs');
    $this->middleware('role_or_permission:manager|edit-maintenance')->only('update', 'addExclusion');
    $this->middleware('role_or_permission:manager|delete-maintenance')->only('delete');
    $this->middleware('role_or_permission:manager|assign-maintenance')->only('assign');

    $this->maintenanceRepository = $maintenanceRepository;
  }

  /**
   * Fetch data into the Datatable.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function datatable(Request $request): JsonResponse
  {
    $maintenance_data = [];

    $columns_list = [
      0 => 'id',
      1 => 'user',
      2 => 'asset',
      3 => 'maintainer',
      4 => 'status',
      5 => 'assigned_at',
      6 => 'priority',
      7 => 'created_at',
    ];

    $draw = $request->input('draw');
    $recordsTotal = Maintenance::count();
    $recordsFiltered = $recordsTotal;

    $length = $request->input('length');
    $start = $request->input('start');
    $order = $columns_list[$request->input('order.0.column')];
    $dir = $request->input('order.0.dir');

    if (empty($request->input('search.value'))) {
      $maintenance_data = Maintenance::offset($start)
        ->with('asset')
        ->with('requested_by')
        ->with('created_by')
        ->with('maintainer')
        ->limit($length)
        ->orderBy($order, $dir)
        ->get();
    } else {
      $search_text = $request->input('search.value');

      $maintenance_data = Maintenance::where('id', 'LIKE', "%{$search_text}%")
        ->orWhere('priority', 'LIKE', "%{$search_text}%")
        ->orWhere('status', 'LIKE', "%{$search_text}%")
        ->offset($start)
        ->limit($length)
        ->orderBy($order, $dir)
        ->with('asset')
        ->with('requested_by')
        ->with('created_by')
        ->with('maintainer')
        ->get();

      $recordsFiltered = count($maintenance_data);
    }

    $message = __('All maintenances');
    $data['draw'] = $draw;
    $data['recordsTotal'] = $recordsTotal;
    $data['recordsFiltered'] = $recordsFiltered;
    $data['data'] = $maintenance_data;

    return $this->sendResponse($message, $data);
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $maintenances = Maintenance::with('asset')
      ->with('requested_by')
      ->with('created_by')
      ->with('maintainer')
      ->get();

    if ($maintenances) {
      $message = __('All maintenances');
      $data = [
        'count' => count($maintenances),
        'maintenances' => $maintenances,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
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
      'title' => ['required', 'min:3'],
      'description' => ['required', 'string'],
      'attachments' => ['required', 'string'],
      'problem_nature' => ['string'],
      'asset_id' => ['integer', 'exists:assets,id'],
      'location' => ['required', 'string'],
      'convenient_date' => ['required', 'date_format:Y-m-d', 'after_or_equal:' . date('Y-m-d')],
      'convenient_from' => ['required', 'date_format:Y-m-d\TH:i:sO', 'after_or_equal:now'],
      'convenient_to' => ['required', 'date_format:Y-m-d\TH:i:sO', 'after:convenient_from'],
      'priority' => ['required', 'string', Rule::in(Constants::MAINTENANCE_PRIORITIES)],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $maintenance_data = $request->all();
    $maintenance_data['convenient_from'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['convenient_from'])->tz('UTC');
    $maintenance_data['convenient_to'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['convenient_to'])->tz('UTC');
    $maintenance_data['requested_by'] = $request->only('requested_by') ? $request->only('requested_by') : auth()->id();
    $maintenance_data['created_by'] = auth()->id();

    $maintenance = Maintenance::create($maintenance_data);

    $maintenance_log = [
      'maintenance_id' => $maintenance->id,
      'log_message' => 'request-created',
      'created_by' => $maintenance->requested_by,
    ];

    MaintenanceLog::create($maintenance_log);

    $message = __("Maintenance created");
    $data['maintenance'] = $maintenance;
    $data['log'] = $maintenance_log;

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
    $maintenance = Maintenance::where('id', $id)
      ->with('asset')
      ->with('requested_by')
      ->with('created_by')
      ->with('maintainer')
      ->with('maintenance_event')
      ->first();

    if ($maintenance) {
      $message = __('Maintenance found');
      $data['maintenance'] = $maintenance;

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
    $maintenance = Maintenance::find($id);

    if ($maintenance) {
      $maintenance->update($request->all());

      $message = __('Maintenance updated successfully');
      $data = [
        'maintenance' => $maintenance,
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
    $asset = Maintenance::find($id);

    if ($asset) {
      Maintenance::destroy($id);

      $message = __('Maintenance deleted successfully');
      $data = [
        'maintenance' => $asset,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Assign a user for maintenance.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function assign(Request $request): JsonResponse
  {
    $rules = [
      'maintenance_id' => ['required', 'integer', 'exists:maintenances,id'],
      'maintainer' => ['required', 'integer', 'exists:users,id'],
      'event_date' => ['required', 'date_format:Y-m-d', 'after_or_equal:' . date('Y-m-d')],
      'start_time' => ['required', 'date_format:Y-m-d\TH:i:sO', 'after_or_equal:now'],
      'end_time' => ['required', 'date_format:Y-m-d\TH:i:sO', 'after:start_time'],
      'status' => ['string', Rule::in(Constants::EVENT_STATUSES)],
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

    $maintenance = Maintenance::find($request->only('maintenance_id'))->first();

    if ($maintenance) {
      $maintenance_data = $request->all();
      $maintenance_data['status'] = Constants::ASSIGNED;
      $maintenance_data['updated_by'] = auth()->id();
      $maintenance_data['assigned_at'] = Carbon::now();
      $maintenance->update($maintenance_data);

      $maintainer = User::find($request->only('maintainer'))->first();

      $event_data = $request->only('maintenance_id', 'event_date', 'start_time', 'end_time', 'status');
      $event_data['event_date'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['start_time'])->tz('UTC')->toDateString();
      $event_data['start_time'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['start_time'])->tz('UTC');
      $event_data['end_time'] = Carbon::createFromFormat('Y-m-d\TH:i:sO', $request['end_time'])->tz('UTC');
      $event_data['created_by'] = auth()->id();

      $event = $maintenance->maintenance_event()->first();

      if ($event) {
        $event->update($event_data);
      } else {
        $event = MaintenanceEvent::create($event_data);
      }

      if ($request->input('recurring_type') === Constants::REPEAT) {
        $recurring_data = $request->only('recurring_type', 'occurrence', 'end_date');
        $recurring_data['event_id'] = $event->id;
        $recurring_data['custom_dates'] = null;

        $event->event_recurring_pattern()->delete();
        $event->event_recurring_pattern()->create($recurring_data);
        $event->event_exclusions()->delete();
      } else if ($request->input('recurring_type') === Constants::CUSTOM) {
        $recurring_data['event_id'] = $event->id;
        $recurring_data = $request->only('recurring_type');
        if (!empty($request->input('custom_dates'))) {
          $recurring_data['custom_dates'] = json_encode($request->input('custom_dates'));
        }

        $event->event_recurring_pattern()->delete();
        $event->event_recurring_pattern()->create($recurring_data);
        $event->event_exclusions()->delete();
      } else {
        $event->event_recurring_pattern()->delete();
        $event->event_exclusions()->delete();
      }

      $maintenance_log = [
        'maintenance_id' => $maintenance->id,
        'log_message' => 'maintainer-assigned',
        'log_data' => json_encode([
          'maintainer' => $maintainer->first_name . ' ' . $maintainer->last_name,
          'start_time' => $event_data['start_time'],
          'end_time' => $event_data['end_time'],
        ]),
        'created_by' => $maintenance->updated_by,
      ];

      MaintenanceLog::create($maintenance_log);

      $message = __('Maintainer assigned successfully');
      $data = [
        'maintenance' => $maintenance,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * Get maintenance logs.
   *
   * @param int $id
   * @return JsonResponse
   */
  public function logs(int $id): JsonResponse
  {
    $maintenance_logs = MaintenanceLog::where('maintenance_id', $id)
      ->with('created_by:id,first_name,last_name,email')
      ->orderBy('created_at', 'DESC')
      ->get();

    $message = __('Maintenance logs');
    $data['logs'] = $this->maintenanceRepository->mapMaintenanceLogs($maintenance_logs->toArray());

    return $this->sendResponse($message, $data);
  }
}
