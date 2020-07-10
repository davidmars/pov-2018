<?php

use Pov\Defaults\C_dev;

$view->inside("layout/html5bp",the()->htmlLayout());
the()->htmlLayout()->addCssToHeader("vendor/davidmars/pov-2018/dist/dev-ui.css");
the()->htmlLayout()->addJsToFooter("vendor/davidmars/pov-2018/dist/dev-ui.js");


$askForLogin=the()->request("askForLogin");
if($askForLogin=="false"){
    $askForLogin=false;
}else{
    $askForLogin=true;
}
?>

<?php if(!the()->human->isDev($askForLogin)):?>
    <div class="uk-container uk-margin-top">
        <div class="uk-alert uk-alert-danger">Vous devez <a href="<?php echo the()->requestUrl->fullUrlNoQueryString?>">vous connecter</a> en tant que dev</div>
    </div>
<?php else: ?>

    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;" class="uk-sticky" style="">
        <nav class="uk-navbar-container" uk-navbar>

            <div class="uk-navbar-left">
                <a class="uk-logo uk-navbar-item" href="<?php echo  C_dev::page_url("help")?>">Help!</a>

                <ul class="uk-navbar-nav">
                    <li class=""></li>
                    <li class=""><a href="<?php echo  C_dev::page_url("logs")?>">Logs</a></li>
                    <li class=""><a href="<?php echo  C_dev::page_url("phpinfo")?>">phpinfo</a></li>
                    <li class=""><a href="<?php echo  C_dev::page_url("testsImages")?>">Doc images</a></li>
                </ul>

            </div>

            <div class="uk-navbar-right">
                <div class="uk-navbar-item">
                        <a href="<?php echo  C_dev::logout_url(the()->requestUrl->fullUrlNoQueryString."?askForLogin=false")?>"
                           class="uk-button uk-button-danger">Déconnexion</a>
                </div>
            </div>

        </nav>
    </div>

    <div class="uk-margin-top">
        <?php echo $view->insideContent?>
    </div>

<?php endif; ?>
