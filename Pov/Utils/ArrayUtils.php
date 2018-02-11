<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 29/10/2017
 * Time: 22:13
 */

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Collections de méthodes pour faires des trucs avec des arrays
 * @package Pov\Utils
 */
class ArrayUtils extends AbstractSingleton
{
    /**
     * Set une valeur à partir d'une variable à points
     * @param array|object $arrayOrObject
     * @param string $varNameWithDots maClef1.maClef2
     * @param $value
     * @see ArrayUtils::getValFromDotsVarName
     */
    public function setValFromDotsVarName(&$arrayOrObject, $varNameWithDots, $value)
    {
        $current = &$arrayOrObject;
        $steps=explode('.', $varNameWithDots);

        //initilaisation du champ si ce n'était pas encore fait
        $step0=$steps[0];
        if(!isset($arrayOrObject->$step0)){
            $arrayOrObject->$step0=[];
        }
        foreach($steps as $step)
        {
            if(is_array($current)){
                $current = &$current[$step];
                //$current = array_merge($current,$current[$step]);
            }else{
                $current = &$current->$step;
            }
        }

        //si la valeur est un tableau, on merge avec le tableau existant
        if(is_array($value)){
            $clean=[];
            foreach ($value as $k=>$v){
                if(is_array($v) && isset($current[$k])){
                    $clean[$k]=array_merge($v,$current[$k]);
                }else{
                    $clean[$k]=$v;
                }
            }
            $current=$clean;
        }else{
            $current = $value;
        }


    }

    /**
     * Get une valeur à partir d'une variable à points
     * @param array|object $arrayOrObject
     * @param string $varNameWithDots maClef1.maClef2
     * @return array|mixed|null
     * @see ArrayUtils::setValFromDotsVarName
     */
    function getValFromDotsVarName($arrayOrObject, $varNameWithDots, $default = null)
    {
        $current = $this->fromObject($arrayOrObject);
        $p = strtok($varNameWithDots, '.');

        while ($p !== false) {
            if (!isset($current[$p])) {
                return $default;
            }
            $current = $current[$p];
            $p = strtok('.');
        }

        return $current;
    }

    /**
     * Convertit un objet en array et le renvoie
     * @param object|array $object
     * @return array
     */
    public function fromObject($object){
        $ar=json_encode($object);
        $ar=json_decode($ar,true);
        return $ar;
    }

    /**
     * Convertit un tableau en chaine séparée par une virgule, si c'est déjaà un string le renvoie sans erreur
     * @param array|String $array
     * @param string $separator une virgule par défaut
     * @return string
     */
    public function toString($array,$separator=","){
        if(is_array($array)){
            return implode($separator,$array);
        }
        return $array;
    }

    /**
     * Renvoie un tableau à partir d'une chaine séparée par des virgules, des espaces, des points virgules ou des sauts de ligne
     * @param string|array $string si c'est un tableau à la base le renvera.
     * @return string[]
     */
    public function fromString($string){
        if(!$string){
            return [];
        }
        if(is_array($string)){
            return $string;
        }else{
            return preg_split("/[;, \r\n]+/", $string);
        }


    }

    /**
     * Renvoie true si le tableau est un tableau associatif...false si ses clés sont numeriques, séquentielles et commencent par zéro
     * @param array $array
     * @return bool
     */
    function isAssociative($array){
        if ([] === $array) return false;
        return array_keys($array) !== range(0, count($array) - 1);
    }

    /**
     * Concatène un tableau en utilisant des virgule et un mot (et/and) pour la dernière séparation.
     * @param string[] $list
     * @param string $andWord Le mot à utiliser pour la sernière séparation ('and' par défaut)
     * @return string machin, truc and bidule
     */
    function joinHumanLanguage($list,$andWord="and"){

        $last  = array_slice($list, -1);
        $first = join(', ', array_slice($list, 0, -1));
        $both  = array_filter(array_merge([$first], $last), 'strlen');
        return join(" $andWord ", $both);
    }
}