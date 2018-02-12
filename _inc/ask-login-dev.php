<?php
/**
 * regarde si l'utilisateur est loggué en dev, si ce n'est pas le cas, va lui demander son pwd
 */
$devPwd=the()->human->devPassword();
function askLogin()
{
    header('WWW-Authenticate: Basic realm="povrealm"');
    header('HTTP/1.0 401 Unauthorized');
    die("Vous devez être connecté en dev.");
    exit;
}

if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
    askLogin();
} else {
    if ($_SERVER['PHP_AUTH_USER'] == "dev" && $_SERVER['PHP_AUTH_PW'] == $devPwd) {
//ok tout va bien on est connecté
    } else {
        askLogin();
    }
}