<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 28/07/17
 * Time: 05:49
 */

namespace Pov\MVC;


class Controller {
    /**
     * Utilitaire pour obtenir une variable de $_REQUEST et gérer quand c'est pas défini
     * @param string $paramName
     * @param string $ifNull A value to get if the parameter is null
     * @return string|array The $_REQUEST parameter or the $ifNull value
     */
    public static function getRequest($paramName,$ifNull=null){
        if(isset($_REQUEST[$paramName])){
            if(is_array($ifNull)){
                $checked = $_REQUEST[$paramName];
                $ret=[];
                for($i=0; $i < count($checked); $i++){
                    $ret[]=$checked[$i];
                }
                return $ret;
            }
            return $_REQUEST[$paramName];
        }
        return $ifNull;
    }

    /**
     * @param $methodName
     * @param $arguments
     * @return View
     */
    public function run($methodName,$arguments){
        $rc=new \ReflectionClass($this);
        $func=$rc->getMethod($methodName);
        return $func->invokeArgs($this,$arguments);

    }

    /**
     * @var string nom de la classe sans le C_ au début.
     */
    protected static $name;

    /**
     * @param string $url
     * @param bool $useControllerName si défini sur false n'utilise pas le nom du controller pour générer l'url (une route doit être définie de ce fait)
     * @param string $extension pour robots.txt par exemple il suffit de faire passer "txt" ici.
     * @return ControllerUrl|string
     */
    protected static function genUrl($url,$useControllerName=true,$extension=""){
        if($extension){
            $extension=".".trim($extension,".");
        }
        if($useControllerName){
            self::$name=(new \ReflectionClass(get_called_class()))->getShortName();
            self::$name=preg_replace("/^C_/","",self::$name);
        }
        $url=trim($url,"/");
        if($url){
            $url=$url.$extension;
        }
        if($useControllerName){
            if($extension && !$url){
                $url=self::$name.$extension;
            }else{
                $url=self::$name."/".$url;
            }
        }
        $url=new ControllerUrl($url);
        return $url;

    }
} 