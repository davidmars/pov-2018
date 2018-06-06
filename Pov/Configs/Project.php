<?php

namespace Pov\Configs;


/**
 * Class Project
 *
 * @package Pov\Configs
 */
class Project {
    /**
     * @var string[] Répertoires où on peut trouver des Vues
     */
    public $viewPath=[];
    /**
     * @var string[]  Les espaces de noms possibles pour exécuter des controlleurs
     */
    public $controllerNameSpaces=[];

    /**
     * @var string Nom du projet
     */
    public $name;

    /**
     * @var array regexp dans la clé et url de controlleur dans la valeur
     */
    public $routes=[];
    /**
     * @var string chemin vers un fichier texte qui contient le numéro de version du projet
     */
    public $versionFilePath="version.txt";
    /**
     * @var string chemin vers le répertoire "pub"
     */
    public $pub;
    /**
     * @var string chemin vers le répertoire "pub" avec un slash au debut pour utiliser dans le html
     */
    public $pubHttp;

    /**
     * @var string code iso de la langue
     */
    public $langCode="fr";

    /**
     * @var string[] liste des langues (codes) à gérer
     */
    public $languages=[];

    /**
     * @var string url du csv des traductions
     */
    public $config_translations_csv_url="https://docs.google.com/spreadsheets/d/1m_vi4YTj2vAMwaJxvGWRIeJP4F9IOhE_FMftjruiDz0/export?gid=0&format=csv";
    /**
     * @var bool Quand défini sur true les traductions sont mises à jour depuis le csv sans tenir compte du cache
     */
    public $config_translations_debug=false;
    /**
     * @var array Tableau de cache où se trouvent les traductions
     */
    private $_translations=[];

    public function translations(){
        if(!$this->_translations){
            $jsonCache=the()->fileSystem->cachePath."/translations-".md5($this->config_translations_csv_url).".json";
            $csvCache=the()->fileSystem->cachePath."/translations-".md5($this->config_translations_csv_url).".csv";
            $delimiter=",";
            $utf8encode=false;
            $spreadsheetData=[];
            if(!file_exists($jsonCache) || $this->config_translations_debug){
                copy($this->config_translations_csv_url,$csvCache);
                if (($handle = fopen($csvCache, "r")) !== FALSE) {
                    while (($data = fgetcsv($handle, null, $delimiter)) !== FALSE) {
                        if($utf8encode){
                            $data = array_map("utf8_encode", $data); //added
                        }
                        $spreadsheetData[]=$data;
                    }
                }
                /** @var array $langues La liste des langues*/
                $langues=array_shift($spreadsheetData);
                //convertit le csv en json
                $obj=[];
                foreach ($spreadsheetData as $line){
                    $obj[$line[0]]=[];
                    for($c=1;$c<count($langues);$c++){
                        $value="";
                        if(isset($line[$c])){
                            $value=trim($line[$c]);
                        }
                        $obj[$line[0]][$langues[$c]]=$value;
                    }
                }
                file_put_contents($jsonCache,json_encode($obj,JSON_PRETTY_PRINT));
            }
            $this->_translations=json_decode(file_get_contents($jsonCache));
        }
        return $this->_translations;
    }
    /**
     * Renvoie un terme traduit
     * @see https://docs.google.com/spreadsheets/d/1m_vi4YTj2vAMwaJxvGWRIeJP4F9IOhE_FMftjruiDz0/edit#gid=0
     * @see $config_translations_csv_url
     * @param string $termsIdentifier
     * @return string
     */
    public function translation($termsIdentifier){
        if(!$termsIdentifier){
            return "nothing to translate!!!";
        }
        $trads=$this->translations();
        if(isset($trads->{$termsIdentifier}->{the()->project->langCode})){
            return $trads->{$termsIdentifier}->{the()->project->langCode};
        }else{
            return $termsIdentifier;
        }

    }

    /**
     * Ajoute une règle de routage à la fin de la liste.
     * @param string $regRule une regexp ex: "^p/(.*)$"
     * @param string $controller Le controller qui en résulte. ex "blog/post/($1)"
     */
    public function routesPush($regRule,$controller)
    {
        $this->routes[$regRule]=$controller;
    }

} 