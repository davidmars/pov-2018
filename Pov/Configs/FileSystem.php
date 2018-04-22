<?php

namespace Pov\Configs;
use Pov\PovException;

/**
 * La Class FileSystem gère proprement les fichiers d'un projet donné.
 *
 * @package Pov\Configs
 */
class FileSystem {
    /**
     * @var string le répertoire de base où sont stockés les fichiers de db, cache etc... (pour cette instance)
     */
    public $rootPath="";
    /**
     * @var string le répertoire du projet
     */
    public $projectPath="";
    /**
     * @var string Un répertoire où sont stockés des fichiers
     */
    public $dbPath="";
    /**
     * @var string Un répertoire temporaire
     */
    public $tmpPath="";
    /**
     * @var string le répertoire où sont stockés les fichiers uploadés par les utilisateurs
     */
    public $uploadsPath="";
    /**
     * @var string le répertoire où sont stockés les logs
     */
    public $logsPath="";
    /**
     * @var string le répertoire où sont stockés les fichiers générés
     */
    public $buildsPath="";
    /**
     * @var string le répertoire où sont stockés les fichiers en cache
     */
    public $cachePath="";

    /**
     * @param $rootPath
     */
    public function __construct($rootPath){
        if($rootPath){
            $this->setRootPath($rootPath);
        }
    }

    /**
     * @param string $localPath
     */
    public function setRootPath($localPath)
    {
        $localPath="files/".trim($localPath,"/");
        $this->rootPath = $localPath;
        $dirs=["tmp","trash","db","uploads","logs","builds","cache"];
        foreach($dirs as $subDir){
            $fullPath=$this->rootPath."/".$subDir;
            if(!is_dir($fullPath)){
                mkdir($fullPath,0777,true);
            }
        }
        $this->tmpPath=$this->rootPath."/tmp";
        $this->trash=$this->rootPath."/trash";
        $this->dbPath=$this->rootPath."/db";
        $this->uploadsPath=$this->rootPath."/uploads";
        $this->logsPath=$this->rootPath."/logs";
        $this->buildsPath=$this->rootPath."/builds";
        $this->cachePath=$this->rootPath."/cache";

    }


    /**
     * Retourne le chemin d'un fichier upload pour être affiché via http
     * @param string $filePath
     * @return string
     */
    public function uploadHttpPath($filePath)
    {
        return the()->fmkHttpRoot."/".$this->uploadLocalPath($filePath);
    }
    /**
     * Retourne le chemin d'un fichier upload en sytème local
     * @param string $filePath
     * @return string
     */
    public function uploadLocalPath($filePath)
    {
        $filePath=trim($filePath,"/");
        return $this->uploadsPath."/$filePath";
    }

    /**
     * Identique à file_put_contents mais crée les sous répertoires si nécessaire
     *
     * @param string $filePath
     * @param string $content
     *
     * @return bool|int
     */
    public function filePutContents($filePath, $content)
    {
        $this->prepareDir($filePath);
        return file_put_contents($filePath,$content);
    }

    /**
     * Crée le répertoire (récursivement) d'un fichier donné
     * @param string $filePath Chemin vers le fichier
     */
    public function prepareDir($filePath){
        $dir=dirname($filePath);
        if(!is_dir($dir)){
            mkdir($dir,0777,true);
        }
    }

    /**
     * @return string chemin vers le fichier de logs courrant (car il y en a un par jour)
     */
    public function logFilepath(){
        return $this->logsPath."/".date("Y-m-d").".monolog.log";
    }
    /**
     * @return string[] chemins vers Tous les fichiers de log
     */
    public function logFilesList()
    {
        return array_reverse(glob($this->logsPath."/*.monolog.log"));
    }

    /**
     * Efface le fichier en s'assurant avant tout chose qu'il est situé dans le répertoire rootPath
     * @param string $fileToDelete
     * @param bool $checkInProjectDir
     * @throws PovException
     */
    public function delete($fileToDelete,$checkInProjectDir=true)
    {
        if(!$checkInProjectDir || preg_match("@^".$this->rootPath."@",$fileToDelete)){
            if(file_exists($fileToDelete)){
                unlink($fileToDelete);
            }
        }else{
            $m="On ne peut pas effacer ce fichier ($fileToDelete) il n'est pas dans $this->rootPath";
            pov()->log->warning($m,[]);
            throw new PovException($m);
        }
    }

