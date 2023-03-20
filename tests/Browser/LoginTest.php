<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testExample()
    {
      //login_fail_Test_case(Test with wrong Email)
        $this->browse(function (Browser $browser) {
            $browser->visit('http://yugo.localhost:8000/login')
                    ->assertSee('Login')
                    ->assertSee('Sign In to your account')
                    ->type('email','test.manger@yugo.com')
                    ->type('password','12345678')
                    ->press('Login')
                    ->waitForText('Your credentials do not match');
        });

    }

    public function testExample2(){
      //login_fail_Test_case(Test with Empty Field)
      $this->browse(function (Browser $browser) {
          $browser->visit('http://yugo.localhost:8000/login')
                  ->assertSee('Login')
                  ->assertSee('Sign In to your account')
                  ->press('Login')
                  ->pause(1000)
                  ->assertSee('Login');
      });
  }
  public function testExample3(){
    //login_fail_Test_case(Test with wrong Password)
    $this->browse(function (Browser $browser) {
          $browser->visit('http://yugo.localhost:8000/login')
                ->assertSee('Login')
                ->assertSee('Sign In to your account')
                ->type('email','test.manager@yugo.com')
                ->type('password','12341234')
                ->press('Login')
                ->waitForText('Your credentials do not match');
    });
}
public function testExample4(){
  //login_sucsess_Test_case
  $this->browse(function (Browser $browser) {
      $browser->visit('http://yugo.localhost:8000/login')
              ->assertSee('Login')
              ->assertSee('Sign In to your account')
              ->type('email','test.manager@yugo.com')
              ->type('password','12345678')
              ->press('Login')
              ->waitForText('Dashboard')
              ->assertPathIs('/dashboard');
  });
}
}
