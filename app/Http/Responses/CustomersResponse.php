<?php

namespace App\Http\Responses;

class CustomersResponse extends BaseResponse
{
    /**
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    protected function prepare()
    {
        return $this->data;
    }
}
