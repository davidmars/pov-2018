<?php
namespace Pov\MVC;

/**
 * La classe ControllerUrl permet de renvoyer des urls de controlleur correctes sans trop se prendre la tête
 * @package Pov\MVC
 */
class ControllerUrl {

    /**
     * @var string
     */
    private $url;

    /**
     * @param string $url une url interne vers controlleur/methode/parametres?args (donc sans domaine et sans le urlBase)
     * @example monControlleur/monAction/param1/param2?arg1=a&arg2=b
     */
    public function __construct($url){
        $this->url=$url;
    }
    /**
     * Renvoie l'url en relatif
     * @return string url relative
     */
    public function relative(){
        $split=the()->configProjectUrl->httpPathNoHost."/".$this->url;
        //on splitte pour eviter de modifier les // en querystring
        $split=explode("?",$split);
        $split[0]=str_replace("//","/",$split[0]);
        if(count($split)>1){
            return implode("?",$split);
        }else{
            $r=$split[0];
            $r=preg_replace("@'(.+)/+$@","$1",$r); //enleve le slash de fin
            return $r;
        }
    }

    /**
     * Renvoie l'url en absolu
     * @param null|string $httpEtc si vous souhaitez spécifier une base d'url différente, sinon ce sera la base d'url actuelle qui sera utilisée
     * @return string url absolue
     */
    public function absolute($httpEtc=null){

        if(!$httpEtc){
            $httpEtc=the()->requestUrl->httpScheme."://".the()->configProjectUrl->httpPath;
        }
        $httpEtc=trim($httpEtc,"/");
        return $httpEtc."/".$this->url;
    }

    /**
     * @return string
     */
    public function __toString(){
        return $this->relative();
    }
} 