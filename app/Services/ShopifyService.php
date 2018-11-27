<?php

namespace App\Services;

use PHPShopify\ShopifySDK;

class ShopifyService
{
    /**
     * Get customers from shopify api
     *
     * @param string $searchQuery
     * @return array
     */
    public function searchCustomers($searchQuery)
    {
        $client = $this->getClient();
        return $client->Customer->search($searchQuery);
    }

    /**
     * Init shopify php client
     *
     * @return \PHPShopify\ShopifySDK
     */
    protected function getClient()
    {
        $config = config('shopify.credentials');
        return ShopifySDK::config($config);
    }
}
