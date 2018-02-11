<?php

namespace Pov\Defaults;


use Pov\MVC\View;

class Defaults
{
    /**
     * @param bool $view installer les vues?
     * @param bool $controllers installer les controllers?
     */
    public static function install($view=true,$controllers=true){
        if($view){
            View::$possiblesPath[]=__DIR__."/v";
        }
        if($controllers){
            C_default::install();
        }
    }
}