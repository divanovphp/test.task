<?php

namespace App\Services;

class Utils
{
    /**
     * Get weather by ip
     *
     * @param string $ip
     * @return mixed
     */
    public static function getWeatherByIp($ip)
    {
        $latlong = explode(",", file_get_contents('https://ipapi.co/' . $ip . '/latlong/'));
        if(isset($latlong[0]) && isset($latlong[1])) {
            $weather = file_get_contents('http://api.openweathermap.org/data/2.5/weather?lat=' . $latlong[0] . '&lon=' . $latlong[1] . '&appid=e7eae9c76c9c12bc9d0c6c485ad2d88a&units=metric');
            $json = json_decode($weather);
            $temp = data_get($json, 'main.temp');
            if($temp) {
                return $temp.' Celsius';
            }
        }
    }

    /**
     * Get country by ip
     *
     * @param string $ip
     * @return mixed
     */
    public static function getCountryByIp($ip)
    {
        $country = file_get_contents('https://ipapi.co/' . $ip . '/country_name/');
        if(\strtolower($country) !== 'undefined') {
            return $country;
        }
    }
}
