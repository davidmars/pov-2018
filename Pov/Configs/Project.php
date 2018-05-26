<?php

namespace Pov\Configs;


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
     * Ajoute une règle de routage à la fin de la liste.
     * @param string $regRule une regexp ex: "^p/(.*)$"
     * @param string $controller Le controller qui en résulte. ex "blog/post/($1)"
     */
    public function routesPush($regRule,$controller)
    {
        $this->routes[$regRule]=$controller;
    }

} 