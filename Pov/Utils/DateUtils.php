<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 14/09/2017
 * Time: 18:12
 */

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Class DateUtils permet de manipuler des dates
 * @package Pov\Utils
 */
class DateUtils extends AbstractSingleton
{
    /**
     * @param string $dateString une date en texte compréhensible par strtotime
     * @param string $format "Y m d H:i:s" par exemple
     * @link http://php.net/manual/en/function.date.php
     * @link http://php.net/manual/en/function.strtotime.php
     * @return false|string
     */
    public function formatFromString($dateString, $format){
        return date("Y m d H:i:s",strtotime($dateString));
    }

    /**
     * @return int Le timestamp présent
     */
    public function timestamp(){
        $d=new \DateTime();
        return $d->getTimestamp();
    }

    /**
     * Renvoie le temps courrant au format Y-m-d H:i:s
     * @return false|string
     */
    public function nowMysql()
    {
        return date("Y-m-d H:i:s");
    }

    /**
     * Formate la date dasn la langue spécifiée
     * @param \DateTime $dateTime
     * @param string $format something like "l d M Y" to get something like lundi 31 décembre 2014
     * @return string
     */
    public function formatLocale($dateTime, $format, $langCode="fr_FR"){
        if(!is_a($dateTime,"DateTime")){
            return $format;
        }
        $ts=$dateTime->getTimestamp();
        setlocale(LC_TIME, "$langCode.UTF-8");
        return strftime($this->dateFormatToStrftime($format),$dateTime->getTimestamp());
    }

    /**
     * Convert a classic date format expression in strftime format
     * @param string $dateFormat Something like
     * @return string
     */
    private function dateFormatToStrftime($dateFormat) {

        $caracs = [
            // Day - no strf eq : S
            'd' => '%d', 'D' => '%a', 'j' => '%e', 'l' => '%A', 'N' => '%u', 'w' => '%w', 'z' => '%j',
            // Week - no date eq : %U, %W
            'W' => '%V',
            // Month - no strf eq : n, t
            'F' => '%B', 'm' => '%m', 'M' => '%b',
            // Year - no strf eq : L; no date eq : %C, %g
            'o' => '%G', 'Y' => '%Y', 'y' => '%y',
            // Time - no strf eq : B, G, u; no date eq : %r, %R, %T, %X
            'a' => '%P', 'A' => '%p', 'g' => '%l', 'h' => '%I', 'H' => '%H', 'i' => '%M', 's' => '%S',
            // Timezone - no strf eq : e, I, P, Z
            'O' => '%z', 'T' => '%Z',
            // Full Date / Time - no strf eq : c, r; no date eq : %c, %D, %F, %x
            'U' => '%s'
        ];

        return strtr((string)$dateFormat, $caracs);
    }

    /**
     * Teste si la date donnée est passée
     * @param \DateTime $dateTime
     * @return bool
     */
    public function isPast($dateTime){
        $d=new \DateTime();
        if($d->getTimestamp()>$dateTime->getTimestamp()){
            return true;
        }
    }
}