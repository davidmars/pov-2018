<?php

$view->inside("dev/dev-layout",the()->htmlLayout());

?>
<div class="uk-container uk-margin-top">

    <h1>Help <code><?=the()->configProjectUrl->httpPath?></code></h1>
    <hr>
    <h2>Les répertoires des vues:</h2>
    <?=var_dump(\Pov\MVC\View::$possiblesPath)?>





</div>
