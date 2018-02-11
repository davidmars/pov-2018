<?php

namespace Pov\Defaults;

use Pov\MVC\Controller;
use Pov\MVC\View;

/**
 * Les contrôleurs par défaut
 * @package Pov\defaults\MVC\C
 */
class C_dev extends Controller{

    public function index_run(){
        return $this->page_run("help");
    }


    public static function page_url($page){
        return self::genUrl("page/".$page);
    }
    public function page_run($page){
        pov()->disableLogging();
        return View::get("dev/pages/$page");
    }


    /**
     * Fait en sorte que l'utilisateur ne soit plus connecté en tant que dev
     * Redirige vers la page qui a appelé.
     *
     * @return string
     */
    public static function logout_url($redirect=null){
        if(!$redirect){
            $redirect=the()->requestUrl->fullUrl;
        }
        $redirect=base64_encode($redirect);
        return "//dev:logout@".the()->requestUrl->host."".the()->configProjectUrl->httpPathNoHost."/dev/logout?r=".$redirect;
    }


    /**
     * @return null
     */
    public function logout_run(){
        $redirect=the()->request("r");
        if($redirect){
            $redirect=base64_decode($redirect);
        }else{
            $redirect=the()->configProjectUrl->absoluteUrl();
        }
        header('WWW-Authenticate: Basic realm="povrealm"');
        //the()->headerOutput->set404()
        header('HTTP/1.0 401 Unauthorized');
        //exit();
        return View::get("redirect-js",$redirect);
    }
} 