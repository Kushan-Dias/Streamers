<?php

use App\Services\Constants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantMaintenanceEventsTables extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('maintenance_events', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('maintenance_id');
      $table->date('event_date')->nullable();
      $table->timestamp('start_time')->nullable();
      $table->timestamp('end_time')->nullable();
      $table->enum('status', Constants::EVENT_STATUSES)->default(Constants::ACTIVE);
      $table->unsignedBigInteger('created_by')->nullable();
      $table->unsignedBigInteger('updated_by')->nullable();
      $table->unsignedBigInteger('canceled_by')->nullable();
      $table->unsignedBigInteger('postponed_by')->nullable();
      $table->timestamps();

      $table->foreign('maintenance_id')->references('id')->on('maintenances')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('created_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('updated_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('canceled_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('postponed_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
    });

    Schema::create('maintenance_event_recurring_patterns', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('event_id');
      $table->enum('recurring_type', Constants::EVENT_RECURRING_TYPES);
      $table->enum('occurrence', Constants::EVENT_OCCURRENCES)->nullable();
      $table->date('end_date')->nullable();
      $table->json('custom_dates')->nullable();
      $table->timestamps();

      $table->foreign('event_id')->references('id')->on('maintenance_events')->onUpdate('cascade')->onDelete('cascade');
    });

    Schema::create('maintenance_event_exclusions', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('event_id');
      $table->date('date');
      $table->timestamps();

      $table->foreign('event_id')->references('id')->on('maintenance_events')->onUpdate('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('maintenance_event_exclusions');
    Schema::dropIfExists('maintenance_event_recurring_patterns');
    Schema::dropIfExists('maintenance_events');
  }
}
