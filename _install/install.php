<style>
    code{
        background-color: #333;
        color:#f0f0f0;
        padding-left:4px;
        padding-right:4px;
    }
</style>

<h1>
    Salut! je suis le programme d'installation de Pov 2018.<hr>
</h1>



<?php
//on est sensé être dans /vendor/pov-2018/_install
$dir=__DIR__."/../../configs/routes";
?>
Création du répertoire des configs dans <code><?php echo $dir?></code><br>
<?php

if(is_dir($dir)){
    $r="Existait déjà";
}else{
    $r=mkdir($dir,0777,true);
    $r=$r?"ok":"error";
}

?>
<pre><?php echo $r?></pre>






<?php
$dir= __DIR__ . "/../files";
?>
Création du répertoire files dans <code><?php echo $dir?></code><br>
<?php
if(is_dir($dir)){
    $r="Existait déjà";
}else{
    $r=mkdir($dir,0777,true);
    $r=$r?"ok":"error";
}

?>
<pre><?php echo $r?></pre>




<?php
$file= __DIR__ . "/.htaccess";
$targetFile=__DIR__."/../.htaccess";
?>
Déplaçage du htaccess dans <code><?php echo $targetFile?></code><br>
<?php

if(is_file($file) && !is_file($targetFile)){
    $r=copy($file,$targetFile);
    if($r){
        $r=$r?"ok":"erreur quand on a essayé de copier le .htaccess";
    }
}else if(is_file($file) && is_file($targetFile)){
    $r="Le .htaccess était déjà en place";
}else if(!is_file($file) && !is_file($targetFile)){
    $r="problème de .htaccess aucun des deux fichiers :( " ;
}else{
    $r="problème de .htaccess un peu cheulou " ;
}

?>
<pre><?php echo $r?></pre>

<hr>

<?php
if(isset($_GET["createProject"])){
    require_once __DIR__ . "/_inc/ask-login-dev.php";
    include __DIR__."/_inc/install/createProjectUrl.php";
    include __DIR__."/_inc/install/createProject.php";
}else{
    echo "si vous souhaitez créer un projet faites <code>?createProject=nom-du-projet</code> dans cette url";
}
?>





