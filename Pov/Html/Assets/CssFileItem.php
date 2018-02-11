<?php
namespace Pov\Html\Assets;
/**
 * Class JsFileItem représente un fichier javascript
 *
 * @package Pov\Html\Assets
 */
class CssFileItem extends AssetFileItem {

    /**
     * @return string Le tag html pour inclure le fichier css
     * @example <link rel='stylesheet' href=etc...
     */
    public function htmlTag(){
        $url=$this->getUrlWithOrWithoutVersion();
        return "<link rel='stylesheet' href='$url'>";
    }
}