<?php
namespace Pov\Html\Assets;
/**
 * Class LessFileItem représente un fichier Less/Css
 *
 * @package Pov\Html\Assets
 */
class LessFileItem extends CssFileItem {

    /**
     * @return string Le tag html pour inclure le fichier css
     * @example <link rel='stylesheet/less' href=etc...
     */
    public function htmlTag(){
        $url=$this->getUrlWithOrWithoutVersion();
        return "<link rel='stylesheet/less' type='text/css' href='$url'>";
    }
}