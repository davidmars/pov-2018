<?php

namespace Pov\Utils;


use Localization\Lang;
use Pov\Html\Trace\HtmlTag;
use Pov\System\AbstractSingleton;

/**
 * Pour jouer facielemnt avec les langues
 * @package Pov\Utils
 *
 * @method static SvgUtils inst()
 *
 */
class LangUtils extends AbstractSingleton
{
    /**
     * Pour obtenir l'url d'une image de drapeau en fonction d'un langue.
     * @param string $langCode code linguistique du drapeau
     * @param int $width largeur du drapeau
     * @param int $height hauteur du drapeau
     * @return string url de l'image obtenu
     * @throws \Pov\PovException
     */
    public function flagUrl($langCode,$width=50,$height=25){
        $l=Lang::getByCode($langCode);
        $flag=$l->flagUrl();
        return pov()->img($flag)->sizeCover($width,$height)->png()->href();
    }

    /**
     * Pour obtenir le tag IMG d'une image de drapeau en fonction d'un langue.
     * @param string $langCode code linguistique du drapeau
     * @param int $width largeur du drapeau
     * @param int $height hauteur du drapeau
     * @return HtmlTag
     * @throws \Pov\PovException
     */
    public function flagImgTag($langCode,$width=50,$height=25){
        $url=$this->flagUrl($langCode,$width,$height);
        $tag=new HtmlTag("img");
        $tag->setAttribute("src",$url);
        $tag->setAttribute("width",$width);
        $tag->setAttribute("height",$height);
        return $tag;
    }



}