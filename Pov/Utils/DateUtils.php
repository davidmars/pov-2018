<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 14/09/2017
 * Time: 18:12
 */

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Class DateUtils permet de manipuler des dates
 * @package Pov\Utils
 */
class DateUtils extends AbstractSingleton
{
    /**
     * @param string $dateString une date en texte compréhensible par strtotime
     * @param string $format "Y m d H:i:s" par exemple
     * @link http://php.net/manual/en/function.date.php
     * @link http://php.net/manual/en/function.strtotime.php
     * @return false|string
     */
    public function formatFromString($dateString, $format){
        return date("Y m d H:i:s",strtotime($dateString));
    }

    /**
     * @return int Le timestamp présent
     */
    public function timestamp(){
        $d=new \DateTime();
        return $d->getTimestamp();
    }

    /**
     * Renvoie le temps courrant au format Y-m-d H:i:s
     * @return false|string
     */
    public function nowMysql()
    {
        return date("Y-m-d H:i:s");
    }
}