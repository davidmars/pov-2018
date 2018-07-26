<?php
/**
 *
 */
namespace Pov;

use Pov\Configs\FileSystem;
use Pov\Configs\Project;
use Pov\Configs\ProjectUrl;
use Pov\Html\Layout;
use Pov\System\Boot;
use Pov\System\Computer;
use Pov\System\Header;
use Pov\System\Human;
use Pov\System\AbstractSingleton;
use Pov\System\UrlPov;

/**
 * la classe "The" permet de centraliser les singleton les plus courrants
 *
 * @package Pov
 */
class The extends AbstractSingleton {




    /**
     * @var array Un tablean dans lequel on peut stocker des trucs en mode anarchie
     */
    public $stuff=[];

    /**
     * @var string url relative par defaut pour acceder au fmk (la plupart du temps ça ne sert à rien, mais si le fmk est installé dans un sous répertoire, ça prend tout son sens)
     */
    public $fmkHttpRoot="";

    /**
     * @var Human L'humain qui est devant l'écran et ses caractéristiques
     */
    public $human;
    /**
     * @var Boot Le boot en cours
     */
    public $boot;
    /**
     * @var ProjectUrl La base d'url du projet qui détermine bcp de choses
     */
    public $configProjectUrl;
    /**
     * @var Project Le projet en cours
     */
    public $project;

    /**
     * @var UrlPov L'url en cours
     */
    public $requestUrl;

    /**
     * @var Header Le header courrant qui sera renvoyé
     */
    public $headerOutput;
    /**
     * @var FileSystem Le système de fichiers rataché à l'url du projet
     */
    public $fileSystem;
    /**
     * @var \Composer\Autoload\ClassLoader Autoloader composer
     */
    public $autoloader;



    /**
     * @var Layout
     */
    private static $_htmlLayout;

    /**
     * @return \Pov\Html\Layout
     */
    public function htmlLayout()
    {
        if(!self::$_htmlLayout){
           self::$_htmlLayout=new Layout();
        }
        return self::$_htmlLayout;
    }

    /**
     * @var Computer
     */
    private $_computer;

    /**
     * Infos sur l'os
     * @return Computer
     */
    public function computer(){
        if(!$this->_computer){
            $this->_computer=new Computer();
        }
        return $this->_computer;
    }

    /**
     * Renvoie un paramètre que l'on peut trouver dans $_REQUEST
     * @param string $queryParam Le paramètre Get ou Post
     * @param mixed   $ifNull La valeur à renvoyer si null ou indéfini
     * @return string|array|null
     */
    public function request($queryParam,$ifNull=null)
    {
        if(isset($_REQUEST[$queryParam])){
            if(is_array($ifNull)){
                $checked = $_REQUEST[$queryParam];
                $ret=[];
                for($i=0; $i < count($checked); $i++){
                    $ret[]=$checked[$i];
                }
                return $ret;
            }
            return $_REQUEST[$queryParam];
        }
        return $ifNull;
    }



    /**
     * Ce numéro de version vient du fichier apps/mon-projet/version.txt.
     * Il est généré par défaut cependant il est fortement recommandé de le mettre à jour à chaque changement JS ou CSS afin de contourner les caches.
     * @param null|string $toSetVersion si vous voulez déterminer la version faites le là, sinon ce sera la version du fichier texte qui sera utilisée
     * @return string un numéro de version.
     */
    public function version($toSetVersion=null)
    {
        if($toSetVersion){
            self::$_version=$toSetVersion;
        }
        if(!self::$_version){

            $versionFile=the()->project->versionFilePath;
            if(file_exists($versionFile)){
                self::$_version=file_get_contents($versionFile);
            }else{
                self::$_version="versionInitByPhpDefault-".time();
                file_put_contents($versionFile,self::$_version);
            }

        }
        return self::$_version;
    }
    

    /**
     * @var string
     */
    private static $_version="";

}

the()->human=new Human();

