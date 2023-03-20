<?php

use App\Services\Constants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOneFlowAccountsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('one_flow_accounts', function (Blueprint $table) {
      $table->id();
      $table->string('tenant_id');
      $table->string('name');
      $table->string('email');
      $table->string('token');
      $table->string('mobile');
      $table->string('title');
      $table->string('country_code');
      $table->enum('status', Constants::ONEFLOW_STATUSES)->default(Constants::ACTIVE);
      $table->timestamps();
    });

    Schema::table('one_flow_accounts', function (Blueprint $table) {
      $table->foreign('tenant_id')->references('id')->on('tenants')->onUpdate('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('one_flow_accounts');
  }
}
