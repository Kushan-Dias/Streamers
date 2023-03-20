<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class firstTimeLogin extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
              $browser->visit('http://yugo.localhost:8000/login')
                    ->assertSee('Login')
                    ->assertSee('Sign In to your account')
                    ->type('email','test.manager@yugo.com')
                    ->type('password','12345678')
                    ->press('Login')
                    ->pause(15000)
                    ->waitForText('Please verify your email')
                    ->clickLink('Click here')
                    ->pause(15000)
                    ->assertPathIs('/user/verify-email')
                    ->type('email','test.manager@yugo.com')
                    ->press('Submit')
                    ->pause(15000)
                    ->waitForText('Email verification link sent to');
        });
    }
}
