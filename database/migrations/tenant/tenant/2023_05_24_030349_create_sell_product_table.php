<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sell_product', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('country');
            $table->string('email');
            $table->string('phone');
            $table->string('payment_method_title');
            $table->string('order_id');
            $table->string('coupon_code');
            $table->string('discount');
            $table->string('streamer_id');
            $table->string('Item_name');
            $table->string('subtotal');
            $table->string('total');
            $table->string('date');
            $table->boolean('fetched_to_obs')->default(true);
            $table->timestamp('fetched_time')->nullable();
            $table->json('full_json');
            $table->string('obs_response');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sell_product');
    }
}
