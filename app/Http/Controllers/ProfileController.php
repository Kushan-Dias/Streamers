<?php

namespace App\Http\Controllers;

use App\Models\User;
use Lanin\Laravel\ApiDebugger\Debugger;
use SebastianBergmann\Environment\Console;
use Illuminate\Http\JsonResponse;

class ProfileController extends BaseController
{
    public function getProfileData(int $id):JsonResponse
    {
        // Retrieve the user profile data from the database based on the provided ID
        //$user = ProfileModel::find(1);

    
       $user2 = User::select('first_name', 'last_name')
                    ->where('id',$id)
                    ->first();
                $data['user'] = $user2;
    
        return $this->sendResponse("Success",$data);
        // Return the profile data as a JSON response
        /*return response()->json([
            'id' => $id,
            /*'first_name' => $user2->first_name,
            'last_name' => $user2->last_name,
        ]);*/
    }
}
