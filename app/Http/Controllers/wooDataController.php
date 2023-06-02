<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class wooDataController extends Controller
{
  function add(Request $request, $input){
    $item = $request->all();
    return response()->json($item);
  }
}
