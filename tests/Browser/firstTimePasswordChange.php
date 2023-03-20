<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class firstTimePasswordChange extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
          $browser->visit('http://yugo.localhost:8000/user/verify-email/1/a731802de99ca42a2536afd3b80c27b083508abb?expires=1640835293&signature=fe143853a4cf8f6ccb5ab1cdbaa16a7601af3bd2f086cc4d28d2c03d7a97441c')
          ->pause(20000)
          //->waitForText('')
          ->clickLink('Login')
          ->pause(15000)
          ->assertPathIs('/login')
          ->type('email','test.manager@yugo.com')
          ->type('password','12345678')
          ->press('Login')
          ->pause(20000)
          ->waitForText('You must change your default password')
          ->clickLink('Click here')
          ->assertPathIs('/user/change-password')
          ->type('email','test.manager@yugo.com')
          ->type('currentpassword','12345678')
          ->type('newpassword','12345678')
          ->type('re-newpassword','12345678')
          ->press('Submit')
          ->pause(15000)
          ->waitForText('Password reset successful')
          ->clickLink('Login')
          ->pause(15000)
          ->assertPathIs('/login')
          ->type('email','test.manager@yugo.com')
          ->type('password','12345678')
          ->press('Login')
          ->waitForText('Dashboard')
          ->assertPathIs('/dashboard');
        });
    }
}
