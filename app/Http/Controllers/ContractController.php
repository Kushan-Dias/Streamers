<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\OneFlowAccount;
use App\Services\Constants;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ContractController extends BaseController
{
  /**
   * Instantiate a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api')->only(['index', 'show']);
    $this->middleware('role:manager')->only(['index', 'show']);
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $contracts = Contract::with('user:id,first_name,last_name,username,email')
      ->with('template')
      ->get();

    $message = __('allContracts');
    $data['count'] = count($contracts);
    $data['contracts'] = $contracts;

    if ($contracts === null) {
      $message = __('noContractsFound');
    }

    return $this->sendResponse($message, $data);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @return Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return JsonResponse
   */
  public function show(int $id): JsonResponse
  {
    $contract = Contract::where('id', $id)
      ->with('user:id,first_name,last_name,username,email')
      ->with('template')
      ->get();

    if (count($contract) === 0) {
      return $this->notFound();
    }

    $data['contract'] = $contract;
    $message = __('contractFound');

    return $this->sendResponse($message, $data);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param Request $request
   * @param Contract $userContract
   * @return Response
   */
  public function update(Request $request, Contract $userContract)
  {
    //
  }

  /**
   * Handle webhook callbacks from OneFlow.
   * Todo: Check signature
   *
   * @param Request $request
   * @return void
   */
  public function webhook(Request $request): void
  {
    $body = $request->all();

    if (key_exists('contract', $body)) {
      $oneFlowAccount = tenancy()->central(function ($tenant) {
        return OneFlowAccount::where('tenant_id', $tenant->id)->first();
      });


      $contract_id = $body['contract']['id'];
      $events = $body['events'];

      if ($events) {
        foreach ($events as $event) {
          $event_id = $event['id'];
          $event_type = $event['type'];
          $event_created_at = Carbon::createFromTimeString($event['created_time'])->toDateTimeString();

          if (($event_type === "participant:first_visit") || ($event_type === "participant:sign")) {
            $event_response = Http::withHeaders([
              'Accept' => 'application/json',
              'Content-Type' => 'application/json',
              'x-oneflow-api-token' => $oneFlowAccount['token'],
              'x-oneflow-user-email' => $oneFlowAccount['email'],
            ])->get(Constants::ONEFLOW_API_BASE_URL . "/contracts/$contract_id/events/$event_id");

            if ($event_response->ok()) {
              $event = $event_response->json();

              if ($event_type === "participant:first_visit") {
                $participant_id = $event['actor']['party']['id'];
                $contract = Contract::where('id', $contract_id)
                  ->where('participant_id', $participant_id)
                  ->first();

                if ($contract) {
                  $contract->viewed = true;
                  $contract->viewed_at = $event_created_at;
                  $contract->save();
                }

                Log::debug("No contract found for " . $contract_id);
              }

              if ($event_type === "participant:sign") {
                $participant_id = $event['actor']['party']['id'];
                $contract = Contract::where('id', $contract_id)
                  ->where('participant_id', $participant_id)
                  ->first();

                if ($contract) {
                  $contract->signed = true;
                  $contract->signed_at = $event_created_at;
                  $contract->save();
                }
              }
            }

            if ($event_response->failed()) {
              Log::error($event_response->body());
            }

            if ($event_response->serverError()) {
              Log::error($event_response->body());
            }
          }
        }
      }
    } else {
      Log::debug('No contracts');
      $this->sendResponse('Webhook fired', []);
    }
  }
}
