<?php

namespace Pov;
use Pov\System\AbstractSingleton;

/**
 * Class Debug
 *
 * @package Pov
 */
class Debug extends AbstractSingleton {
    /**
     * Pour connaitre le type d'un truc
     * @param mixed $object
     *
     * @return mixed|string
     */
    public function type($object){
        $type=gettype($object);
        $str="";
        switch ($type){

            case "boolean":
                $str.=$object?"true":"false";
                break;

            case "integer":
            case "double":
            case "string":
            case "NULL":
                $str.=$object;
                break;

            case "array":
                foreach($object as $k=>$v){
                    $str.="\t\t[\n".$k." : ".$this->type($v)."\t\t] ";
                }
                if(count($object)==0){
                    $str.="\t(empty) ";
                }
                break;

            case "object":
                $class=get_class($object);
                $str.=$class;
                if(is_a($object,"MichelleRecord") || is_a($object,"VV_record")){
                    $str.=" -uid ".$object->uid." ";
                }
                break;

            case "resource":
                $str.=get_resource_type($object);
                break;

            default:
                $str.="Oups this type is not managed";

        }
        $str="($type) $str \n";

        return $str;
    }

    /**
     * Retourne un json pretty print de $truc
     * @param mixed $object
     *
     * @return string
     */
    public function dump($object){
        return json_encode($object,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
    }
}