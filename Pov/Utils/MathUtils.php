<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 16/09/2017
 * Time: 06:55
 */

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Quleques methodes paratiques pour faire des maths
 * @package Pov\Utils
 */
class MathUtils extends AbstractSingleton
{
    /**
     * To get a pseudo random number from a string
     * @param string $string
     * @param int $min The minimum value to return
     * @param int $max The maximum value to return
     * @return float
     */
    public function randFromString($string,$min=0,$max=100){
        $rando=crc32(md5($string));
        $rando2=substr($rando,-6,6); //last 5 numbers
        return ( ($max - $min) * ($rando2 / 999999)) + $min;
    }

    /**
     * Return the input value according a given range translated to an other range.
     * @param float $inputValue
     * @param float $inputMax
     * @param float $outputMax
     * @param float $inputMin
     * @param float $outputMin
     * @return float
     */
    public function ratio($inputValue, $inputMax, $outputMax, $inputMin=.0, $outputMin=.0){
        $product = ($inputValue - $inputMin) / ($inputMax - $inputMin);
        $output = (($outputMax - $outputMin) * $product) + $outputMin;
        return $output;
    }

}