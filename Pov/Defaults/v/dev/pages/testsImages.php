<h1>Tests Images</h1>

<?php
$imgSrc=__DIR__.'/test-image.jpg';
?>

<?php
$im=pov()->img($imgSrc)->jpg(10);
?>
<h4>Pas de changement, mais une qualité jpg de 10/100</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->sizeCover(200,200)->jpg(80)
?>
<h4>Cover 200x200</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->sizeCover(200,200,"bottom-right")->jpg(80)
?>
<h4>Cover 200x200 bottom-right</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->sizeContain(200,200,"00FF00")->jpg(80)
?>
<h4>Contain 200x200 vert</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->sizeContain(200,200,"transparent")->png()
?>
<h4>Contain 200x200 png transparent</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->sizeMax(200,200)->jpg()
?>
<h4>sizeMax 200x200</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->sizeMax(150,200)->jpg()
?>
<h4>sizeMax 150x200</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->width(200)->jpg()
?>
<h4>width 200</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>

<?php
$im=pov()->img($imgSrc)->height(200)->jpg()
?>
<h4>height 200</h4>
<pre><?=$im->href()?></pre>
<iframe width="100%" height="300px" src="<?=$im->href()?>"></iframe>


