<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 14/09/2017
 * Time: 17:29
 */

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Class PhpAnalyzer permet d'analyser du code php genre des noms de classe, des héritages, etc...
 * @package Pov\UtilsAnalyze
 */
class PhpAnalyzer extends AbstractSingleton
{
    /**
     * @param mixed $object
     * @return string The class short name.
     */
    public function getClassWithoutNameSpaces($object)
    {
        $r=new \ReflectionClass($object);
        return $r->getShortName();
    }

    /**
     * Retourne la hierarchie de classes sous forme de tableau plat
     * @param string $className Nom de la classe à analyser
     * @return string[] liste des classes
     */
    public function getClassHierarchy($className){
        if(!isset($this->_getClassHierarchy[$className])){
            $classesHierarchy=array_keys(class_parents($className,false));
            $classesHierarchy=array_merge([$className],$classesHierarchy);
            $this->_getClassHierarchy[$className]=$classesHierarchy;
        }
        return $this->_getClassHierarchy[$className];

    }
    private $_getClassHierarchy=[];



}