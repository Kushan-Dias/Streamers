<?php

namespace App\Services;

use App\Models\Contract;
use App\Models\ContractTemplate;
use App\Models\OneFlowAccount;
use App\Models\User;
use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class ContractService
{
  public static function createOneFlowContract(ContractTemplate $template, OneFlowAccount $oneFlowAccount, User $user): PromiseInterface|Response
  {
    return Http::withHeaders([
      'Accept' => 'application/json',
      'Content-Type' => 'application/json',
      'x-oneflow-api-token' => $oneFlowAccount['token'],
      'x-oneflow-user-email' => $oneFlowAccount['email'],
    ])->post(Constants::ONEFLOW_API_BASE_URL . "/contracts/create", [
      "my_party" => [
        "creator_inherit_settings_from_template" => true,
        "participants" => [
          [
            "_permissions" => [
              "contract:update" => true
            ],
            "organizer" => true,
            "signatory" => false,
            "email" => $oneFlowAccount['email'],
            "name" => $oneFlowAccount['name'],
            "phone_number" => $oneFlowAccount['mobile'],
            "sign_method" => "standard_esign",
            "title" => $oneFlowAccount['title']
          ]
        ],
        "country_code" => $oneFlowAccount['country_code'],
        "name" => tenant('name'),
        "identification_number" => tenant('id')
      ],
      "parties" => [
        [
          "participant" => [
            "_permissions" => [
              "contract:update" => true
            ],
            "signatory" => true,
            "delivery_channel" => "email",
            "email" => $user['email'],
            "name" => $user["first_name"] . " " . $user["last_name"],
            "phone_number" => $user['mobile'],
            "sign_method" => "standard_esign",
            "title" => "Student"
          ],
          "country_code" => $user->country()->value('code'),
          "type" => "individual"
        ]
      ],
      "name" => $template['name'] . " - " . $user["first_name"] . " " . $user["last_name"],
      "workspace_id" => $template['workspace_id'],
      "template_id" => $template['id']
    ]);
  }

  public static function publishOneFlowContract(ContractTemplate $template, OneFlowAccount $oneFlowAccount, int $contractId): PromiseInterface|Response
  {
    return Http::withHeaders([
      'Accept' => 'application/json',
      'Content-Type' => 'application/json',
      'x-oneflow-api-token' => $oneFlowAccount['token'],
      'x-oneflow-user-email' => $oneFlowAccount['email'],
    ])->post(Constants::ONEFLOW_API_BASE_URL . "/contracts/$contractId/publish", [
      "subject" => tenant('name') . " - " . $template['name'],
      "message" => "Please sign the contract to continue with the on-boarding process."
    ]);
  }

  public static function createContract(int $templateId, $contractPublish, int $userId)
  {
    $party = current(array_filter($contractPublish['parties'], function ($party) {
      return !$party['my_party'];
    }));

    return Contract::create([
      'id' => $contractPublish['id'],
      'template_id' => $templateId,
      'participant_id' => $party['id'],
      'user_id' => $userId,
    ]);
  }
}
