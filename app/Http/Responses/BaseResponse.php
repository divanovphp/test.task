<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;

abstract class BaseResponse implements Responsable
{
    protected $status = 200;

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function toResponse($request)
    {
        $data = $this->prepare();
        return response()->json($data, $this->status);
    }

    abstract protected function prepare();
}
