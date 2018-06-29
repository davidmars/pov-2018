<?php


namespace Pov\Defaults;

use Pov\Image\ImgUrl;
use Pov\MVC\Controller;
use Pov\MVC\View;
use Pov\System\ApiResponse;
use Pov\System\ServerEvent;


/**
 * Class C_povApi
 * @package Pov\defaults
 */
class C_povApi extends Controller
{

    const EVENT_SAVE="PovApi.save";
    const EVENT_DELETE="PovApi.delete";
    const EVENT_CREATE="PovApi.create";
    const EVENT_UPLOAD="PovApi.upload";
    const EVENT_GET_VIEW="PovApi.getView";
    const EVENT_ACTION="PovApi.action";

    /**
     * Avant que ne démare la boucle SSE
     */
    const EVENT_REQUEST_SSE_INIT = "PovApi.sseInit";
    /**
     * A chaque itération de la boucle SSE
     */
    const EVENT_REQUEST_SSE_LOOP="PovApi.sseLoop";

    public function action_run($actionName){
        $vv=new ApiResponse();
        if(!$actionName){
            $vv->addError("Il faut spécifier un nom d'action");
        }
        pov()->events->dispatch(self::EVENT_ACTION,[$vv,$actionName]); //il faut gérer grace à l'event l'action d'enregistrement
        $vv->addToJson("\$_POST",$_POST);
        return View::get("json",$vv);
    }
    public function save_run(){
        $vv=new ApiResponse();
        pov()->events->dispatch(self::EVENT_SAVE,[$vv]); //il faut gérer grace à l'event l'action d'enregistrement
        $vv->addToJson("\$_POST",$_POST);
        return View::get("json",$vv);
    }
    public function delete_run(){
        $vv=new ApiResponse();
        pov()->events->dispatch(self::EVENT_DELETE,[$vv]); //il faut gérer grace à l'event l'action d'enregistrement
        $vv->addToJson("\$_POST",$_POST);
        return View::get("json",$vv);
    }
    public function create_run(){
        $vv=new ApiResponse();
        pov()->events->dispatch(self::EVENT_CREATE,[$vv]); //il faut gérer grace à l'event l'action d'enregistrement
        $vv->addToJson("\$_POST",$_POST);
        return View::get("json",$vv);
    }
    public function upload_run(){
        $vv=new ApiResponse();
        pov()->events->dispatch(self::EVENT_UPLOAD,[$vv]); //il faut gérer grace à l'event l'action d'enregistrement
        //$vv->addToJson("\$_POST",$_POST);
        $vv->addMessage("upload :)");
        return View::get("json",$vv);
    }
    public function getView_run(){
        $vv=new ApiResponse();
        $v=$vv->testAndGetRequest("viewPath");
        if($v){
            //extrait les paramètre ?machin=truc
            if(preg_match("/^(.*)\?(.*)$/",$v,$matches)){
                $vv->addToJson("m",$matches);
                parse_str($matches[2],$params);
                if($params){
                    $vv->addToJson("p",$params);
                    $vv->addToJson("v",$v);
                    foreach ($params as $k=>$v){
                        $_REQUEST[$k]=$v;
                    }
                }
                $_REQUEST['viewPath']=$v=$matches[1];
            }
        }

        $vv->addToJson("vvvv",$v);
        $vvArgument=the()->request("vv"); //pratique pour faire passer des params à la vue via javascript
        pov()->events->dispatch(self::EVENT_GET_VIEW,[$vv]); //permet de définir un comportement personnalisé au besoin
        if($vv->success && !$vv->html){
            $vv->setHtml($v,$vvArgument);
        }
        return View::get("json",$vv);
    }


    /**
     * Server Side Events
     * @param $sessionid
     * @see http://www.kevinchoppin.co.uk/blog/server-sent-events-in-php
     */
    public function sse_run($sessionid){
        pov()->disableLogging();
        set_time_limit( 0 );
        ini_set('auto_detect_line_endings', 1);
        ini_set('mysql.connect_timeout','7200');
        ini_set('max_execution_time', '0');

        @ob_end_clean();//notice si le flux est vide
        gc_enable();

        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Expose-Headers: X-Events');

        $c=1;
        ignore_user_abort(true);
        echo ":" . str_repeat(" ", 2048) . "\n"; // 2 kB padding for IE
        echo "retry: 2000\n";

        pov()->events->dispatch(self::EVENT_REQUEST_SSE_INIT,[]);

        $shouldRestart=false;
        $i=0;

        while( true){

            if( connection_status() != CONNECTION_NORMAL or connection_aborted() ) {
                break;
            }

            //vide les évènements
            ServerEvent::$toSend=[];

            //max time?
            if($shouldRestart){
                die();
            }
            if($i++>ServerEvent::$maxLoopIterations){
                new ServerEvent(
                    uniqid(),
                    ServerEvent::EVENT_DEBUG_LOG,
                    "Le server SSE va redémarrer proprement après ".date("H:i:s",the()->boot->getTime()/1000-3600)." d'exécution"
                );
                $shouldRestart=true;
            }

            //remplira éventuellement des évènements
            pov()->events->dispatch(self::EVENT_REQUEST_SSE_LOOP,[$sessionid]);
            if(ServerEvent::$toSend){
                foreach (ServerEvent::$toSend as $e){
                    echo "id: ".$e->id."\n";
                    //echo "event: ".$e->type."\n"; //on envoie pas d'event de cette manière afin de tout recevoir dans le js même si il n'y a pas de listener
                    echo "data: ".json_encode($e)."\n\n";
                }
            }

            /* Send output */
            if( @ob_get_level() > 0 ) for( $i=0; $i < @ob_get_level(); $i++ ) @ob_flush();
            @flush();

            /* wait */
            sleep( ServerEvent::$loopInterval );
            $c++;

            if( $c % 1000 == 0 ){/* I used this whilst streaming twitter data to try to reduce memory leaks */
                gc_collect_cycles();
                $c=1;
            }
        }

        if( @ob_get_level() > 0 ) {
            for( $i=0; $i < @ob_get_level(); $i++ ) @ob_flush();
            @ob_end_clean();
        }


    }


    /**
     * Pour obtenir l'url d'une image formatée à partir d'une image et d'une url d'image formattée qui servira d'exemple
     * @requestParam $imageUrl Url serveur de l'image à traiter
     * @requestParam $formatUrl Url url qui servira de template de formatage
     * @return View json qui contiendra result
     * @throws \Exception
     */
    public function getImageFormat_run(){
        $vv=new ApiResponse();
        $imageUrl=$vv->testAndGetRequest("imageUrl");
        $formatUrl=$vv->testAndGetRequest("formatUrl");
        $preserveGif=$vv->testAndGetRequest("preserveGif")==="true";
        if($vv->success){
            $img=ImgUrl::_fromUrl($formatUrl);
            $img->fromImage($imageUrl)->preserveGif($preserveGif);
            $vv->addToJson("imageUrl",$imageUrl);
            $vv->addToJson("formatUrl",$formatUrl);
            $vv->addToJson("result",$img->href());
        }
        return View::get("json",$vv);
    }
}