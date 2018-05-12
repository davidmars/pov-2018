<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 16/09/2017
 * Time: 06:51
 */

namespace Pov\Utils;


use Pov\Pov;
use Pov\PovException;
use Pov\System\AbstractSingleton;

/**
 * Pour jouer avec des couleurs
 * @package Pov\Utils
 */
class ColorUtils extends AbstractSingleton
{
    /**
     * To get a random exadecimal color where the radom will operate on hue
     * @param float $saturation 0 to 1
     * @param float $luminance 0 to 1
     * @param string $pseudoRandString to get a pseudo random according the given string
     * @return string hexadecimal value
     */
    public function randHex($saturation=0.5,$luminance=0.5,$pseudoRandString=null)
    {

        if($pseudoRandString){
            $rand=Pov::inst()->utils->math->randFromString($pseudoRandString,0,360);
        }else{
            $rand=rand(0,360);
        }

        return self::hslToHex(
            $rand,$saturation,$luminance
        );
    }
    /**
     * To get a full random hexadecimal color (no control for HSL)
     * @param null $pseudoRandString
     * @return string
     * @throws PovException
     */
    public function fullRandHex($pseudoRandString=null)
    {

        if($pseudoRandString){
            $hue=Pov::inst()->utils->math->randFromString($pseudoRandString,0,360);
        }else{
            $hue=rand(0,360);
        }
        if($pseudoRandString){
            $saturation=Pov::inst()->utils->math->randFromString($pseudoRandString."something",0,100);
        }else{
            $hue=rand(0,100);
        }
        if($pseudoRandString){
            $luminance=Pov::inst()->utils->math->randFromString($pseudoRandString."somethingelse",0,100);
        }else{
            $luminance=rand(0,100);
        }

        return self::hslToHex(
            $hue,$saturation/100,$luminance/100
        );
    }
    /**
     *  Given a HSL associative array returns the equivalent HEX string
     * @param int $h
     * @param float $s
     * @param float $l
     * @throws PovException
     * @internal param array $hsl
     * @return string HEX string
     */
    public function hslToHex( $h=360,$s=0.5,$l=0.5 ){
        // Make sure it's HSL
        $hsl=[
            "H"=>$h,
            "S"=>$s,
            "L"=>$l
        ];
        if(empty($hsl) || !isset($hsl["H"]) || !isset($hsl["S"]) || !isset($hsl["L"]) ) {
            throw new PovException("Param was not an HSL array");
        }
        list($H,$S,$L) = [ $hsl['H']/360,$hsl['S'],$hsl['L'] ];
        if( $S == 0 ) {
            $r = $L * 255;
            $g = $L * 255;
            $b = $L * 255;
        } else {
            if($L<0.5) {
                $var_2 = $L*(1+$S);
            } else {
                $var_2 = ($L+$S) - ($S*$L);
            }
            $var_1 = 2 * $L - $var_2;
            $r = round(255 * $this->_huetorgb( $var_1, $var_2, $H + (1/3) ));
            $g = round(255 * $this->_huetorgb( $var_1, $var_2, $H ));
            $b = round(255 * $this->_huetorgb( $var_1, $var_2, $H - (1/3) ));
        }
        // Convert to hex
        $r = dechex($r);
        $g = dechex($g);
        $b = dechex($b);
        // Make sure we get 2 digits for decimals
        $r = (strlen("".$r)===1) ? "0".$r:$r;
        $g = (strlen("".$g)===1) ? "0".$g:$g;
        $b = (strlen("".$b)===1) ? "0".$b:$b;
        return $r.$g.$b;
    }
    /**
     * Given a Hue, returns corresponding RGB value
     * @param int $v1
     * @param int $v2
     * @param int $vH
     * @return int
     */
    private function _huetorgb( $v1,$v2,$vH ) {
        if( $vH < 0 ) {
            $vH += 1;
        }
        if( $vH > 1 ) {
            $vH -= 1;
        }
        if( (6*$vH) < 1 ) {
            return ($v1 + ($v2 - $v1) * 6 * $vH);
        }
        if( (2*$vH) < 1 ) {
            return $v2;
        }
        if( (3*$vH) < 2 ) {
            return ($v1 + ($v2-$v1) * ( (2/3)-$vH ) * 6);
        }
        return $v1;
    }

}