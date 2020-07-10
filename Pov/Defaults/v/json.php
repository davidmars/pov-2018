<?php
/**
 * Simplement un output json
 */

use Pov\System\Header;

the()->headerOutput->code= Header::JSON
?>
<?php echo json_encode($vv,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)?>