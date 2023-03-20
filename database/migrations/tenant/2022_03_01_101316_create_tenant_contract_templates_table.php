<?php

use App\Services\Constants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

class CreateTenantContractTemplatesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('contract_templates', function (Blueprint $table) {
      $table->bigInteger('id')->primary();
      $table->bigInteger('workspace_id');
      $table->string('name');
      $table->integer('version');
      $table->unsignedBigInteger(PermissionRegistrar::$pivotRole);
      $table->enum('status', Constants::CONTRACT_STATUSES)->default(Constants::ACTIVE);
      $table->timestamps();
    });

    Schema::table('contract_templates', function (Blueprint $table) {
      $table->foreign(PermissionRegistrar::$pivotRole)->references('id')->on('roles')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('contract_templates');
  }
}
