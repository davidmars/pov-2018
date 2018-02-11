<?php
/**
 * Simplement un output json
 */

use Pov\System\Header;

the()->headerOutput->code= Header::JSON
?>
<?=json_encode($vv,JSON_PRETTY_PRINT)?>