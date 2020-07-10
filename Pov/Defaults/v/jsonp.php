<?php

use Pov\System\Header;

/* @var $vv mixed */
the()->headerOutput->code= Header::JAVASCRIPT
?>
<?php echo $_GET['callback']. '(' . json_encode($vv,JSON_PRETTY_PRINT) . ');';?>
