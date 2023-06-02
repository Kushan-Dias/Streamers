<?php

namespace App\Http\Controllers;

use App\Events\StoreOrderComplete;
use App\Models\Coupon;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function store(Request $request): JsonResponse
  {
    $store = Store::create([
      "name" => $request['name'],
      "location" => $request['location'],
      "base_url" => $request['base_url'],
    ]);

    $message = "Store created";
    $data = [
      'store' => $store,
    ];

    return $this->sendResponse($message, $data);
  }

  /**
   * Display the specified resource.
   *
   * @param \App\Models\Store $store
   * @return \Illuminate\Http\Response
   */
  public function show(Store $store)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param \App\Models\Store $store
   * @return \Illuminate\Http\Response
   */
  public function edit(Store $store)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param Request $request
   * @param \App\Models\Store $store
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Store $store)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Models\Store $store
   * @return \Illuminate\Http\Response
   */
  public function destroy(Store $store)
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function createToken(Request $request): JsonResponse
  {
    $id = $request['storeId'];
    $store = Store::find($id);

    if ($store) {
      $store->tokens()->delete();
      $token = $store->createToken($store->name);

      $data["token"] = $token->plainTextToken;

      return $this->sendResponse("Token created", $data);
    }

    $message = __('resourceNotFound');
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function verifyStore(Request $request): JsonResponse
  {
    $store = auth('sanctum')->user();

    $message = "Token verified";
    $data['store'] = $store;

    return $this->sendResponse($message, $data);
  }


  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function orderComplete(Request $request): JsonResponse
  {
    $couponCode = $request['couponCode'];

    $store = auth('sanctum')->user();
    $coupon = Coupon::where('code', $couponCode)->first();

    if ($store && $coupon) {
      $user = $coupon->user;
      $data = [];

     // broadcast(new StoreOrderComplete($store, $coupon, $user, $data));

      $message = "New order from coupon";
      $data = [
        "coupon" => $coupon->code,
        "store" => $store->name,
        "user" => $user->username
      ];

      return $this->sendResponse($message, $data);
    }

    $message = "Store not found";
    $data['reason'] = 'resource-not-found';

    return $this->sendError($message, $data);
  }
}
