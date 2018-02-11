<?php
$redirect=$vv;
?>
redirect to <code><?=$redirect?></code>
<script>
    setTimeout(function(){
        document.location="<?=$redirect?>";
    },1 *1000);
</script>
