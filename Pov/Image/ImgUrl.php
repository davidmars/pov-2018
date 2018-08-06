<?php

namespace Pov\Image;
use Pov\Html\Trace\HtmlTag;
use Pov\PovException;

/**
 * La classe ImgUrl permet de construire des urls d'images modifiées.
 *
 * @property string $_source private
 *
 * @package Image
 *
 */
class ImgUrl
{

    /**
     * Méthode statique pour obtenir une nouvelle Image
     * @param null|string $src url de l'image à traiter
     * @return ImgUrl
     */
    public static function inst($src=null){
        $i= new ImgUrl();
        if($src){
            return $i->fromImage($src);
        }
        return $i;
    }

    /**
     * @var string url locale de l'image
     */
    public $_source="empty";
    /**
     * @private
     * @var int
     */
    public $_width="0";
    /**
     * @var int
     */
    public $_height="0";
    /**
     * @var string Couleur hexadecimale de l'image
     */
    public $_bgColor="FF0000";
    /**
     * @var
     */
    public $_sizeMode="nochange";
    /**
     * @var string
     */
    public $_extension="jpg";
    /**
     * @var string
     */
    public $_quality="80";
    /**
     * @var bool si true et que l'image est un gif, renverra le gif
     */
    protected $_preserveGif=false;



    /**
     * @param $url
     * @return $this
     */
    public function fromImage($url){
        $this->_source=$url;
        return $this;
    }

    /**
     * Revoie une image aux dimensions données.
     * L'image d'origine sera redimentionnée pour couvrir la zone
     * @param int $width Largeur de l'image
     * @param int $height Hauteur de l'image
     * @return $this
     * @throws PovException
     */
    public function sizeCover($width,$height,$position="center"){
        $this->_width=$width;
        $this->_height=$height;

        if(isset(self::POSITIONS[$position])){
            $short=self::POSITIONS[$position];
        }else{
            throw new PovException("Position invalide dans sizeCover ($position) utilisez center, top-left, left, right, bottom-right etc...");
        }

        $this->_sizeMode="cover.".$short;
        return $this;
    }

    const POSITIONS=[
      "top-left"=>"tl",
      "top"=>"tl",
      "top-right"=>"tl",
      "bottom-left"=>"bl",
      "bottom"=>"b",
      "bottom-right"=>"br",
      "left"=>"l",
      "right"=>"r",
      "center"=>"c"
    ];

    /**
     * Revoie une image aux dimensions données.
     * L'image d'origine sera redimentionnée pour rentrer dans la zone
     * Cette image aura un fond (défini par background)
     * @param int $width Largeur de l'image
     * @param int $height Hauteur de l'image
     * @param null|string $backgroundColor
     * @return $this
     */
    public function sizeContain($width,$height,$backgroundColor=null){
        $this->_width=$width;
        $this->_height=$height;
        if($backgroundColor){
            $this->_bgColor=$backgroundColor;
        }
        $this->_sizeMode="contain";
        return $this;
    }
    /**
     * Resize l'image proportionellement pour qu'elle rentre le cadre défini par $width et $height
     * @param int $height Hauteur max de l'image
     * @param int $width Largeur max de l'image
     * @return $this
     */
    public function sizeMax($width,$height){
        $this->_width=$width;
        $this->_height=$height;
        $this->_sizeMode="max";
        return $this;
    }
    /**
     * Resize l'image proportionellement en fonction de sa largeur
     * @param int $height Hauteur de l'image
     * @return $this
     */
    public function width($width){
        $this->_width=$width;
        $this->_height=0;
        $this->_sizeMode="width";
        return $this;
    }

    /**
     * Resize l'image proportionellement en fonction de sa hauteur
     * @param int $height Hauteur de l'image
     * @return $this
     */
    public function height($height){
        $this->_height=$height;
        $this->_width=0;
        $this->_sizeMode="height";
        return $this;
    }

    public function bgColor($color="FF0000"){
        $color=trim($color,"#");
        if(!$color){
            $color="transparent";
        }
        $this->_bgColor=$color;
        return $this;
    }
    public function jpg($quality=80){
        $this->_extension="jpg";
        $this->_quality=$quality;
        return $this;
    }
    public function png(){
        $this->_extension="png";
        return $this;
    }
    public function gif(){
        $this->_extension="gif";
        return $this;
    }



    /**
     * A partir d'une url (générée par ImgUrl) renvoie un objet ImageUrl
     * @param string $url
     * @return ImgUrl|null
     */
    public static function _fromUrl($url)
    {
        $reg="@^(.*)/([a-z.]+)-([0-9]+)-([0-9]+)/([abcdefABCDEF0-9|transparent]{6,})-([0-9]+)\.([png|jpg|gif]+)$@";
        if(preg_match($reg,$url,$params)){
            $image=new ImgUrl();
            $image->_source=$params[1];
            $image->_sizeMode=$params[2];
            $image->_width=$params[3];
            $image->_height=$params[4];
            $image->_bgColor=$params[5];
            $image->_quality=$params[6];
            $image->_extension=$params[7];
            return $image;
        }
        return null;
    }

    /**
     * Pour obtenir l'url finale de l'image
     * @param bool $absolute Mettre true pour avoir une url absolue
     * @return string pour obtenir l'url finale de l'image
     */
    public function href($absolute=false){
        if($this->_preserveGif && $this->isGif()){
            $r= the()->fmkHttpRoot."/".$this->__toString();
        }else{
            $r= the()->fmkHttpRoot."/".the()->fileSystem->cachePath."/".$this->__toString();
        }
        if($absolute){
            return the()->requestUrl->httpScheme."://".the()->requestUrl->host.$r;
        }else{
            return $r;
        }

    }

    /**
     * @return bool true si c'est un gif
     */
    public function isGif(){
        if($this->_source){
            if(is_file($this->_source)){
                if(preg_match("@image/gif@",mime_content_type($this->_source),$m)){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Dit que si l'image est un gif alors on ne fait pas de changement
     * @param bool $preserve
     * @return $this
     */
    public function preserveGif($preserve=true)
    {
        $this->_preserveGif=$preserve;
        return $this;
    }

    /**
     * @return string L'url construite à partir des paramètres de l'image
     */
    public function __toString()
    {

        //$urls=[the()->fileSystem->cachePath];
        $urls[]="im";
        $urls[]=$this->_source ? $this->_source:"empty";
        $urls[]=$this->_sizeMode."-".$this->_width."-".$this->_height;
        $urls[]=$this->_bgColor."-".$this->_quality.".".$this->_extension;
        if($this->_preserveGif && $this->isGif()){
            return $this->_source;
        }
        return implode("/",$urls);
    }
}