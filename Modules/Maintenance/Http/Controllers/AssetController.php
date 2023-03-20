<?php

namespace Modules\Maintenance\Http\Controllers;

use App\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Maintenance\Entities\Asset;

class AssetController extends BaseController
{
  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api');
    $this->middleware('role_or_permission:manager|list-assets')->only('index', 'datatable');
    $this->middleware('role_or_permission:manager|create-asset')->only('store');
    $this->middleware('role_or_permission:manager|view-asset')->only('show');
    $this->middleware('role_or_permission:manager|edit-asset')->only('update');
    $this->middleware('role_or_permission:manager|delete-asset')->only('delete');
    $this->middleware('role_or_permission:manager|create-maintenance|edit-maintenance|create-asset|edit-asset')->only('getByParent');
  }

  /**
   * Fetch data into the Datatable.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function datatable(Request $request): JsonResponse
  {
    $asset_data = [];

    $columns_list = [
      0 => 'id',
      1 => 'name',
      2 => 'parent',
      3 => 'ongoing_maintenances',
      4 => 'created_at',
    ];

    $draw = $request->input('draw');
    $recordsTotal = Asset::count();
    $recordsFiltered = $recordsTotal;

    $length = $request->input('length');
    $start = $request->input('start');
    $order = $columns_list[$request->input('order.0.column')];
    $dir = $request->input('order.0.dir');

    if (empty($request->input('search.value'))) {
      $asset_data = Asset::offset($start)
        ->with('parent')
        ->with('ongoing_maintenances')
        ->limit($length)
        ->orderBy($order, $dir)
        ->get();
    } else {
      $search_text = $request->input('search.value');

      $asset_data = Asset::where('id', 'LIKE', "%{$search_text}%")
        ->orWhere('name', 'LIKE', "%{$search_text}%")
        ->offset($start)
        ->limit($length)
        ->orderBy($order, $dir)
        ->with('parent')
        ->with('ongoing_maintenances')
        ->get();

      $recordsFiltered = count($asset_data);
    }

    $message = __('allAssets');
    $data['draw'] = $draw;
    $data['recordsTotal'] = $recordsTotal;
    $data['recordsFiltered'] = $recordsFiltered;
    $data['data'] = $asset_data;

    return $this->sendResponse($message, $data);
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $assets = Asset::with('parent')
      ->with('maintenances')
      ->get();

    if ($assets) {
      $message = __('allAssets');
      $data = [
        'count' => count($assets),
        'assets' => $assets,
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
      'name' => ['required', 'min:3'],
      'description' => ['required', 'string'],
      'parent_id' => ['integer', 'exists:assets,id'],
    ];

    $validator = $this->validator($request->all(), $rules);

    if ($validator->fails()) {
      $message = __('validationError');
      $data['reason'] = 'validation-failed';
      $data['fields'] = $validator->errors();

      return $this->sendError($message, $data, 422);
    }

    $asset_data = $request->all();

    $asset = Asset::create($asset_data);

    $message = __('assetCreated');
    $data['asset'] = $asset;

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
    $asset = Asset::where('id', $id)
      ->with('parent')
      ->with('maintenances')
      ->first();

    if ($asset) {
      $message = __('assetFound');
      $data['asset'] = $asset;

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
    $asset = Asset::find($id);

    if ($asset) {
      $asset->update($request->all());

      $message = __('assetUpdated');
      $data = [
        'asset' => $asset,
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
    $asset = Asset::find($id);

    if ($asset) {
      Asset::destroy($id);

      $message = __('assetDeleted');
      $data = [
        'asset' => $asset,
      ];

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }


  /**
   * Get all resources under the specified parent.
   *
   * @param int $id
   * @return JsonResponse
   */
  public function getByParent(int $id): JsonResponse
  {
    if ($id === 0) {
      $assets = Asset::whereNull('parent_id')->get();
    } else {
      $assets = Asset::where('parent_id', $id)->get();
    }

    if ($assets) {
      $message = __('assetFound');
      $data['assets'] = $assets;

      return $this->sendResponse($message, $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
