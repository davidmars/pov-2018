<?php


namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Pour jouer avec des urls
 * @package Pov\Utils
 * @method static AbstractSingleton inst()
 */
class UrlUtils extends  AbstractSingleton
{
    /**
     * Supprime le protocole d'une url
     * @param string $url Un turc du genre "https://mon-site.com/etc"
     * @return string Un turc du genre "mon-site.com/etc"
     */
    public function removeProtocol($url){
        $disallowed = ['http://', 'https://',"//","ftp://"];
        foreach($disallowed as $d) {
            if(strpos($url, $d) === 0) {
                return str_replace($d, '', $url);
            }
        }
        return $url;
    }

    /**
     * Remplace http: par https: dans l'url fournie
     * @param string $url
     * @return string
     */
    public function toHttps($url){
        return preg_replace("/^http:/","https:",$url);
    }
}