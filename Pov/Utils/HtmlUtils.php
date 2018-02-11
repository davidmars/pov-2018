<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 13/09/2017
 * Time: 10:06
 */

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Class HtmlUtils donne accès à quelque methodes pratiques qui tournent autour du html
 * @package Pov\Utils
 */
class HtmlUtils extends AbstractSingleton
{
    /**
     * Transforme un tableau associatif en attributs html et restourne la chaine ainsi obtenue
     * @param array $associativeArray
     * @return string
     */
    public function arrayToAttr(array $associativeArray){
        $r = join(' ', array_map(function($key) use ($associativeArray)
            {
                if(is_bool($associativeArray[$key]))
                {
                    return $associativeArray[$key]?$key:'';
                }
                return $key.'="'.$associativeArray[$key].'"';
            }, array_keys($associativeArray)));
        return $r;
    }
}