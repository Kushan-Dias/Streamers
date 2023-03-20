<?php

use App\Services\Constants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailTemplatesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('email_templates', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->string('subject');
      $table->text('message');
      $table->string('template_view')->unique()->nullable();
      $table->enum('status', Constants::EMAIL_STATUSES)->default(Constants::ACTIVE);
      $table->unsignedBigInteger('created_by')->nullable();
      $table->unsignedBigInteger('updated_by')->nullable();
      $table->timestamps();

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
    Schema::dropIfExists('email_templates');
  }
}
