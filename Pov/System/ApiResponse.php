<?php


namespace Pov\System;

use Pov\MVC\View;

/**
 * Une classe de base pour gérer les réponses d'API
 *
 * @package Pov\System
 */
class ApiResponse {

    /**
     * @var array Les éventuels messages d'erreur
     */
    public $errors=[];
    /**
     * @var array Des éventuels messages
     */
    public $messages=[];

    /**
     * @var array des logs
     */
    public $logs=[];

    /**
     * @var bool Sera flase si il y a eu des erreurs
     */
    public $success=true;

    /**
     * @var String Un eventuel retour html
     */
    public $html;
    /**
     * @var \DateTime
     */
    public $when;

    private $_usePayload=false;
    /**
     * Soit $_REQUEST soit le payload
     * @var array
     */
    public $requestData=[];

    public function __construct(){
        $this->when=new \DateTime();
        $this->requestData=$_REQUEST;
    }


    //----------------------errors--------------------------------

    /**
     * Y a il des erreurs
     * @return bool
     */
    public function hasErrors(){
        if(count($this->errors)>0){
            return true;
        }
        return false;
    }
    /**
     * Ajoute un message d'erreur et place succes sur false
     * @param string $message
     */
    public function addError($message){
        $this->errors[]=$message;
        $this->success=false;
    }

    //-----------------messages--------------------------------

    /**
     * Ajoute un message
     * @param string $message The message to add
     */
    public function addMessage($message){
        $this->messages[]=$message;
        $this->messages=array_unique($this->messages);
    }



    /**
     * Methode rapide pour renvoyer du code html
     * @param string $v chemin vers la vue
     * @param mixed $vv variables de la vue
     */
    public function setHtml($v,$vv){
        if(!View::isValid($v)){
            $this->addError("$v is not a valid view");
        }else{
            $view=new View($v,$vv);
            $this->html=$view->render();
        }
    }

    /**
     * @var mixed L'objet json
     */
    public $json=[];

    /**
     * Define the json object
     * @param mixed $object
     */
    public function setJson($object){
        $this->json=$object;
    }

    /**
     * Quand défini sur true dit que la source de données n'est plus REQUEST mais le fileinput json
     * Ce mode est à utiliser avec les requeêtes POST de axios par exemple
     * @param bool $use
     */
    public function usePayload($use=true){
        $this->_usePayload=$use;
        $request_body = file_get_contents('php://input');
        if($request_body){
            $this->requestData= utils()->array->fromObject(json_decode($request_body));
        }
    }




    /**
     * Test if the given parameters are set in the $_REQUEST. If not add errors to the object.
     * @param array $requestParameters Coma separated $_REQUEST parameters to test. Something like "myfield1,myfield2,etc"
     */
    public function testMandatoryRequest($requestParameters){
        foreach($requestParameters as $p){
            if(!isset($this->requestData[$p])){
                $this->addError("The \$_REQUEST[$p] parameter is mandatory");
            }
        }
    }

    /**
     * Renvoie un paramètre que l'on peut trouver dans $_REQUEST
     * @param string $queryParam Le paramètre Get ou Post
     * @param mixed   $ifNull La valeur à renvoyer si null ou indéfini
     * @return string|array|null
     */
    public function getRequest($queryParam,$ifNull=null)
    {
        if(isset($this->requestData[$queryParam])){
            if(is_array($ifNull)){
                $checked = $_REQUEST[$queryParam];
                $ret=[];
                for($i=0; $i < count($checked); $i++){
                    $ret[]=$checked[$i];
                }
                return $ret;
            }
            return $this->requestData[$queryParam];
        }
        return $ifNull;
    }

    /**
     * Test if the given parameter is set and returns it.
     * If the provided parameter doesn't exist add an error to the object
     * @param string $requestParameter the $_REQUEST[something] to test and get
     * @param string $errorMessageIfNotSet error message to push if not set. If not defined a deffault error message will be displayed.
     * @param bool $errorIfEmpty set it to true to display error on empty fields
     * @return null|mixed
     */
    public function testAndGetRequest($requestParameter,$errorMessageIfNotSet=null,$errorIfEmpty=false){

        $isDefined=isset($this->requestData[$requestParameter]);
        $isEmpty=false;
        if($isDefined){
            if(is_string($this->requestData[$requestParameter]) && trim($this->requestData[$requestParameter])==""){
                $isEmpty=true;
            }
        }
        if(!$isDefined || ($isEmpty && $errorIfEmpty)){
            if($errorMessageIfNotSet){
                $this->addError($errorMessageIfNotSet);
            }else{
                $this->addError("The \$_REQUEST[$requestParameter] parameter is mandatory");
            }
            return null;
        }else{
            return $this->requestData[$requestParameter];
        }
    }


    /**
     * Add stuff to the json
     * @param string $variableName
     * @param mixed $value
     * @return ApiResponse The self object
     */
    public function addToJson($variableName, $value){
        $this->json[$variableName]=$value;
        return $this;
    }

    /**
     * Test if the human is connected, if not add an error message.
     * @return bool true if the human is connected
     */
    public function checkLoggedIn(){
        if(!the()->human->isLoggedIn){
            $this->addError("Human not logged in");
            return false;
        }else{
            return true;
        }
    }
    /**
     * Test if the human is an admin, if not add an error message.
     * @return bool true if the human is an admin
     */
    public function checkLoggedInAdmin(){
        if(!the()->human->isAdmin){
            $this->addError("Human not admin");
            return false;
        }else{
            return true;
        }
    }
    /**
     * Test if the human is a developer, if not add an error message.
     * @return bool true if the human is a developer
     */
    public function checkLoggedInDev(){
        if(!the()->human->isDev()){
            $this->addError("Human not a developer");
            return false;
        }else{
            return true;
        }
    }

}