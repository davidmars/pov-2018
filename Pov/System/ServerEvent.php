<?php

namespace Pov\System;
use Pov\Defaults\C_povApi;

/**
 * Le modèle de données qui est renvoyé par le flux PovApi/sse
 * @package Pov\System
 */
class ServerEvent
{

    const EVENT_DEBUG_LOG = "debug.log";

    /**
     * @var int intervale (en secondes) entre chaque itération
     */
    public static $loopInterval=1;
    /**
     * @var int Nombre d'itérations max
     */
    public static $maxLoopIterations=60*60;//pendant une heure du coup ($loopInterval * 60 *60)

    /**
     * @var int identifiant de l'évènement
     */
    public $id;
    /**
     * @var string type dévènement
     */
    public $type;
    /**
     * @var string message à afficher à monsieur tout le monde
     */
    public $humanMessage="";
    /**
     * @var string message à afficher au développeurs seulement
     */
    public $devMessage="";
    /**
     * @var string moment où cet objet a été créé
     */
    public $time="";
    /**
     * @var array données en plus
     */
    public $vars=[];


    /**
     * @var ServerEvent[] buffer des events à renvoyer.
     * Ne doit être lu que par C_PovApi::see() lors de la boucle
     * Ne doit être rempli que lors d'un d'auback de C_povApi::EVENT_REQUEST_SSE_LOOP
     * @see C_povApi::sse_run()
     */
    static $toSend=[];

    public function __construct($id,$type,$humanMessage,$vars=null)
    {
        $this->id=$id;
        $this->type=$type;
        $this->humanMessage=$humanMessage;
        $this->vars=$vars;
        $this->time=pov()->now();
        self::$toSend[]=$this;
    }
}