<?php

use App\Services\Constants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantMaintenancesTables extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('maintenances', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->text('description');
      $table->text('attachments');
      $table->string('problem_nature');
      $table->unsignedBigInteger('asset_id');
      $table->string('location');
      $table->date('convenient_date')->nullable();
      $table->timestamp('convenient_from')->nullable();
      $table->timestamp('convenient_to')->nullable();
      $table->enum('priority', Constants::MAINTENANCE_PRIORITIES)->default(Constants::LOW);
      $table->enum('status', Constants::MAINTENANCE_STATUSES)->default(Constants::REQUESTED);
      $table->unsignedBigInteger('maintainer')->nullable();
      $table->timestamp('assigned_at')->nullable();
      $table->timestamp('completed_at')->nullable();
      $table->unsignedBigInteger('requested_by')->nullable();
      $table->unsignedBigInteger('created_by')->nullable();
      $table->unsignedBigInteger('updated_by')->nullable();
      $table->integer('rating')->nullable();
      $table->text('review')->nullable();
      $table->timestamps();

      $table->foreign('asset_id')->references('id')->on('assets')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('maintainer')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('requested_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('created_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('updated_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
    });

    Schema::create('maintenance_logs', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('maintenance_id');
      $table->string('log_message');
      $table->json('log_data')->nullable();
      $table->unsignedBigInteger('created_by');
      $table->timestamps();

      $table->foreign('maintenance_id')->references('id')->on('maintenances')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('created_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('maintenance_logs');
    Schema::dropIfExists('maintenances');
  }
}
