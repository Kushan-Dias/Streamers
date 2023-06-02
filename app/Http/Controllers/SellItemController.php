<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\sellProduct;
use App\Models\TestModel;


class SellItemController extends Controller
{

  public function index()
{
    $products = sellProduct::select('first_name', 'coupon_code','total')
                          ->where('fetched_to_obs', '=', 1)
                          ->where('streamer_id', '2')
                          ->orderBy('first_name', 'asc')
                          ->get();

    return response()->json($products);
}
  // public function sell(Request $request)
  // {
  //     // Validate the request data if needed
  //     // $validatedData = $request->validate([
  //     //     'first_name'=> 'required|string',
  //     //     'last_name'=> 'required|string',
  //     //     'country'=> 'required|string',
  //     //     'email'=> 'required|string',
  //     //     'phone'=> 'required|string',
  //     //     'payment_method_title'=> 'required|string',
  //     //     'order_id'=> 'required|string',
  //     //     'coupon_code'=> 'required|string',
  //     //     'discount'=> 'required|string',
  //     //     'streamer_id'=> 'required|string',
  //     //     'Item_name'=> 'required|string',
  //     //     'subtotal'=> 'required|string',
  //     //     'total'=> 'required|string',
  //     //     'date'=> 'required|string',
  //     //     'full_json'=> 'required',
  //     // ]);

  //     // Create a new post instance
  //     $sell = new sellProduct;
  //     $sell->first_name = $request->input('first_name');
  //     $sell->last_name = $request->input('last_name');
  //     $sell->country = $request->input('country');
  //     $sell->email = $request->input('email');
  //     $sell->phone = $request->input('phone');
  //     $sell->payment_method_title = $request->input('payment_method_title');
  //     $sell->order_id = $request->input('order_id');
  //     $sell->coupon_code = $request->input('coupon_code');
  //     $sell->discount = $request->input('discount');
  //     $sell->streamer_id = $request->input('streamer_id');
  //     $sell->Item_name = $request->input('Item_name');
  //     $sell->subtotal = $request->input('subtotal');
  //     $sell->total = $request->input('total');
  //     $sell->date = $request->input('date');
  //     $sell->full_json = $request->input('full_json');
  //     $sell->obs_response=$request->input('obs_response');


  //     // Set other properties if needed

  //     // Save the post to the database
  //     $sell->save();

  //     // Return a response if needed
  //     return response()->json(['message' => 'item saved successfully'], 201);
  // }

  public function sell(Request $request)
{
    // Validate the request data if needed
    $rules = [
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'country' => 'required|string',
        'email' => 'required|string',
        'phone' => 'required|string',
        'payment_method_title' => 'required|string',
        'order_id' => 'required|string',
        'coupon_code' => 'required|string',
        'discount' => 'required|integer',
        'streamer_id' => 'required|string',
        'Item_name' => 'required|string',
        'subtotal' => 'required|integer',
        'total' => 'required|integer',
        'date' => 'required|string',
        // 'full_json' => 'required',
        'obs_response' => 'required'
    ];

    $validatedData = $request->validate($rules);

    // Create a new post instance
    $sell = new sellProduct;
    $sell->first_name = $validatedData['first_name'];
    $sell->last_name = $validatedData['last_name'];
    $sell->country = $validatedData['country'];
    $sell->email = $validatedData['email'];
    $sell->phone = $validatedData['phone'];
    $sell->payment_method_title = $validatedData['payment_method_title'];
    $sell->order_id = $validatedData['order_id'];
    $sell->coupon_code = $validatedData['coupon_code'];
    $sell->discount = $validatedData['discount'];
    $sell->streamer_id = $validatedData['streamer_id'];
    $sell->Item_name = $validatedData['Item_name'];
    $sell->subtotal = $validatedData['subtotal'];
    $sell->total = $validatedData['total'];
    $sell->date = $validatedData['date'];
    // $sell->full_json = $validatedData['full_json'];
    $sell->obs_response = $validatedData['obs_response'];

    // Save the post to the database
    $sell->save();

    // Retrieve the status after saving
    $status = $sell->exists;

    if ($status) {
        return response()->json(['message' => 'Item saved successfully'], 201);
    } else {
        return response()->json(['message' => 'Item not saved'], 400);
    }
}
  public function test(Request $request)
    {
        // Validate the request data if needed
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:your_table',
            // Add other validation rules as per your requirements
        ]);

        // Create a new instance of YourModel
        $testModel = new TestModel;
        $testModel->name = $validatedData['name'];
        $testModel->email = $validatedData['email'];
        // Set other properties if needed

        // Save the model to the database
        $testModel->save();

        // Return a JSON response
        return response()->json(['message' => 'Data stored successfully'], 201);
    }
    public function stats()
      {
          $sum = sellProduct::sum('total');
          $ordercount = sellProduct::count('order_id');
          $discounttot = sellProduct::sum('discount');
          $couponCodes = sellProduct::groupBy('coupon_code')
                                      ->select('coupon_code',DB::raw('count(*) as count'))
                                      ->get();

          foreach ($couponCodes as $item){
            $columnName = $item->coupon_code;
            $count= $item->count;
            echo $columnName;

          }



          return response()->json(['sum' => $sum,'ordercount'=> $ordercount,'discounttot'=> $discounttot,'columnName'=>$columnName,'count'=>$count]);

          // $products = sellProduct::select('first_name', 'coupon_code','total','streamer_id,'),
          // ->where('fetched_to_obs', '=', 1)
          // ->where('streamer_id', '2')
          // ->orderBy('first_name', 'asc')
          // ->get();

          // return response()->json($products);
      }
}
