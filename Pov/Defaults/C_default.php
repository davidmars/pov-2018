<?php

namespace Pov\Defaults;

use Pov\MVC\Controller;
use Pov\MVC\ControllerUrl;
use Pov\MVC\View;
use Pov\PovException;
use Pov\System\ApiResponse;
use Pov\System\Header;

/**
 * Les contrôleurs par défaut
 * @package Pov\defaults\MVC\C
 */
class C_default extends Controller{

    /**
     * Installe les routes dans the()->project. ATTENTION il est conseillé de les installer à la fin afin que la 404 soit executée en dernier ordre.
     * Les routes installées sont index,v/* et err404
     *
     */
    public static function install(){
        the()->project->controllerNameSpaces[]="Pov/Defaults";
        foreach (self::$routesRules as $regle=>$controller){
            the()->project->routesPush($regle,$controller);
        }
    }

    /**
     * @var array Les règles d'url à utiliser pour ce contrôleur
     */
    public static $routesRules=[
      "^$"=>"default/index",
      "^favicon.ico$"=>"default/favicon",
      "^dwd/(.*)/(.*)$"=>"default/dwd/$1/$2",
      "^v/(.*)$"=>"default/quickView/($1)", // le ($1) dit que les slashes à l'intérieur de la parenthèse sont préservés (toto/titi) ne donnera pas deux arguments mais un seul
      "^(.*)$"=>"default/err404",
    ];

    /**
     * La page d'index (ou une page sous l'index si le paramètre $url est spécifié)
     * @param string $url
     * @return ControllerUrl
     */
    public static function index_url($url=""){
        return new ControllerUrl($url);
    }

    /**
     * @return View
     */
    public function index_run(){
        return new View("index");
    }

    /**
     * La page d'erreur 404
     * @return View
     */
    public function err404_run($message="La page n'existe pas"){
        the()->headerOutput->set404($message);
        return new View("404",$message);
    }

    /**
     * Affiche une view située dans un répertoire /quick-view/
     * @param string $view
     * @return ControllerUrl
     */
    public static function quickView_url($view){
        return new ControllerUrl("v/$view");
    }

    /**
     * Affiche une view située dans un répertoire /quick-view/
     * @param string $view
     * @return View
     */
    public function quickView_run($view){
        $v="quick-view/$view";
        if(View::isValid($v)){
            if(the()->requestUrl->isAjax){
                $o=new ApiResponse();
                $o->setHtml($v,null);
                return View::get("json",$o);
            }
            return new View($v);
        }else{
            return $this->err404_run("'$v' n'est pas une vue valide pour quickView");
        }
    }

    /**
     * mon-site.com/favicon.ico
     * Si un favicon est défini dans le layout à ce stade renverra cette icone
     */
    public function favicon_run(){
        $f=the()->htmlLayout()->favicon->favicon;
        $f=trim($f,"/"); //trim pour eviter les / au debut
        if($f && is_file($f)){
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $contentType = finfo_file($finfo, $f);
            finfo_close($finfo);
            header('Content-Type: ' . $contentType);
            readfile($f);
            die();
            //return null;
        }else{
            the()->headerOutput->set404("no favicon");
        }
    }

    /**
     * @var string Clé d'encryptage (à modifier pour chaque site) pour s'assurer que le fichier téléchargé est bien passé par le controlleur
     */
    public static $_secure_download_key="12345azertyuiop";

    /**
     * Pour télécharger un fichier (force le dwd et sécurise l'url)
     * @param string $fileUrl url du fichier à télécharger
     * @return ControllerUrl
     */
    public static function dwd_url($fileUrl){
        $md5token=md5($fileUrl.self::$_secure_download_key);
        return new ControllerUrl("dwd/".base64_encode($fileUrl)."/$md5token");
    }

    /**
     * @param string $fileUrl64
     * @param string $md5token Token pour vérifier que le téléchargement est autorisé via le controlleur
     * @throws PovException
     */
    public function dwd_run($fileUrl64,$md5token){
        $fileUrl=base64_decode($fileUrl64);
        if(!file_exists($fileUrl)){
            throw new PovException("download error 1");
        }
        $md5tokenVerif=md5($fileUrl.self::$_secure_download_key);
        if($md5tokenVerif != $md5token){
            throw new PovException("download error 2");
        }
        if(preg_match("/\.php$/",$fileUrl)){
            throw new PovException("download error 3");
        }

        $quoted = sprintf('"%s"', addcslashes(basename($fileUrl), '"\\'));
        $size   = filesize($fileUrl);

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename=' . $quoted);
        header('Content-Transfer-Encoding: binary');
        header('Connection: Keep-Alive');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . $size);
        readfile($fileUrl);
        die();

    }

} 