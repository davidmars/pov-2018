<?php

namespace Pov;


class Installer
{
    public static function install(){



        $timestring=date("Y-m-d-H-h-s");

        //on crée un fichier ici pour tester
        file_put_contents("install-test1-$timestring.txt","tesssst\n$timestring\n".getcwd());

        //on est sensé être dans vendor/davidmars/pov-2018/Pov/Installer.php
        $root=__DIR__."/../../..";
        //on crée un fichier à la racine pour tester
        file_put_contents("$root/install-test1-root-$timestring.txt","$root\ntesssst\n$timestring");

    }
}