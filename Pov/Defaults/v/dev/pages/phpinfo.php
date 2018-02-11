<?php
/**
 * 
 * phpinfo is a View template. It works with a  object.
 */

/* @var View $this */
/* @var  $vv */
/** @noinspection PhpUndefinedVariableInspection */
$vv = $_vars;
$view->inside("dev/dev-layout",the()->htmlLayout());
?>
<hr>
<? phpinfo()?>