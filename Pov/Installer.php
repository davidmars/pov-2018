<?php

namespace Pov;


class Installer
{
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


    }
}