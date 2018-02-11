<?php

namespace Pov\Utils;

use Pov\System\AbstractSingleton;

/**
 * La Classe AssetLibs contient des methodes pour intaller rapidement des librairies dans le layout
 * @package Pov\Utils
 */
class AssetLibs extends AbstractSingleton
{

    /**
     * Installe (uniquement) les fichiers qui vont bien pour fonctionner avec le framework POV
     */
    public function pov()
    {
        the()->htmlLayout()->addJsToHeader("dist/povonly.js");
    }
    /**
     * Installe uikit
     * @see https://getuikit.com
     */
    public function uikit()
    {

        the()->htmlLayout()->addJsToHeader("dist/uikit3.js");
        the()->htmlLayout()->addCssToHeader("dist/uikit3.css");

    }

    /**
     * Installe google-code pretiffy pour endre du code joli
     * @see https://github.com/google/code-prettify
     * @param string $theme desert|doxy|sons-of-obsidian|sunburst
     */
    public function googleCodePrettify($theme="")
    {
        the()->htmlLayout()->addJsToFooter("https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js");
        if($theme){

        }
    }

    /**
     * Installe Google Map api
     * @param string $apiKey
     */
    public function googleMap($apiKey){
       the()->htmlLayout()->addJsToFooter("https://maps.googleapis.com/maps/api/js?key=$apiKey");
    }





}