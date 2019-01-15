<?php

namespace Pov\Utils;
use Pov\Html\Trace\HtmlTag;
use Pov\System\AbstractSingleton;
use Pov\System\Url;

/**
 * Quelques utilitaires autour des iframes
 *
 * @package Pov\Utils
 */
class IframeUtils extends AbstractSingleton {
    /**
     * To extract src attribute from an iframe string
     * @param string $iframeString
     * @param bool $returnInputuIfNoSrc set it to true to get the string unchanged if no src were found
     * @return string the iframe src if success. Empty string or input string if not (according params)
     */
    public function extractSrc($iframeString, $returnInputuIfNoSrc=false)
    {
        if(preg_match('/src="([^"]+)"/', $iframeString, $match)){
            return $match[1];
        }elseif($returnInputuIfNoSrc){
            return $iframeString;
        }else{
            return "";
        }

    }

    /**
     * Tente de retourner une url pour iframe youtube ou vimeo (à partir d'une url youtube ou vimeo)
     * @param string $url une url vimeo ou youtube
     * @return string
     */
    public function srcFromServiceUrl($url){
        $url=$this->srcFromYoutubeUrl($url);
        $url=$this->srcFromVimeoUrl($url);
        return $url;
    }

    /**
     * Tente de retourner une url pour iframe youtube (à partir d'une url youtube)
     * @param string $url
     * @return string
     */
    public function srcFromYoutubeUrl($url){
        if(preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i',$url,$m)){
            if(preg_match("#/embed/#",$url)){
                return $url; //already an embed, so do not erase possible previous formatting
            }
            return "//www.youtube.com/embed/".$m[1];
        }
        return $url;
    }

    /**
     * Tente de retourner une url pour iframe vimeo (à partir d'une url vimeo)
     * @param string $url
     * @return string
     */
    public function srcFromVimeoUrl($url){
        //vieux flash de l'époque
        if(preg_match('/vimeo\.com\/moogaloop\.swf\?clip_id=([0-9a-zA-Z]*)/i',$url,$m)){
            return "//player.vimeo.com/video/".$m[1];
        }
        //url vimeo
        if(preg_match('%vimeo\.com/([0-9]+)%i',$url,$m)){
            return "//player.vimeo.com/video/".$m[1];
        }
        //déjà un player src
        if(preg_match('%//player\.vimeo\.com/video/([0-9]+)%i',$url,$m)){
            return "//player.vimeo.com/video/".$m[1];
        }
        return $url;
    }

    /**
     * Renvoie une iframe à partir de sa src
     * @param string $src url de l'iframe
     * @return HtmlTag
     */
    public function fromSrc($src){
        $src=$this->extractSrc($src,true);
        $tag=new HtmlTag("iframe");

        if(!preg_match("@^/|http:/|https:/@",$src,$m)){
            $src="about:blank";
        }

        $tag->setAttribute("src",$src);

        $tag->setAttribute("width","100%");
        $tag->setAttribute("height","100%");

        $tag->setAttribute("webkitallowfullscreen","true");
        $tag->setAttribute("mozallowfullscreen","true");
        $tag->setAttribute("allowfullscreen","true");
        return $tag;
    }



    /**
     * Rajoute des paramètre à une url vimeo pour en modifier le comportement
     * @param string $src url d'un player vimeo
     * @param string $color
     * @param int $autoplay
     * @param int $loop
     * @param int $showTitle
     * @param int $showAuthor
     * @return string
     */
    public function vimeoSrcPlayerParams($src,$color="ff0000",$autoplay=0,$loop=0,$showTitle=0,$showAuthor=0,$showPortrait=0){
        if($this->isVimeoSrc($src)){

            $params=[
                "autoplay"=>$autoplay,
                "color"=>$color,
                "title"=>$showTitle,
                "byline"=>$showAuthor,
                "portrait"=>$showPortrait,
                "loop"=>$loop,
            ];
            $q=http_build_query($params);
            $query = parse_url($src, PHP_URL_QUERY);
            // Returns a string if the URL has parameters or NULL if not
            if ($query) {
                $src .= "&$q";
            } else {
                $src .= "?$q";
            }
            return $src;
        }
        return $src;
    }

    /**
     * True si $src est une url de player vimeo
     * @param $src
     * @return bool
     */
    public function isVimeoSrc($src){
        return $this->getIdVimeo($src)!=="";
    }

    /**
     * Tente de retoruner l'id vimeo
     * @param $src
     * @return string
     */
    public function getIdVimeo($src){
        $src=$this->srcFromServiceUrl($src);
        if(preg_match("%//player\.vimeo\.com/video/([0-9]+)%i",$src,$matches)){
            return $matches[1];
        }
        return "";
    }


    /**
     * Rajoute des paramètre à une url vimeo pour en modifier le comportement
     * @param string $src url d'un player youtube

     * @return string
     */
    public function youtubeSrcPlayerParams($src,$color="ff0000",$autoplay=0,$loop=0,$showTitle=0,$showAuthor=0,$showinfo=0,$controls=2,$mute=0){
        if($this->isYoutubeSrc($src)){

            $params=[
                "autoplay"=>$autoplay,
                "color"=>$color,
                "title"=>$showTitle,
                "byline"=>$showAuthor,
                "showinfo"=>$showinfo,
                "loop"=>$loop,
                "controls"=>$controls,
                "enablejsapi"=>1,
                "modestbranding"=>1,
                "mute"=>$mute,
                "rel"=>0,
            ];
            $q=http_build_query($params);
            $query = parse_url($src, PHP_URL_QUERY);
            // Returns a string if the URL has parameters or NULL if not
            if ($query) {
                $src .= "&$q";
            } else {
                $src .= "?$q";
            }
            return $src;
        }
        return $src;
    }

    /**
     * True si $src est une url de player youtube
     * @param $src
     * @return bool
     */
    public function isYoutubeSrc($src){
        return $this->getIdYoutube($src)!=="";
    }

    /**
     * Tente de retourner l'id youtube
     * @param $src
     * @return string
     */
    public function getIdYoutube($src){
        $src=$this->srcFromServiceUrl($src);
        if(preg_match("%//www\.youtube\.com/embed/([0-9a-zA-Z\-_]+)%i",$src,$matches)){
            return $matches[1];
        }
        return "";
    }

    /**
     * Détermine si l'iframe est rattachée à un service connu et le renvoie
     * seuls youtube et vimeo sont reconnus pour l'instant
     * @param string $src
     * @return string le nom du service (se référer aux constantes) ou une chaine vide
     */
    public function getService($src){
        //$src=$this->extractSrc($src,true);
        $src=$this->srcFromServiceUrl($src);
        if($this->isYoutubeSrc($src)){
            return YOUTUBE;
        }
        if($this->isVimeoSrc($src)){
            return VIMEO;
        }
        return "";
    }

    /**
     * @param $src
     * @return string
     */
    public function getServiceId($src){
        $id=$this->getIdVimeo($src);
        if($id){
            return $id;
        }
        $id=$this->getIdYoutube($src);
        if($id){
            return $id;
        }
        return "";
    }
}