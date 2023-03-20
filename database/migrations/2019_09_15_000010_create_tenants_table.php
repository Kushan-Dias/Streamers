<?php

use App\Services\Constants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up(): void
  {
    Schema::create('tenants', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->string('name');
      $table->enum('plan', Constants::TENANT_PLANS)->default(Constants::BASIC);
      $table->enum('status', Constants::TENANT_STATUSES)->default(Constants::ACTIVE);
      $table->json('data')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down(): void
  {
    Schema::dropIfExists('tenants');
  }
}
