<?php

namespace Pov\System;
use Pov\Configs\Project;

use Pov\Defaults\C_files;
use Pov\MVC\Controller;
use Pov\MVC\View;
use Pov\PovException;

/**
 * Class Boot
 * @package Pov\System
 */
class Boot {
    /**
     * @var string[] Liste des redirections 301, la clé est l'url d'origine, la valeur est l'url de redirection
     */
    public $redirect301=[];

    /**
     * @var int Le microtime quand le Boot à été construit
     */
    private $startTime;

    /**
     * @return int Depuis combien de milliseconds le programme à démarré?
     */
    public function getTime(){
        return (microtime(true)-$this->startTime)*1000;
    }

    /**
     * @var Route La route déduite de l'url
     */
    public $route;
    /**
     * @var Controller Le controleur déduit de la route
     */
    public $controller;

    /**
     * @var string La sortie texte
     */
    private $output="";


    /**
     * Boot constructor.
     * @param \Composer\Autoload\ClassLoader $autoloader l'autoloader composer
     * @throws \Exception
     */
    public function __construct($autoloader){
        $this->startTime=microtime(true);
        the()->autoloader = $autoloader;
        if(the()->boot){
            throw new \Exception("Vous essayez de déclarer au autre Boot!");
        }
        the()->boot=$this;
        //header par défaut
        the()->headerOutput=new Header();
        the()->headerOutput->code=200;
        //url courrante
        the()->requestUrl=UrlPov::current();


    }

    /**
     * Fait le job
     */
    public function letsGo()
    {


        //recherche le fichier de conf en fonction du domaine/repertoires
        $fullUrl=the()->requestUrl->host."/".the()->requestUrl->path;
        $urlParts=explode("/",$fullUrl);
        $confFile="";
        $urlBase="";
        $routeOnly=$_GET["routeOnly"];
        //urls hors projet en premier

        if(preg_match("@^files/@",$routeOnly,$m)){
            //die("files/cache");
            $urlBase="";
            $confFile=true;
            $projectName="files";
            the()->configProjectUrl=new \Pov\Configs\ProjectUrl("");
            the()->project=new \Pov\Configs\Project();
            the()->fileSystem=new \Pov\Configs\FileSystem("");
            the()->project->controllerNameSpaces[]="Pov/Defaults";
            C_files::install();


        }

        //tente de trouver un fichier de conf ndd.com/directory/path.php
        if(!$confFile){
            //urls projet
            while(!$confFile && $urlParts){
                $urlBase=implode("/",$urlParts);
                $toTest="configs/routes/".$urlBase.".php";
                if(file_exists($toTest) && is_file($toTest)){
                    $confFile=$toTest;
                    require_once $confFile;
                }else{
                    array_pop($urlParts);
                }
            }
        }
        if(!$confFile){
            //va tenter avec default.php
            $toTest="configs/routes/default.php";
            if(file_exists($toTest) && is_file($toTest)){
                $confFile=$toTest;
                require_once $confFile;
                $urlBase=the()->configProjectUrl->httpPath;
            }
        }
        if(!$confFile){
            //va tenter avec configs/all-domains/directory/path.php
            $fullUrl="all-domains"."/".the()->requestUrl->path;
            $urlParts=explode("/",$fullUrl);
            //urls projet
            while(!$confFile && $urlParts){
                $urlBase=implode("/",$urlParts);
                $toTest="configs/routes/".$urlBase.".php";
                if(file_exists($toTest) && is_file($toTest)){
                    $confFile=$toTest;
                    require_once $confFile;
                    $urlBase=the()->configProjectUrl->httpPath;
                }else{
                    array_pop($urlParts);
                }
            }
        }

        if(!$confFile){
            throw new \Exception("Impossible de trouver un fichier de config pour '$fullUrl'");
        }

        if(!the()->configProjectUrl){
            throw new \Exception("Aucune config définie dans $confFile");
        }

        if(the()->configProjectUrl->httpPath !=$urlBase){
            throw new \Exception("Problème de configuration! Le httpPath mentionné dans $confFile donne '".the()->configProjectUrl->httpPath."', ce qui n'est pas logique.");
        }

        //--------------------à partir d'ici on a un projet-------------------


        //si slash à la fin de l'url on redirige car on aime pas ça
        /*
        $urlNoQuery=parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        if(preg_match("@.+/$@",$urlNoQuery)){
            $noSlash=the()->requestUrl->fullUrl;
            die("slash à la fin on redirige de $urlNoQuery vers $noSlash");
            the()->headerOutput->setRedirect($noSlash,"301");
            the()->headerOutput->run();
        }
        */

        //force https?
        if(the()->configProjectUrl->forceHttps && !the()->requestUrl->isHttps){
            the()->headerOutput->redirectUrl=str_replace("http://","https://",the()->requestUrl->fullUrl);
            the()->headerOutput->code=Header::REDIRECT_301;
            $this->end();
        }

        //redurect 301?

        //die("routeOnly ".the()->requestUrl->routeString());
        $route=trim(the()->requestUrl->routeString(),"/");
        if(array_key_exists($route,$this->redirect301)){
            //die("redirect to ".the()->configProjectUrl->absoluteUrl()."/".$this->redirect301[$route]);
            the()->headerOutput->redirectUrl=the()->configProjectUrl->absoluteUrl()."/".$this->redirect301[$route];
            the()->headerOutput->code=Header::REDIRECT_301;
            $this->end();
        }

        if(!the()->project){
            throw new \Exception("'".the()->configProjectUrl->httpPath."' n'a pas de projet défini");
        }
        //ajoute les Vues
        foreach(the()->project->viewPath as $viewPath){
            if(!is_dir($viewPath)){
                throw new \Exception("'$viewPath' n'est pas un répertoire valide");
            }
            View::$possiblesPath[]=$viewPath;
        }


        //routage...
        $this->route=new Route(
            the()->requestUrl->routeString()
            /*
            str_replace(
                the()->configProjectUrl->httpPath,"",
                the()->requestUrl->host."/".the()->requestUrl->path
            )
            */
        );

        //recherche un controleur parmis les controlleurs possibles du projet
        foreach(the()->project->controllerNameSpaces as $ns){
            $controllerName=$ns."/".$this->route->controllerClassName;
            $controllerName=str_replace("/","\\",$controllerName);
            if(class_exists($controllerName)){
                $this->controller=new $controllerName();
                if(method_exists($this->controller,$this->route->controllerMethod)){
                    //pas trop d'arguments?
                    $c=new \ReflectionClass($this->controller);
                    $m=$c->getMethod($this->route->controllerMethod);
                    $paramCounts=$m->getNumberOfParameters();
                    $argsCount=count($this->route->controllerArguments);
                    if($paramCounts<count($this->route->controllerArguments)){
                        $m="Le controlleur ".$this->route->controllerClassName." / .".$this->route->controllerMethod." accepte $paramCounts arguments, $argsCount donnés";
                        pov()->log->error($m);
                        $this->controller=null;
                    }else{
                        break;
                    }
                }else{
                    $this->controller=null;
                }
            }
        }

        if(!$this->controller){
            foreach(the()->project->routes as $reg=>$route){
                if(preg_match("#$reg#",$this->route->path)){
                    $this->route=new Route(
                        preg_replace("#".$reg."#",$route,$this->route->path)
                    );
                    break;
                }
            }
            //recherche un controleur parmis les controlleurs possibles du projet
            foreach(the()->project->controllerNameSpaces as $ns){
                $controllerName=$ns."/".$this->route->controllerClassName;
                $controllerName=str_replace("/","\\",$controllerName);
                if(class_exists($controllerName)){
                    $this->controller=new $controllerName();
                    //on a un controlleur...a-t-on une methode run qui colle?
                    if(method_exists($this->controller,$this->route->controllerMethod)){
                        break;
                    }else{
                        $m="Le controlleur ".$this->route->controllerClassName." n'a pas de méthode ".$this->route->controllerMethod;
                        pov()->log->error($m);
                        $this->controller=null;
                        //throw new PovException($m); //TODO important gérer une 404 clean
                        //$this->controller=new C_default();
                    }


                }
            }
        }


        if(!$this->controller){
            $m="Pas de controleur trouvé pour ".$this->route->path;
            pov()->log->error($m,[the()->project->controllerNameSpaces]);
            throw new \Exception($m);
        }else{
            if(!is_a($this->controller,"Pov\MVC\Controller")){
                throw new PovException("Le controleur trouvé pour ".$this->route->path." n'est pas une classe Pov\MVC\Controller. Il manque un extend ;)");
            }
        }




        //on a un controlleur + une méthode
        $view=$this->controller->run(
            $this->route->controllerMethod,
            $this->route->controllerArguments
        );
        if($view){
            $this->output=$view->render();
        }else{
            die("controler et tout et tout mais pas de view en retour");
            //oui c'est possible qu'il n'y ait pas de view
        }

        //------------ yo tout va bien !!!!!!

        $this->end();

    }

