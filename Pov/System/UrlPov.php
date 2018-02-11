<?php

namespace Pov\System;

/**
 * La Classe UrlPov permet d'analyser une URL en prevenance du framework.
 * Cette classe sert notament à analyser l'url courante.
 *
 * @package Pov\System
 */
class UrlPov extends Url{

    /**
     * @var bool Sera true SI ?isAjax=1
     */
    public $isAjax=false;

    /**
     * @return UrlPov l'url utilisée par le navigateur
     */
    public static function current(){
        $scheme="http";
        $REQUEST_URI=trim($_SERVER["REQUEST_URI"],"/");
        $REQUEST_URI=str_replace("/?","?",$REQUEST_URI);
        $secure=(!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')|| $_SERVER['SERVER_PORT'] == 443;
        if($secure){
            $scheme= "https";
        }
        $url=new UrlPov($scheme."://".$_SERVER['HTTP_HOST']."/".$REQUEST_URI);
        $url->isAjax=the()->request("isAjax") || the()->request("povHistory");

        return $url;

    }

    /**
     * Route déduite de l'url
     * @return string pour http://mon-site.com/mon-repertoire-de-projet/toto/titi?arg=test renvera /toto/titi
     */
    public function routeString(){
        return str_replace(
            the()->configProjectUrl->httpPath,"",
            $this->host."/".$this->path
        );
    }

    /**
     * Teste si l'url matche avec l'expression fournie
     * @param string $reg
     * @return false|int
     */
    public function match($reg){
        return preg_match("/".preg_quote($reg,"/")."/",$this->fullUrl,$matches);
    }
}