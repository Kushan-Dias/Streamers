<?php

use App\Services\Constants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantUsersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('first_name', 25);
      $table->string('last_name', 50);
      $table->string('username', 15)->unique();
      $table->string('gender')->nullable();
      $table->string('email')->unique();
      $table->string('email_verification_code')->unique()->nullable();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->string('login_code')->unique()->nullable();
      $table->integer('access_failed_count')->default(0);
      $table->boolean('must_change_password')->default(true);
      $table->enum('status', Constants::USER_STATUSES)->default(Constants::INACTIVE);
      $table->rememberToken();
      $table->string('mobile', 20)->unique()->nullable();
      $table->string('mobile_verification_code')->unique()->nullable();
      $table->timestamp('mobile_verified_at')->nullable();
      $table->string('business_phone', 20)->nullable();
      $table->string('address_one', 50)->nullable();
      $table->string('address_two', 50)->nullable();
      $table->string('city', 50)->nullable();
      $table->unsignedBigInteger('state_id')->nullable();
      $table->string('zip')->nullable();
      $table->unsignedBigInteger('country_id')->nullable();
      $table->timestamp('privacy_statement_accepted_at')->nullable();
      $table->string('time_zone_utc')->nullable();
      $table->string('theme')->nullable();
      $table->json('dashboard_configuration')->nullable();
      $table->string('points')->nullable();
      $table->json('extended_data')->nullable();
      $table->unsignedBigInteger('created_by')->nullable();
      $table->unsignedBigInteger('updated_by')->nullable();
      $table->timestamps();
    });

    Schema::table('users', function (Blueprint $table) {
      $table->foreign('state_id')->references('id')->on('states')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('country_id')->references('id')->on('countries')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('created_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('updated_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users');
  }
}
