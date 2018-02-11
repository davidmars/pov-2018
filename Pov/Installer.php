<?php

namespace Pov;


class Installer
{
    public static function install(){
        $timestring=date("Y-m-d-H-h-s");
        //on crée un fichier ici pour tester
        file_put_contents("salut-$timestring.txt","tesssst\n$timestring\n".getcwd());

    }
}