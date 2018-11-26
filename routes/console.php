<?php

use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('test', function () {
    $config = config('shopify.credentials');
    $client = PHPShopify\ShopifySDK::config($config);
    $customers = $client->Customer->search('first_name:Deshaun Stiedemann');
    dd($customers);

})->describe('Display an inspiring quote');
