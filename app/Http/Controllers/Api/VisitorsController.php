<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VisitorsRequest;
use App\Services\VisitorsService;

class VisitorsController extends Controller
{
    /**
     * Store visitors into storage
     *
     * @param \App\Http\Requests\VisitorsRequest $request
     * @param \App\Services\VisitorsService $visitorsService
     * @return \Response
     */
    public function store(VisitorsRequest $request, VisitorsService $visitorsService)
    {
        $visitor = $visitorsService->store($request->validated());
        return response()->json($visitor, 201);
    }
}
