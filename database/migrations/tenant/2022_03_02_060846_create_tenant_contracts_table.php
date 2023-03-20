<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantContractsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('contracts', function (Blueprint $table) {
      $table->bigInteger('id')->primary();
      $table->bigInteger('template_id');
      $table->bigInteger('participant_id');
      $table->unsignedBigInteger('user_id');
      $table->boolean('signed')->default(false);
      $table->timestamp('signed_at')->nullable();
      $table->boolean('viewed')->default(false);
      $table->timestamp('viewed_at')->nullable();
      $table->timestamps();
    });

    Schema::table('contracts', function (Blueprint $table) {
      $table->foreign('template_id')->references('id')->on('contract_templates')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('contracts');
  }
}
