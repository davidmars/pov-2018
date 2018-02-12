<?php

namespace Pov;


use Pov\Utils\StringUtils;

class Installer
{
    /**
     * Installe ce qu'il faut pour que le FMK fonctionne, à savoir principalement un fichier index.php et un fichier .htaccess.
     * Si les fichiers existent déjà, ils ne sont pas écrasés.
     */
    public static function install(){

        //copier le .htaccess à la racine
        if(!file_exists(".htaccess")){
            copy(__DIR__."/../_install/.htaccess",".htaccess");
        }
        //copie le fichier index.php à la racine
        if(!file_exists("index.php")){
            copy(__DIR__."/../_install/index.php","index.php");
        }
        //crée le répertoire/fichier configs/routes/127.0.0.1/mon-projet.php
        if(!is_dir("configs/routes/127.0.0.1")){
            mkdir("configs/routes/127.0.0.1",0777,true);
        }
        if(!is_dir("files")){
            mkdir("files");
        }
        //génère mot de passe pour se connecter sur  /dev
        if(!is_file("configs/dev-password.php")){
            $pwd=StringUtils::inst()->random(10);
            file_put_contents("configs/dev-password.php","<?php\n \$pwd='$pwd';");
        }


    }
}