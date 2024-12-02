<?php

namespace Pov\Image;
use Pov\Html\Trace\Attributes;
use Pov\Html\Trace\HtmlTag;
use Pov\PovException;

/**
 * La classe ImgUrlHtml permet de construire des urls d'images modifiées et de les utiliser comme tag html.
 *
 * @property string $_source private
 *
 * @package Image
 *
 */
class ImgUrlHtml extends ImgUrl
{
    /**
     * @var Attributes
     */
    protected $_attr;

    /**
     * Méthode statique pour obtenir une nouvelle Image
     * @param null|string $src url de l'image à traiter
     * @return ImgUrlHtml
     */
    public static function inst($src=null){
        $i= new ImgUrlHtml();
        if($src){
            return $i->fromImage($src);
        }
        return $i;
    }

    /**
     * Retounre l'image sous forme de tag html IMG
     * @return HtmlTag
     */
    public function htmlTag($class="",$alt="",$lazyLoading=false,$width="",$height=""){
        $tag=new HtmlTag("img");
        if($lazyLoading){
            $this->attr()["data-src"]=$this->href();
            $class.=" lazyload";
        }else{
            $this->attr()["src"]=$this->href();
        }

        $this->attr()["alt"]=$alt;
        $tag->setAttributes($this->attr());
        if($width){
            $tag->attr()["width"]=$width;
        }
        if($height){
            $tag->attr()["height"]=$height;
        }
        $tag->addClass($class);
        if( ($this->isEmpty()) && !$this->displayIfEmpty){
            return new HtmlTag("","empty image");
        }
        return $tag;

    }

    /**
     * Les attributs
     * @return \Pov\Html\Trace\Attributes
     */
    public function attr(){
        if(!$this->_attr){
            $this->_attr=new Attributes();
        }
        return $this->_attr;
    }

    private $displayIfEmpty=false;
    /**
     * Permet d'afficher une image vide même si l'image n'est pas définie
     * @param bool $display si true affichera une image vide si l'image n'est pas définie, si false ne renverra rien
     * @return $this
     */
    public function displayIfEmpty($display=false)
    {
        $this->displayIfEmpty=$display;
        return $this;
    }

    /**
     * @return bool true si l'image src est vide ou non définie
     */
    private function isEmpty()
    {
        return !$this->_source || $this->_source=="empty";
    }




}