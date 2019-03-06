<?php

namespace Pov\Configs;
use Pov\Utils\Translations;
use Pov\PovException;


/**
 * Class Project
 *
 * @package Pov\Configs
 */
class Project {
    /**
     * @var string[] Répertoires où on peut trouver des Vues
     */
    public $viewPath=[];
    /**
     * @var string[]  Les espaces de noms possibles pour exécuter des controlleurs
     */
    public $controllerNameSpaces=[];

    /**
     * @var string Nom du projet
     */
    public $name;

    /**
     * @var array regexp dans la clé et url de controlleur dans la valeur
     */
    public $routes=[];
    /**
     * @var string chemin vers un fichier texte qui contient le numéro de version du projet
     */
    public $versionFilePath="version.txt";
    /**
     * @var string chemin vers le répertoire "pub"
     */
    public $pub;
    /**
     * @var string chemin vers le répertoire "pub" avec un slash au debut pour utiliser dans le html
     */
    public $pubHttp;

    /**
     * @var string code iso de la langue
     */
    public $langCode="fr";

    /**
     * @var string[] liste des langues (codes) à gérer
     */
    public $languages=[];
    /**
     * @var string[] liste des urls index pour chaque langue, les entrées sont les langcodes, les valeurs sont les urls
     */
    public $languagesUrls=[];

    /**
     * @var string url du csv des traductions
     */
    public $config_translations_csv_url="https://docs.google.com/spreadsheets/d/1m_vi4YTj2vAMwaJxvGWRIeJP4F9IOhE_FMftjruiDz0/export?gid=0&format=csv";
    /**
     * @var bool Quand défini sur true les traductions sont mises à jour depuis le csv sans tenir compte du cache
     */
    public $config_translations_debug=false;

    /**
     * @var Translations
     */
    private $_translations;

    /**
     * Revoie (et télécharge au besoin) les traductions
     * @return array|mixed
     * @throws PovException
     */
    public function translations(){
        if(!$this->_translations){
            $this->_translations=new Translations(
                $this->config_translations_csv_url,
                $this->langCode
            );
        }
        return $this->_translations->translations();
    }


    /**
     * Renvoie un terme traduit pour le projet
     * @param string $termsIdentifier
     * @param bool $nl2br si true remplacera les sauts de ligne par des <BR>
     * @param string $langCode Langue à utiliser pour traduire le terme
     * @return string
     * @throws PovException
     */
    public function translation($termsIdentifier,$nl2br=false,$langCode=null){
        $this->translations();
        return $this->_translations->term($termsIdentifier,$nl2br,$langCode);
    }




    /**
     * Ajoute une règle de routage à la fin de la liste.
     * @param string $regRule une regexp ex: "^p/(.*)$"
     * @param string $controller Le controller qui en résulte. ex "blog/post/($1)"
     */
    public function routesPush($regRule,$controller)
    {
        $this->routes[$regRule]=$controller;
    }

} 