    /**
     * Supprime du chemin la partie qui concerne le serveur apache
     * @param string $filePath exemple monserveur/virtual-host/mon-repertoire/monfichier.ext
     * @return string exemple mon-repertoire/monfichier.ext
     */
    public function pathWithoutRootDir($filePath)
    {
        return str_replace(realpath(".")."/","",$filePath);
    }

    /**
     * Retourne un identifiant de base de données sqLite (utilisable par redbean).
     * Attention ceci ne crée par la base de données, ça donne simplement un chemin logique.
     * @param string $databaseName Le nom de la base de données
     * @return string l'identifiant qui ressemblera à sqlite:files/my-project-dir/db/$databaseName.db
     */
    public function dbSqlLitePath($databaseName,$backupSuffix=null)
    {
        if($backupSuffix===null){
            $backupSuffix="bcp-".date("Y-m-d");
        }
        $dbFile=$this->dbPath."/$databaseName.db";
        $bcpFile=$this->dbPath."/$databaseName.$backupSuffix.db";
        if(file_exists($dbFile) && is_file($dbFile) && !file_exists($bcpFile)){
            copy($dbFile,$bcpFile);
        }
        return "sqlite:$dbFile";
    }

    /**
     * @return string retourne un nouveau chemin de fichier uploadé
     */
    private function getTmpNewFilePath(){
        return $this->uploadLocalPath(date("Y/m/d/h-i-s-").uniqid("up"));
    }

    /**
     * Pour les uploads via input file classique
     * @return string le nom du fichier créé (sans extension)
     */
    public function uploadFromHtmlInput()
    {
        $destFilePath=$this->getTmpNewFilePath();
        $this->prepareDir($destFilePath);
        move_uploaded_file($_FILES["file"]["tmp_name"], $destFilePath);
        $destFilePath=$this->setFileExtension($destFilePath);
        return $destFilePath;
    }

    /**
     * Pour les uploads via html5 / javascript
     * Met le php://input stream dans un nouveau fichier
     * @return string le nom du fichier créé (sans extension)
     */
    public function uploadFromStream()
    {
        $destFilePath=$this->getTmpNewFilePath();
        $this->prepareDir($destFilePath);
        //return $destFilePath;
        // read contents from the input stream
        $inputHandler = fopen('php://input', "r");
        // create a temp file where to save data from the input stream
        $fileHandler = fopen($destFilePath, "w+");
        // save data from the input stream
        while(true) {
            $buffer = fgets($inputHandler, 4096);
            if (strlen($buffer) == 0) {
                fclose($inputHandler);
                fclose($fileHandler);
                $destFilePath=$this->setFileExtension($destFilePath);
                return $destFilePath;
            }
            fwrite($fileHandler, $buffer);
        }
        return false;
    }

    /**
     * Rajoute une extension au fichier en fonction de son mime
     * @param string $fileWithoutExtension
     * @return string
     */
    private function setFileExtension($fileWithoutExtension){
        if(file_exists($fileWithoutExtension) && is_file($fileWithoutExtension)){
            $mime=mime_content_type($fileWithoutExtension);
            if($mime){
                $ext=pov()->utils->files->mimeToExtension($mime);
                if($ext){
                    $newName=$fileWithoutExtension.".$ext";
                    rename($fileWithoutExtension,$newName);
                    return $newName;
                }
            }
        }
        return $fileWithoutExtension;
    }

    /**
     * identique à file_get_contents
     * @param $filePath
     * @return bool|string
     * @throws PovException
     */
    public function fileGetContents($filePath)
    {
        //die($filePath);
        if(!$filePath || !file_exists($filePath) || !is_file($filePath)){
            $m="$filePath n'existe pas!";
            throw new PovException($m);
        }else{
            return file_get_contents($filePath);
        }
    }

    /**
     * Convertit un chemin serveur en chemin http
     * @param string $localPath un chemin en mode serveur
     * @return string un chemin en mode http
     */
    function filesystemToHttp($localPath){
        $r=preg_replace("%^".preg_quote(getcwd())."%","",$localPath);
        $r=str_replace("\\","/",$r);
        $r=the()->fmkHttpRoot.$r;
        return $r;
    }



}