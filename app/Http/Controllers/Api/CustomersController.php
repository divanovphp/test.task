<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ShopifyService;
use App\Http\Responses\CustomersResponse;

class CustomersController extends Controller
{
    public function search(Request $request, ShopifyService $shopifyService)
    {
        $search = $request->query('search');
        $customers = $shopifyService->searchCustomers("first_name:{$search} OR last_name:{$search}");
        return new CustomersResponse($customers);
    }
}
