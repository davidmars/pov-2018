<?php

namespace Pov\System;

/**
 * La classe Url permet d'analyser les différents composants d'une url
 * @package Pov\System
 */
class Url {

    /**
     * @var string L'url complete http://mon.ndd.com/abc/def/ghi.ext?params=values&etc...
     */
    public $fullUrl="";
    /**
     * @var string L'url complete sans la query string http://mon.ndd.com/abc/def/ghi.ext
     */
    public $fullUrlNoQueryString="";
    /**
     * @var string L'url complete sans http://domaine.com /abc/def/ghi.ext?params=values&etc...
     */
    public $fullUrlRelative="";
    /**
     * @var string Le nom de domaine ou sous domaine (sans http://)
     */
    public $host="";
    /**
     * @var string http ou https
     */
    public $httpScheme="http";
    /**
     * @var string ce qui vient après le host et avant la query string
     * @exemple mon-repertoire/mon-sous-repertoire/mon-fichier.txt
     */
    public $path="";
    /**
     * @var bool ssl ou pas?
     */
    public $isHttps=false;

    /**
     * @param $fullUrl
     */
    public function __construct($fullUrl){
        $this->fullUrl=$fullUrl;
        $this->fullUrlNoQueryString=preg_replace("/\?.*$/","",$fullUrl);

        $p=parse_url($fullUrl);
        if(isset($p["scheme"])){
            $this->httpScheme=$p["scheme"];
        }
        $this->isHttps=$this->httpScheme=="https";

        if(isset($p["host"])){
            $this->host=$p["host"];
        }
        if(isset($p["path"])){
            $this->path=trim($p["path"],"/");
        }
        $this->fullUrlRelative="/".$this->path;
        if(isset($p["query"])){
            $q=str_replace("povHistory=true","",$p["query"]);
            if($q!=="?"){
                $this->fullUrlRelative.="?".$q;
            }

        }
    }






} 