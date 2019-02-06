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
     * Renvoie des attributs css background-size et background-position en fonction du rectangle passé.
     * @param string|array|\stdClass $rectangle x,y,width,height où les valeurs sont des ratios de 0 à 1 {"x":0.025,"y":0.286,"width":0.802,"height":0.588}
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
        $str.="".pov()->utils->math->ratio($rectangle["y"],1-$rectangle["height"],100,0,0)."%;";
        return $str;
    }

    /**
     * @param string $imgUrl Url de l'image
     * @return string
     */
    public function backgroundImageUrl($imgUrl)
    {
        $str="";
        if($imgUrl){
            $str="background-image:url('$imgUrl');";
        }
        return $str;
    }
}