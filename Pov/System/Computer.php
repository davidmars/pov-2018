<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 12/09/2017
 * Time: 11:42
 */

namespace Pov\System;


use Jenssegers\Agent\Agent;

class Computer extends Agent implements \JsonSerializable
{

    /**
     * @return string
     */
    function ipAddress() {
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

    public function toArray(){
        return [
            "ipAddress"=>$this->ipAddress(),
            "device"=>$this->device(),

            "browser"=>$this->browser(),
            "browserVersion"=>$this->version($this->browser()),

            "platform"=>$this->platform(),
            "platformVersion"=>$this->version($this->platform()),

        ];
    }

    public function jsonSerialize() {
        return $this->toArray();
    }
    public function __toString()
    {
        return http_build_query($this->toArray());
    }

    /**
     * @return string une chaine encodée à partir de toutes ces données
     */
    public function hash(){
        return base64_encode($this->__toString());
    }


}