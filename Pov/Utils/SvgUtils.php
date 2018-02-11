<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 24/11/2017
 * Time: 06:36
 */

namespace Pov\Utils;


use Pov\Html\Trace\HtmlTag;
use Pov\System\AbstractSingleton;

/**
 * Class SvgUtils
 * @package Pov\Utils
 *
 * @method static SvgUtils inst()
 *
 */
class SvgUtils extends AbstractSingleton
{
    /**
     * Renvoie un tage svg use
     * @param string $svgId identifiant de symbole svg
     * @param bool|string $addClass classes à ajouter au tag SVG
     * @return HtmlTag
     */
    public function use($svgId,$addClass=true){
        $svgId=trim($svgId);
        $tag=new HtmlTag("svg");
        if(!preg_match("/#/",$svgId)){
            $svgId="#$svgId";
        }

        $class="svg svg-".preg_replace("/#(.*)/","$1",$svgId);
        if($addClass){
            $tag->addClass($class);
        }
        $use="<use class=\"$class\" xlink:href=\"$svgId\"></use>";
        $tag->setInnerHTML($use);
        return $tag;
    }

    /**
     * Renvoie un tag DIV qui contient le code svg du fichier
     * @param string $svgFile Url du fichier SVG
     * @return HtmlTag Un tag DIV qui contient le code svg
     */
    public function import($svgFile){
        $content=the()->fileSystem->fileGetContents($svgFile);
        $tag=new HtmlTag("div",$content);
        return $tag;

    }
    /**
     * Renvoie un tag DIV qui contient le code svg des fichiers svg dans le répertoire donné
     * @param string $svgDir Url du répertoire qui contient les SVG
     * @return HtmlTag Un tag DIV
     */
    public function importMultiple($svgDir){
        $svgDir=trim($svgDir,"/")."/";
        $content="";
        foreach (glob($svgDir."*.svg") as $f){
            $content.="<!-- ".basename($f)." -->";
             $content.=the()->fileSystem->fileGetContents("$f");
        }
        $tag=new HtmlTag("div",$content);
        $tag->addClass("svg-assets");
        return $tag;

    }


    public function useHttp($svgUrl,$addClass=true)
    {
        $tag=new HtmlTag("svg");

        $class="svg svg-".preg_replace("/#(.*)/","$1",$svgUrl);
        if($addClass){
            $tag->addClass($class);
        }
        $use="<use class=\"$class\" xlink:href=\"$svgUrl\"></use>";
        $tag->setInnerHTML($use);
        return $tag;
    }


}