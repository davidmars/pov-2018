<?php
namespace Pov\Html\Assets;
use Pov\PovException;


/**
 * Class AssetFileItem représente un fichier javascript, Css, less etc..
 *
 * @package Pov\Html
 */
abstract class AssetFileItem {

    /**
     * @var string url locale ou absolue du fichier
     */
    public $url="";
    /**
     * @var bool si true, le numéro de version sera rajouté à la fin
     */
    public $useVersion=true;
    /**
     * @var bool si true c'est que le fichier ressemble à http qque chose...
     */
    public $isDistant=false;


    protected function getUrlWithOrWithoutVersion(){
        $url=$this->url;
        if($this->useVersion){
            $url.="?v=".the()->version();
        }
        if(!$this->isDistant){
            $url=the()->fmkHttpRoot.$url;
        }
        return $url;
    }
    /**
     * @return string Le tag html pour inclure le script
     * @example <script src=etc....>
     */
    public function htmlTag(){
        $url=$this->getUrlWithOrWithoutVersion();
        return "<script src='$url'></script>";
    }

    public function __construct($url,$useVersion=true){

        $this->useVersion=$useVersion;

        //check local or distant
        if(preg_match("#^http#",$url) || preg_match("#^//#",$url)){
            $this->isDistant=true;
            $this->url=$url;
            $this->useVersion=false;
        }else{
            $this->isDistant=false;
            //file exists ???
            $url=trim($url,"/");
            if(!is_file($url)){
                pov()->log->error(
                    get_called_class()." url problem",
                    [$url]
                );
                throw(new PovException("Le fichier '$url' ne semble pas exister"));
            }
            $this->url="/".$url;
        }


    }
}