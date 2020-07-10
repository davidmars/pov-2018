<?php
$redirect=$vv;
?>
redirect to <code><?php echo $redirect?></code>
<script>
    setTimeout(function(){
        document.location="<?php echo $redirect?>";
    },1 *1000);
</script>
