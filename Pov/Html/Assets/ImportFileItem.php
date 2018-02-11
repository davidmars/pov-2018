<?php
namespace Pov\Html\Assets;
/**
 * Class ImportFileItem représente un fichier html qui donnera un link rel="import"
 *
 * @package Pov\Html
 */
class ImportFileItem extends AssetFileItem {

    /**
     * @return string Le tag html pour inclure le script
     * @example <link rel="import" href="custom-element.html">
     */
    public function htmlTag(){
        $url=$this->getUrlWithOrWithoutVersion();
        return "<link  rel='import' href='$url'>";
    }
}