<?php

namespace Pov\Html;

use Pov\Html\Assets\CssFileItem;
use Pov\Html\Assets\ImportFileItem;
use Pov\Html\Assets\JsFileItem;
use Pov\Html\Assets\LessFileItem;
use Pov\Utils\AssetLibs;

/**
 * La Classe Layout représente un layout HTML.
 * Permet entre autre chose de gérer les fichiers JS, CSS, les meta SEO, les favicons, des données à transmettre à javascript etc...
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
     * @var String[] Fichiers javascript importés en script dans le footer
     */
    public $jsFooterScripts=[];
    /**
     * @var String[] Fichiers javascript importés en script dans le headezr
     */
    public $jsHeaderScripts=[];

    /**
     * @var String[] Contenus bruts importés dans le footer
     */
    public $rawFooterContents=[];
    /**
     * @var String[] Contenus bruts importés dans le header
     */
    public $rawHeaderContents=[];
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

    /**
     * @var string Url vers où on sera redirigé en js si définie
     */
    public $redirectJS="";

    /**
     * @var string pour rajouter un tag <base href='...'>
     */
    public $base="";
    /**
     * @var string Par défaut summary mais peut être summary_large_image
     */
    public $twitterCardType="summary";


    public function __construct(){
        $this->meta=new Meta();
        $this->pageInfo=new \stdClass();
        $this->layoutVars=new \stdClass();
        $this->layoutVars->rootUrl=the()->configProjectUrl->httpPathNoHost;
        $this->layoutVars->fmkHttpRoot=the()->fmkHttpRoot;
        $this->favicon=new FaviconCollection();
    }

    /**
     * Ajoute un fichier javascript dans le footer
     * @param string $jsFile  chemin vers le fichier Javascript
     * @param bool $prepend si true rajoute le fichier au début de la pile
     */
    public function addJsToFooter($jsFile,$prepend=false){
        $fileItem=new JsFileItem($jsFile);
        if($prepend){
            $this->jsFooterFiles=array($jsFile=>$fileItem)+$this->jsFooterFiles;
        }else{
            $this->jsFooterFiles[$jsFile]=$fileItem;
        }

    }
    /**
     * Ajoute le contenu d'un fichier javascript dans le footer
     * @param string $jsFile  chemin vers le fichier Javascript
     */
    public function addJsScriptToFooter($jsFile){
        $this->jsFooterScripts[]="<script>".file_get_contents($jsFile)."</script>";
    }
    /**
     * Ajoute le contenu d'un fichier javascript dans le header
     * @param string $jsFile  chemin vers le fichier Javascript
     */
    public function addJsScriptToHeader($jsFile){
        $this->jsHeaderScripts[]="<script>".file_get_contents($jsFile)."</script>";
    }
    /**
     * Ajoute le contenu d'un fichier dans le footer
     * @param string $fileUrl  chemin vers le fichier dont le contenu sera à inclure
     */
    public function addRawContentToFooter($fileUrl){
        $this->rawFooterContents[]="\n".file_get_contents($fileUrl)."\n";
    }
    /**
     * Ajoute le contenu d'un fichier dans le header
     * @param string $fileUrl  chemin vers le fichier dont le contenu sera à inclure
     */
    public function addRawContentToHeader($fileUrl){
        $this->rawHeaderContents[]="\n".file_get_contents($fileUrl)."\n";;
    }
    /**
     * Ajoute un fichier javascript dans le header
     * @param string $jsFile  chemin vers le fichier Javascript
     * @param bool $prepend si true rajoute le fichier au début de la pile
     */
    public function addJsToHeader($jsFile,$prepend=false){
        $fileItem=new JsFileItem($jsFile);
        if($prepend){
            $this->jsHeaderFiles=array($jsFile=>$fileItem)+$this->jsHeaderFiles;
        }else{
            $this->jsHeaderFiles[$jsFile]=$fileItem;
        }
    }
    /**
     * Ajoute un fichier css au footer
     * @param $cssFile string chemin vers le fichier Css
     */
    public function addCssToFooter($cssFile){
        $fileItem=new CssFileItem($cssFile);
        $this->cssFooterFiles[$cssFile]=$fileItem;
    }
    /**
     * Ajoute un fichier css au header
     * @param $cssFile string chemin vers le fichier Css
     */
    public function addCssToHeader($cssFile){
        $fileItem=new CssFileItem($cssFile);
        $this->cssHeaderFiles[$cssFile]=$fileItem;
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

    /**
     * @var string code pour google webmaster tools (webconsole google)
     */
    public $googleSiteVerification="";

    /**
     * @var string Url de l'image de previewu facebook
     */
    public $ogImage="";
    /**
     * @var string Url de l'image de preview twitter
     */
    private $_twitterImage="";

    /**
     * Get/Set l'url de l'image twitter card
     * @param string $imageToSet Pour définir cette image
     * @return string url absolue
     */
    public function twitterImage($imageToSet=null){
        if($imageToSet){
            $this->_twitterImage=$imageToSet;
        }
        if($this->_twitterImage){
            return $this->_twitterImage;
        }
        return $this->ogImage;
    }
    /**
     * @var string largeur de l'image
     */
    public $ogImageWidth="";
    /**
     * @var string hauteur de l'image
     */
    public $ogImageHeight="";
    /**
     * @var string Latitude
     */
    public $ogLatitude="";
    /**
     * @var string longitude
     */
    public $ogLongitude="";
    /**
     * @var string voir https://developers.facebook.com/docs/reference/opengraph#object-type
     */
    public $ogType="article";

    /**
     * @var string id de l'app facebook
     */
    public $facebookAppId="";

    /**
     * @var string id de vérification Pinterest
     */
    public $pinterestDomainVerification="";
    /**
     * @var string code linguistiquye de la page (fr par défaut)
     */
    public $hreflang="fr";
    /**
     * @var string[] Les différentes urls de la page en fonction des codes linguistique. Les clés sont les langCodes.
     */
    public $hreflangs=[];

    /**
     * Ajoute à layoutVars les traductions marquées comme javascript = 1
     */
    public function addJavascriptTranslations(){
        $translations=[];
        foreach (the()->project->translations() as $k=>$v){
            if($v->javascript){
                $translations[$k]=the()->project->translation($k);
            }
        }
        $this->layoutVars->translations=$translations;
    }

    /**
     * @var string url du manifest.json
     * @see https://developers.google.com/web/fundamentals/web-app-manifest/
     */
    public $webAppManifest="";






}