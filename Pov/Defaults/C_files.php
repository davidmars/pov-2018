<?php

namespace Pov\Defaults;

use Intervention\Image\ImageManagerStatic as Image;
use Pov\Image\ImgUrl;
use Pov\MVC\Controller;

/**
 * Controleur pour les urls dynamiques sous /files
 *
 * @package Pov\Defaults
 */
class C_files extends Controller
{
    /**
     * Installe les routes
     */
    public static function install()
    {
        //génération d'images + cache
        // files/mon-projet/cache/im/mon-image-a/generer/avec-des-parametres.jpg => imageCacheOutput( files/mon-projet/cache/im , mon-image-a/generer/avec-des-parametres.jpg )
        the()->project->routesPush(
            "^.*/(files/.*/cache/im)/(.+)$",
            "files/imageGenerateCacheAndOutput/($1)/($2)"
        );
    }

    /**
     * Génère une image pour la première fois (après on ne devra plus passer par là car l'image sera créée en cache)
     * @param string $saveDirectory
     * @param string $url
     */
    public function imageGenerateCacheAndOutput_run($saveDirectory,$url){

        $errors=[];


        $imageUrl=ImgUrl::_fromUrl($url);



        if($imageUrl){

            if($imageUrl->_source && !is_file($imageUrl->_source)){
                $imageUrl->_source="empty";
            }

            //die("$url<br>$savePath");
            $savePath=$saveDirectory."/".trim($url,"/");

            //prepare le répertoire de l'image qu'on va créer
            the()->fileSystem->prepareDir($savePath);




            if($imageUrl->_source=="empty"){
                if($imageUrl->_height==0){
                    $imageUrl->_height=$imageUrl->_width;
                }
                if($imageUrl->_width==0){
                    $imageUrl->_width=$imageUrl->_height;
                }
                $img =Image::canvas($imageUrl->_width,$imageUrl->_height, '#'.$imageUrl->_bgColor);
            }else{
                try{
                    $img = Image::make($imageUrl->_source)->orientate();
                }catch (\Exception $e){
                    $img =Image::canvas($imageUrl->_width,$imageUrl->_height, '#'.$imageUrl->_bgColor);
                    $errors[]="image introuvable ".$imageUrl->_source;
                }
            }




            $sizeMode=$imageUrl->_sizeMode;

            switch (true){

                case $sizeMode==="nochange":
                    break;

                case preg_match("/cover\.([a-z]+)/",$sizeMode,$match):
                    //@see http://image.intervention.io/api/fit
                    $position=$match[1];
                    $flip=array_flip(ImgUrl::POSITIONS);
                    if(isset($flip[$position])){
                        $position=$flip[$position];
                    }else{
                        $position="center";
                    }
                    $img->fit($imageUrl->_width,$imageUrl->_height,
                        function($constraint){
                            /** @var \Intervention\Image\Constraint $constraint */
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        },$position);
                    break;

                case $sizeMode==="contain":
                    if($imageUrl->_bgColor=="transparent"){
                        $bg=null;
                    }else{
                        $bg="#".$imageUrl->_bgColor;
                    }
                    $canvas = Image::canvas($imageUrl->_width,$imageUrl->_height,$bg);
                    $img->resize($imageUrl->_width,$imageUrl->_height, function($constraint){
                        /** @var \Intervention\Image\Constraint $constraint */
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                    $canvas->insert($img, 'center');
                    $img=$canvas;
                    break;

                case $sizeMode==="max":
                    $img->resize($imageUrl->_width,$imageUrl->_height,function($constraint){
                        /** @var \Intervention\Image\Constraint $constraint */
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                    break;

                case $sizeMode==="width":
                    $img->widen($imageUrl->_width,function($constraint){
                        /** @var \Intervention\Image\Constraint $constraint */
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                    break;

                case $sizeMode==="height":
                    $img->heighten($imageUrl->_height,function($constraint){
                        /** @var \Intervention\Image\Constraint $constraint */
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                    break;

                default:
                    die("sizeMode pas pris en charge ".$imageUrl->_sizeMode);


            }


            if(!$errors){
                //enregistre que si on n'a pas identifié d'erreur
                $img->save($savePath,$imageUrl->_quality);
                $img=Image::make($savePath);
            }
            echo $img->response();
            die();







        }else{
            die("oups");
        }
    }
}

ini_set('memory_limit', '1000000M');