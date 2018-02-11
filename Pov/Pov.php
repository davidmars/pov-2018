<?php

namespace Pov;
use Jenssegers\Agent\Agent;
use Monolog\Handler\ChromePHPHandler;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\IntrospectionProcessor;
use Monolog\Processor\WebProcessor;
use Pov\Image\ImgUrlHtml;
use Pov\System\AbstractSingleton;
use Pov\System\Event;
use Pov\Utils\SvgUtils;
use Pov\Utils\Utils;

/**
 * Class Pov
 *
 * @package Pov\System
 * @property Utils $utils
 * @property SvgUtils $svg
 * @property Debug $debug
 * @property Logger $log Permet de logguer des trucs. Les logs se retrouvent dans files/pov.system.log et dans l'extension ChromePHPHandler
 * @property Event $events Accès aux events pour pouvoir interragir en mode écoute
 */
class Pov extends AbstractSingleton
{
    /**
     * Désactive les logs
     * @return mixed
     */
    public function disableLogging(){
        $log=new Logger("pov");
        return self::storeSet("log",$log);
    }

    public function __get($property) {
        $val=self::storeGet($property);
        if($val){
            return $val;
        }else{
            switch ($property){
                case "log":
                    //default logger
                    $log=new Logger("pov");
                    $log->pushProcessor(new IntrospectionProcessor());
                    $datas=[
                        'REQUEST_URI'    => $_SERVER['REQUEST_URI'],
                        'REMOTE_ADDR'    => $_SERVER['REMOTE_ADDR'],
                        'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'],
                        'SERVER_NAME'  =>   $_SERVER['SERVER_NAME'],
                        'HTTP_REFERER' =>   isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:"",
                        'bootid'    =>      uniqid("boot"),
                        'boottime'    =>    the()->boot->getTime(),
                        'sessid'    =>      session_id(),
                        'browser'    =>     the()->computer()->browser()." ".the()->computer()->version(the()->computer()->browser()),
                        'os'    =>          the()->computer()->platform()." ".the()->computer()->version(the()->computer()->platform()),
                    ];
                    $extrafields=[
                        'url'         => 'REQUEST_URI',
                        'ip'          => 'REMOTE_ADDR',
                        'http_method' => 'REQUEST_METHOD',
                        'server'      => 'SERVER_NAME',
                        'referrer'    => 'HTTP_REFERER',
                        'bootid'    => 'bootid', //permet d'identifier chaque boot
                        'boottime'    => 'boottime', //permet d'identifier le moment precis ou on a initialisé les logs
                        'sessid'    => 'sessid',
                        'browser'    => 'browser',
                        'os'    => 'os',
                     ];

                    $log->pushProcessor(new WebProcessor($datas,$extrafields));
                    $log->pushHandler(new StreamHandler(the()->fileSystem->logFilepath(), Logger::DEBUG));
                    $log->pushHandler(new ChromePHPHandler());
                    //$this->log->pushHandler(new NativeMailerHandler("d.marsalone@gmail.com","pov2017 log","d.marsalone@gmail.com"));
                    return self::storeSet($property,$log);
                    break;
                case "utils":
                    return self::storeSet($property,Utils::inst());
                    break;
                case "debug":
                    return self::storeSet($property,Debug::inst());
                    break;
                case "events":
                    return self::storeSet($property,Event::inst());
                    break;
                case "svg":
                    return self::storeSet($property,SvgUtils::inst());
                    break;
            }
        }
        throw new PovException("Propriété $property non prise en charge dans ".__CLASS__);

    }

    /**
     * Pour optimiser des images
     * @param string $imgSrc url de l'image à modifier
     * @return ImgUrlHtml
     */
    public function img($imgSrc){
        return ImgUrlHtml::inst($imgSrc);
    }

    /**
     * @return string Temps au format Y-m-d H:i:s
     */
    public function now(){
        return date("Y-m-d H:i:s");
    }






}

include __DIR__."/constants.php";