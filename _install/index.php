<?php
$composer=require __DIR__.'/vendor/autoload.php';


//gestion des erreurs
use Pov\MVC\View;
use Pov\System\Boot;
use Pov\Pov;
use Pov\The;

error_reporting(-1);
ini_set('display_errors', 1);


/**
 * Accès rapide aux fonctions les plus courrantes
 * @return Pov
 */
function pov(){
    return Pov::inst();
}

/**
 * @return The Donne un accès rapide à des instances uniques qui dépendent du contexte d'exécution
 */
function the(){
    return The::inst();
}

$theBoot=new Boot($composer);
$theBoot->letsGo();

/** @var \Pov\MVC\View $view La vue courrante (Autocompletion dans les vues pour éviter de documenter $this dans chaque vue) */
$view=new View("");

/** @var mixed $vv Objet de variables propre à la vue */
$vv="";