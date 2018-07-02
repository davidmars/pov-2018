<?php

namespace Pov\Utils;


use Pov\System\AbstractSingleton;

/**
 * Class CsvUtils
 * @package Pov\Utils
 * @method static CsvUtils inst()
 */
class CsvUtils extends AbstractSingleton
{
    /**
     * Convertit un CSV tableau indexé en partant du principe que la première colonne contient les noms de colonnes
     * @param string $url
     * @param string $delimiter
     * @param bool $utf8encode
     * @param string $cache
     * @return array
     */
    public function csvToObject($url,$delimiter=",",$utf8encode=false,$cache=""){
        $spreadsheetData=[];
        if($cache){
            if(!file_exists($cache)){
                copy($url,$cache);
            }
            $url=$cache;
        }
        if (($handle = fopen($url, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 10000, $delimiter)) !== FALSE) {
                if($utf8encode){
                    $data = array_map("utf8_encode", $data); //added
                }

                $spreadsheetData[]=$data;
            }

        }
        //$champs=array_shift($spreadsheetData);
        $champs=$spreadsheetData[0];
        $obj=[];
        foreach ($spreadsheetData as $line){
            $entry=[];
            for($c=0;$c<count($champs);$c++){
                $value="";
                if(isset($line[$c])){
                    $value=trim($line[$c]);
                }

                $entry["col_$c ".$champs[$c]]=$value;
            }
            $obj[]=$entry;
        }
        return $obj;
    }
}