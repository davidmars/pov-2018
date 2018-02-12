<?php

namespace Pov\System;
use Pov\PovException;

/**
 * La classe Human fait réference à une internaute devant son écran
 *
 * @package Pov\System
 */
class Human {

    /**
     * Est-il connecté en tant qu'administrateur ou non?
     * @var bool
     */
    public $isAdmin=false;
    /**
     * Est-il un développeur ou non?
     * Permet en général de déterminer ce qui doit être affiché ou non en matière de débuggage.
     * @var bool
     */
    public $isDev=false;
    /**
     * @var bool Est il loggué actuellement ou non
     */
    public $isLoggedIn=false;

    /**
     * @var string
     */
    private $_devPassword;

    /**
     * Renvoie le mot de passe de dev (génère le mot de passe au besoin dans configs/dev-password.php)
     * @return string
     * @throws PovException si le password n'a pas été généré
     */
    public function devPassword(){
        if(!$this->_devPassword){
            $f="configs/dev-password.php";
            if(!is_file($f)){
                throw new PovException("missing password file (configs/dev-password.php)");
            }
            include $f;
            $this->_devPassword=$pwd;
        }
        return $this->_devPassword;
    }
    /**
     * @param bool $askForLogin Si true et que l'utilisateur n'est pas identifié en tant que dev, demandera un login
     * @return bool|null
     */
    public function isDev($askForLogin=false)
    {

        $user="dev";
        $realm="povrealm";
        if($this->_isDev===null){
            if(!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])){

                if($askForLogin){
                    header('WWW-Authenticate: Basic realm="'.$realm.'"');
                    header('HTTP/1.0 401 Unauthorized');
                    //exit;
                }else{
                    $this->devLogout();
                }

            }elseif($_SERVER['PHP_AUTH_USER']==$user && $_SERVER['PHP_AUTH_PW']==$this->devPassword()){
                $this->_isDev=true; //ok
            }else{
                //mauvais user / password
                $this->devLogout();
                if($askForLogin){
                    header('WWW-Authenticate: Basic realm="'.$realm.'"');
                    header('HTTP/1.0 401 Unauthorized');
                    //exit;
                }else{
                    $this->devLogout();
                }
            }
        }
        return $this->_isDev;
    }

    /**
     * Déconnecte l'utilisateur en tant que dev
     */
    public function devLogout(){
        unset($_SERVER['PHP_AUTH_USER']);
        unset($_SERVER['PHP_AUTH_PW']);
        unset($_SESSION['realm']);
        $_SERVER['PHP_AUTH_USER']=null;
        $_SERVER['PHP_AUTH_PW']=null;
        $_SESSION['realm']=null;
        $this->_isDev=false;
    }
    private $_isDev=null;

    /**
     * Ajoute un message d'erreur à l'utilisateur qui lui sera affiché dès que possible
     * @param string $message
     */
    public function addError($message)
    {
        $_SESSION["humanErrors"][]=$message;
    }

    /**
     * @param bool $removeAfter
     * @return array
     */
    public function getErrors($removeAfter=true){
        $r=[];
        if(isset( $_SESSION["humanErrors"])){
            $r=$_SESSION["humanErrors"];
        }
        if($removeAfter){
            $_SESSION["humanErrors"]=[];
        }
        return $r;
    }
}