<?php

namespace Pov\Configs;
use Pov\System\Url;

/**
 * La classe de config ProjectUrl représente une configuration de projet pour un nom de domaines (et éventuellement des sous répertoires).
 * De là découlera toutes les autres configs
 * @package Pov\Configs
 */
class ProjectUrl {

    /**
     * @var string La base d'url qui comprend le nom de domaine et eventuellement le(s) sous répertoire
     */
    public $httpPath;
    /**
     * @var string La base d'url sans le nom de domaine mais éventuellemenr le(s) sous répertoire
     */
    public $httpPathNoHost;
    /**
     * @var bool Si true forcera https
     */
    public $forceHttps=false;

    /**
     * @var bool Mode Dev ou prod?
     */
    public $dev=true;
    /**
     * @var bool Seo actif ou pas?
     */
    public $seoActive=false;

    /**
     * Url principale du site
     * @return string http(s)://site.com/subdir-eventuel
     */
    public function absoluteUrl(){
        $r=$this->forceHttps?"https://":"http://";
        $r.=$this->httpPath;
        return $r;
    }



    /**
     * @param $httpPath string
     */
    public function __construct($httpPath){
        $this->httpPath=trim($httpPath,"/");
        $this->httpPath=preg_replace("#^http[s]*://#","",$this->httpPath);

        $url=new Url("http://".$this->httpPath);
        $this->httpPathNoHost="/".$url->path;
        if($this->httpPathNoHost=="/"){
            $this->httpPathNoHost="";
        }


    }

} 