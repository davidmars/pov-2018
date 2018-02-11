<style>
    code{
        background-color: #333;
        color:#f0f0f0;
        padding-left:4px;
        padding-right:4px;
    }
</style>

<h1>
    Salut! je suis le programme d'installation de Pov2017.<hr>
</h1>



<?php
$dir=__DIR__."/../configs/routes";
?>
Création du répertoire des configs dans <code><?=$dir?></code><br>
<?

if(is_dir($dir)){
    $r="Existait déjà";
}else{
    $r=mkdir($dir,0777,true);
    $r=$r?"ok":"error";
}

?>
<pre><?=$r?></pre>






<?php
$dir= __DIR__ . "/../files";
?>
Création du répertoire files dans <code><?=$dir?></code><br>
<?
if(is_dir($dir)){
    $r="Existait déjà";
}else{
    $r=mkdir($dir,0777,true);
    $r=$r?"ok":"error";
}

?>
<pre><?=$r?></pre>




<?php
$file= __DIR__ . "/.htaccess";
$targetFile=__DIR__."/../.htaccess";
?>
Déplaçage du htaccess dans <code><?=$targetFile?></code><br>
<?

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
<pre><?=$r?></pre>




Génère le password de dev<br>
<?
$pwdFile=__DIR__."/../configs/dev-password.php";
if(is_file($pwdFile)){
    $r="il existait déjà";
}else{
    include __DIR__ . "/_inc/install/gen-dev-password.php";
    if(!is_file($pwdFile)){
        $r="oups fichier $pwdFile manquant";
    }else{
        $r="ok";
    }
}


?>
<pre><?=$r?></pre>

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





