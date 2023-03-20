<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantAssetsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('assets', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->text('description')->nullable();
      $table->text('location')->nullable();
      $table->text('images')->nullable();
      $table->unsignedBigInteger('parent_id')->nullable();
      $table->timestamps();
    });

    Schema::table('assets', function (Blueprint $table) {
      $table->foreign('parent_id')->references('id')->on('assets')->onUpdate('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('assets');
  }
}
