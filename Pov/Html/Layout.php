<?php

namespace Pov\Html;

use Pov\Html\Assets\CssFileItem;
use Pov\Html\Assets\ImportFileItem;
use Pov\Html\Assets\JsFileItem;
use Pov\Html\Assets\LessFileItem;
use Pov\Utils\AssetLibs;

/**
 * La Classe Layout représente un layout HTML.
 * Permet entre autre chose de gérer les fichiers JS, CSS, les meta SEO, des données à transmettre à javascript etc...
 *
 * @package Pov\Html
 */
class Layout {
    /**
     * @var CssFileItem[] Fichiers css dans le header
     */
    public $cssHeaderFiles=[];
    /**
     * @var CssFileItem[] Fichiers css dans le footer
     */
    public $cssFooterFiles=[];
    /**
     * @var ImportFileItem[] Fichiers import dans le header
     */
    public $importHeaderFiles=[];
    /**
     * @var ImportFileItem[] Fichiers import dans le footer
     */
    public $importFooterFiles=[];

    /**
     * @var JsFileItem[] Fichiers javascripts dans le header
     */
    public $jsHeaderFiles=[];
    /**
     * @var JsFileItem[] Fichiers javascripts dans le footer
     */
    public $jsFooterFiles=[];
    /**
     * @var \stdClass Les variables qui seront transmises à javascript
     */
    public $layoutVars=[];
    /**
     * @var Meta Meta title, description etc
     */
    public $meta;
    /**
     * @var \stdClass
     */
    public $pageInfo;


    public function __construct(){
        $this->meta=new Meta();
        $this->pageInfo=new \stdClass();
        $this->layoutVars=new \stdClass();
        $this->layoutVars->rootUrl=the()->configProjectUrl->httpPathNoHost;
        $this->layoutVars->fmkHttpRoot=the()->fmkHttpRoot;
        $this->favicon=new FaviconCollection();
    }

    /**
     * @param $jsFile string chemin vers le fichier Javascript
     */
    public function addJsToFooter($jsFile){
        $fileItem=new JsFileItem($jsFile);
        $this->jsFooterFiles[$jsFile]=$fileItem;
    }

    public function addImportToHeader($htmlFile)
    {
        $fileItem=new ImportFileItem($htmlFile);
        $this->importHeaderFiles[$htmlFile]=$fileItem;
    }
    public function addImportToFooter($htmlFile)
    {
        $fileItem=new ImportFileItem($htmlFile);
        $this->importFooterFiles[$htmlFile]=$fileItem;
    }

    /**
     * @param $jsFile string chemin vers le fichier Javascript
     */
    public function addJsToHeader($jsFile){
        $fileItem=new JsFileItem($jsFile);
        $this->jsHeaderFiles[$jsFile]=$fileItem;
    }

    /**
     * @param $cssFile string chemin vers le fichier Css
     */
    public function addCssToFooter($cssFile){
        $fileItem=new CssFileItem($cssFile);
        $this->cssFooterFiles[$cssFile]=$fileItem;
    }
    /**
     * @param $cssFile string chemin vers le fichier Css
     */
    public function addCssToHeader($cssFile){
        $fileItem=new CssFileItem($cssFile);
        $this->cssHeaderFiles[$cssFile]=$fileItem;
    }

    /**
     * @param $lessFile string chemin vers le fichier Less
     */
    public function addLessToHeader($lessFile){
        $fileItem=new LessFileItem($lessFile);
        $this->cssFooterFiles[$lessFile]=$fileItem;
    }

    /**
     * Permet d'ajouter des librairies javascript et css rapidement
     * @return AssetLibs
     */
    public function install()
    {
        return AssetLibs::inst();
    }

     /**
     * @var FaviconCollection Les différents formats de favicon
     */
    public $favicon;




}