<?php

namespace Pov\System;


class Route {
    /**
     * @var string La route sous sa forme texte
     * @example controller-class/controller-method/argument1/argument2/argument3
     */
    public $path="";
    /**
     * @var string Le path sans aucune modification
     */
    public $originalPath="";
    /**
     * @var string C_qqueChose
     */
    public $controllerClassName="";
    /**
     * @var string methode_run
     */
    public $controllerMethod="";
    /**
     * @var array Les paramètres à faire passer à la fonction
     */
    public $controllerArguments=[];

    public function __construct($path){
        $this->originalPath="ogiginal-".$path;
        $this->path=$path;
        $this->path=trim($this->path,"/ ");

        //règles

        //preserve les slash entre parenthèses
        $this->path = preg_replace_callback(
            '#\([^\(\)]*\)#',
            function ($matches) {
                $m=$matches[0];
                $m=str_replace("(","",$m);
                $m=str_replace(")","",$m);
                return str_replace("/","***slash***",$m);
            },
            $this->path
        );
        //$this->path = preg_replace("#\((.*)/(.*)\)#", "($1***slash***$2)", $this->path); // papa/(toto/titi) => fait que "toto/titi" sera un seul paramètre

        $split=explode("/",$this->path);
        $this->controllerClassName="C_".array_shift($split);
        $this->controllerMethod=array_shift($split)."_run";
        if($this->controllerMethod=="_run"){
            $this->controllerMethod="index_run";
        }
        $this->controllerArguments=$split;

        //règles clean
        for($i=0;$i<count($this->controllerArguments);$i++){
            $arg=$this->controllerArguments[$i];
            $arg=str_replace("***slash***","/",$arg);
            $this->controllerArguments[$i]=$arg;
        }

    }
}