    /**
     * Arrête le programme proprement
     */
    public function end(){
        $debug=false;
        //$this->output="endok ".$this->output;
        $errors=error_get_last();
        if($errors && $debug){
            print_r($errors);
        }else{

            if(View::$exceptions){
                $m="<div><div class='xdebug-error' error-source='".__FILE__."@".__LINE__."'>";
                $m.="<h2>View Exceptions :(</h2>";
                $m.="<hr>";
                foreach (View::$exceptions as $e){
                    $m.="<h3 class='pov-error'>".$e->getMessage()."</h3>";
                    $m.="<pre>".$e->getTraceAsString()."</pre>";
                    $m.="<hr>";
                }
                $m.="</div></div>";
                die($m);
            }
            the()->headerOutput->run();
            echo $this->output;
        }
        exit();
    }



    /**
     * Charge un projet comme projet principal à partir de son répertoire
     * Le projet doit contenir au minimum:
     * boot/app.php
     * pub/etc...
     * v/etc...
     *
     * @param string $projectDirectory répertoire du projet.
     * @param string $projectName Nom du projet (juste pour affichage=
     */
    public function loadProject($projectDirectory,$projectName=null)
    {
        if(the()->fileSystem->projectPath){
            die("un projet a déjà été loadé (".the()->fileSystem->projectPath.")");
        }
        $projectDirectory=trim($projectDirectory,"/");
        the()->fileSystem->projectPath=$projectDirectory;
        $p=new Project();
        $p->versionFilePath=$projectDirectory."/version.txt";


        if($projectName){
            $p->name=$projectName;
        }else{
            dirname($projectDirectory);
        }

        //répertoires
        if(is_dir($projectDirectory."/v")){
            $p->viewPath[]=$projectDirectory."/v";
        }
        if(is_dir($projectDirectory."/_src")){
            $p->viewPath[]=$projectDirectory."/_src";
        }
        $p->pub=$projectDirectory."/pub";
        $p->pubHttp=$p->pub;
        if(!preg_match("@^/@",$p->pubHttp)){
            $p->pubHttp=the()->fmkHttpRoot."/".$p->pubHttp;
        }

        //définit comme LE projet par défaut
        the()->project=$p;
        //charge les machins plus précis
        require $projectDirectory."/boot/app.php";
    }


}