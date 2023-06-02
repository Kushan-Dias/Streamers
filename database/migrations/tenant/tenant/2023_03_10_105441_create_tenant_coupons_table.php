<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantCouponsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('coupons', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('store_id');
      $table->unsignedBigInteger('user_id');
      $table->string('code')->unique();
      $table->timestamps();
    });

    Schema::table('coupons', function (Blueprint $table) {
      $table->foreign('store_id')->references('id')->on('stores')->onUpdate('cascade')->onDelete('cascade');
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
    Schema::dropIfExists('coupons');
  }
}