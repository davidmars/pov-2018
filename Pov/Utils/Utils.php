<?php

namespace Pov\Utils;


use Pov\PovException;
use Pov\System\AbstractSingleton;

/**
 * Class Utils
 * @method static Utils inst()
 * @property StringUtils $string Pour jouer avec des chaines de caractères
 * @property IframeUtils $iFrame Pour jouer avec des iframes
 * @property HtmlUtils $html Pour jouer avec du html
 * @property ArrayUtils $array Pour jouer avec des arrays
 * @property PhpAnalyzer $phpAnalyzer Pour analyser des trucs en php (noms de classes, hierarchie, etc...)
 * @property DateUtils $date Pour jouer avec des dates
 * @property UrlUtils $url Pour jouer avec des urls
 * @property ColorUtils $color Pour jouer avec des couleurs
 * @property MathUtils $math Pour jouer avec des chiffres
 * @property FilesUtils $files Pour jouer avec des fichier et repertoires
 * @property CsvUtils $csv Pour jouer avec des fichier csv
 * @property LangUtils $lang Pour jouer avec les langues
 */
class Utils extends AbstractSingleton
{

    public function __get($property) {
        $val=self::storeGet($property);
        if($val){
            return $val;
        }else{
            switch ($property){
                case "string":
                        return StringUtils::inst();
                    break;
                case "html":
                        return HtmlUtils::inst();
                case "array":
                        return ArrayUtils::inst();
                    break;
                case "iFrame":
                        return IframeUtils::inst();
                    break;
                case "phpAnalyzer":
                        return PhpAnalyzer::inst();
                    break;
                case "date":
                        return DateUtils::inst();
                    break;
                case "url":
                        return UrlUtils::inst();
                    break;
                case "color":
                        return ColorUtils::inst();
                    break;
                case "math":
                        return MathUtils::inst();
                    break;
                case "files":
                        return FilesUtils::inst();
                case "csv":
                        return CsvUtils::inst();
                    break;
                case "lang":
                        return LangUtils::inst();
                    break;
            }
        }
        throw new PovException("Propriété '$property' non prise en charge dans ".__CLASS__);

    }




}