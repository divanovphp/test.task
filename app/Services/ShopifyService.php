<?php

namespace App\Services;

use PHPShopify\ShopifySDK;


class ShopifyService
{
    public function searchCustomers($searchQuery)
    {
        $client = $this->getClient();
        return $client->Customer->search($searchQuery);
    }

    protected function getClient()
    {
        $config = config('shopify.credentials');
        return ShopifySDK::config($config);
    }
}
