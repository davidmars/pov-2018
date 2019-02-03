<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 03/02/2019
 * Time: 11:37
 */

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Class CssUtils
 * @package Pov\Utils
 * @method static CssUtils inst()
 */
class CssUtils extends AbstractSingleton
{
    /**
     * @param $rectangle
     * @return string
     */
    public function backgroundImageRatioToStyle($rectangle){
        if(!$rectangle){
            return "";
        }
        if(is_string($rectangle)){
            $rectangle=json_decode($rectangle);
        }



        $rectangle=pov()->utils->array->fromObject($rectangle);

        $rectangle["width"]=min( $rectangle["width"],0.99999);
        $rectangle["height"]=min( $rectangle["height"],0.99999);

        //return pov()->debug->type($rectangle);
        $str="background-size:";
        $str.="".(1/$rectangle["width"]*100)."% ";
        $str.="".(1/$rectangle["height"]*100)."%;";
        $str.="background-position:";
        $str.="".pov()->utils->math->ratio($rectangle["x"],1-$rectangle["width"],100,0,0)."% ";
        $str.="".pov()->utils->math->ratio($rectangle["y"],1-$rectangle["height"],100,0,0)."% ";
        return $str;
    }
}