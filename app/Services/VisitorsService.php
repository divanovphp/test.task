<?php

namespace App\Services;

use App\Models\Visitor;
use Utils, Exception;

class VisitorsService
{
    /**
     * Store new visitor
     *
     * @param array $inputs
     * @return \App\Models\Visitor $visitor
     */
    public function store($inputs)
    {
        $data = \array_merge([
            'name' => $inputs['name'],
            'phone' => $inputs['phone'],
        ], $this->getWeatherAndCountry());
        $visitor = Visitor::create($data);
        if(isset($inputs['guests'])) {
            $this->storeVisitorGuests($visitor, $inputs['guests']);
        }
        return $visitor;
    }

    /**
     * Get weather and country associated with visitor's IP address
     *
     * @return array
     */

    private function getWeatherAndCountry()
    {
        $ip = request()->ip();
        $additionalInputs = [];
        try {
            $additionalInputs['country'] = Utils::getCountryByIp($ip);
        } catch(Exception $e) {

        }
        try {
            $additionalInputs['weather'] = Utils::getWeatherByIp($ip);
        } catch(Exception $e) {

        }
        return $additionalInputs;
    }

    /**
     * Store existing visitor guests
     *
     * @param \App\Models\Visitor $visitor
     * @param array $data
     * @return void
     */
    public function storeVisitorGuests(Visitor $visitor, $data)
    {
        foreach ($data as $value) {
            if(!isset($value['name']) && !$value['phone']) continue;
            $visitor->guests()->create([
                'name' => $value['name'],
                'phone' => $value['phone'],
            ]);
        }
    }
}
