<?php


namespace Pov\System;




class Header {

    const ERR_404="404";
    const REDIRECT_301="301";
    const REDIRECT_302="302";

    const JSON="json";
    const JAVASCRIPT="js";
    const JS="js";
    const CSS="css";
    const XML="xml";
    const TXT="txt";
    const TEXT_STREAM = "txt_stream";


    /**
     * @var string The code related to this header
     */
    public $code="";
    /**
     * @var string the url where to redirectUrl.
     */
    public $redirectUrl="";




    /**
     * performs the header if $code is defined...so it will be run from a Controler...okay?
     */
    public function run(){

        $this->addHeader("x-pov-execution-time",the()->boot->getTime()."ms");


        switch($this->code){

            case self::REDIRECT_301;
                self::redirect($this->redirectUrl,  301);
                //die("301 redirectUrl There is a better URL : ".$this->redirectUrl);
                break;
            case self::REDIRECT_302;
                self::redirect($this->redirectUrl,  302);
                //die("302 redirectUrl There is a better URL : ".$this->redirectUrl);
                break;

            case self::ERR_404;
                $this->addHeader("HTTP/1.0 404 Not Found","");
                $this->addHeader("Status","404 Not Found");
                break;

            case self::JSON;
                $this->addHeader("Content-type","application/json");
                break;

            case self::JAVASCRIPT;
                $this->addHeader("Content-type","text/javascript");
                break;

            case self::XML;
                $this->addHeader("Content-type","text/xml charset=UTF-8");
                break;
            case self::CSS;
                $this->addHeader("Content-type","text/css charset=UTF-8");
                break;

            case self::TXT;
                $this->addHeader("Content-type","text/plain charset=UTF-8");
                break;

            case self::TEXT_STREAM;
                $this->addHeader("Content-type","text/event-stream");
                $this->addHeader("Cache-Control","no-cache");
                break;


            default:

        }

        foreach ($this->headers as $k=>$v){
            if($v){
                header("$k: $v");
            }else{
                header("$k"); //HTTP/1.0 404 Not Found n'a pas de valeur par exemple
            }

        }

    }











    /**
     * performs a redirection with header 301.
     * Private because you don't want to perform header in a wrong place...isn't it?
     */
    private static function redirect( $url , $code = 301 ) {
        self::code( $code );
        //echo "redirectUrl ".$url;
        //die();
        header("Location: $url");
        die();
        //header("Content-type: text/plain; charset=UTF-8");

    }
    /**
     * Process an http header
     * @param int $code Code to return
     */
    private static function code( $code ) {
        header("HTTP/1.0 $code ".self::$httpCodes[$code]);
        header("Status: $code ".self::$httpCodes[$code]);
    }
    /**
     *
     * @staticvar array Tableau de correspondance entre codes HTTP et messages
     */
    static $httpCodes = [
        404 => "Not Found",
        301 => "Moved Permanently",
        302 => "Moved Temporarily",
        304 => "Not Modified",
        403 => "Forbidden"
    ];

    /**
     * Definit une redirection
     * @param string       $redirectUrl
     * @param string $code
     */
    public function setRedirect($redirectUrl,$code="302")
    {
        $this->redirectUrl=$redirectUrl;
        $this->code=Header::REDIRECT_302;

    }

    /**
     * @param string $reason Raison de la 404 renvoyée
     */
    public function set404($reason){
        pov()->log->error("set 404",[$reason]);
        $this->code=self::ERR_404;
    }

    /**
     * dit qu'il faudra rafraichir la page
     */
    public function refresh()
    {
        $this->addHeader("Refresh","0");
    }

    /**
     * Autorise les cross origin (pour charger en ajax depuis un autre serveur par exemple)
     * @param string $orgin
     * @see https://fr.wikipedia.org/wiki/Cross-origin_resource_sharing
     */
    public function enableCORS($orgin="*")
    {
        $this->addHeader("Access-Control-Allow-Origin",$orgin);
        $this->addHeader("Access-Control-Expose-Headers","*");
        $this->addHeader("Access-Control-Allow-Headers","*");
        $this->addHeader("Access-Control-Allow-Methods","*");
    }
    private $headers=[];

    /**
     * Ajoute un header
     * @param string $key exemple  Access-Control-Allow-Origin
     * @param string $value exemple *.mon-site.com
     */
    public function addHeader($key,$value){
        $key=trim($key);
        $value=trim($value);
        $this->headers[$key]=$value;
    }






    /**
     * L'output sera du XML
     */
    public function contentTypeXml()
    {
        $this->code=self::XML;
    }

    /**
     * L'output sera du Texte
     */
    public function contentTypeTxt()
    {
        $this->code=self::TXT;
    }
    /**
     * L'output sera du Texte
     */
    public function contentTypeTxtStream()
    {
        $this->code=self::TEXT_STREAM;
    }
    /**
     * L'output sera du Javascript
     */
    public function contentTypeJavascript()
    {
        $this->code=self::JAVASCRIPT;
    }
    /**
     * L'output sera du Json
     */
    public function contentTypeJson()
    {
        $this->code=self::JSON;
    }
    /**
     * L'output sera du Css
     */
    public function contentTypeCss()
    {
        $this->code=self::CSS;
    }


} 