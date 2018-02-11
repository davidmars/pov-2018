<?php
namespace Pov\Html\Assets;
/**
 * Class JsFileItem représente un fichier javascript
 *
 * @package Pov\Html
 */
class JsFileItem extends AssetFileItem {

    /**
     * @return string Le tag html pour inclure le script
     * @example <script src=etc....>
     */
    public function htmlTag(){
        $url=$this->getUrlWithOrWithoutVersion();
        return "<script src='$url'></script>";
    }
}