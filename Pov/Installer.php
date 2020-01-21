<?php

namespace Pov;


use Pov\Utils\ColorUtils;
use Pov\Utils\StringUtils;
use Intervention\Image\ImageManagerStatic as Image;

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
        //crée favicon.ico à la racine (random)
        if(!file_exists("favicon.ico")){
            $color1=ColorUtils::inst()->randHex(1,0.3,rand(0,99999));
            define("ccc",ColorUtils::inst()->randHex(1,0.6,rand(0,99999)));
            // create empty canvas with background color
            $img = Image::canvas(16, 16, "$color1");
            for($i=0;$i<16;$i+=2){
                $img->line($i, 0, $i, 16, function (
                    $draw) {
                    $draw->color("#".ccc);
                    }
                );
            }
            $img->save("favicon.png");
            rename("favicon.png","favicon.ico");
        }
        //copie le fichier index.php à la racine
        if(!file_exists("index.php")){
            copy(__DIR__."/../_install/index.php","index.php");
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