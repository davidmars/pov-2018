<?php

use Pov\Html\Layout;

/** @var Layout $vv  */

if(!is_a($vv,"Pov\Html\Layout")){
    throw new Exception("La layout fonctionne avec un objet de type 'Pov\Html\Layout', mais ici vous utilisez un ".pov()->debug->type($vv));
}
?>
<!doctype html>
<!--[if lt IE 7 ]>      <html lang="<?=$vv->meta->langCode ?>" class="no-js ie6" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"> <![endif]-->
<!--[if IE 7 ]>         <html lang="<?=$vv->meta->langCode ?>" class="no-js ie7" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"> <![endif]-->
<!--[if IE 8 ]>         <html lang="<?=$vv->meta->langCode ?>" class="no-js ie8" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="<?=$vv->meta->langCode ?>" class="no-js" xmlns:og="http://opengraphprotocol.org/schema/"> <!--<![endif]-->
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<?if($vv->base):?>
<base href="<?=$vv->base?>">
<?endif?>
<?

//redirect javascript ?

?>
<?if($vv->redirectJS):?>
<script>document.location="<?=$vv->redirectJS?>";</script>
<?endif;?>
<?

//title, description etc...

?>
<title><?=$vv->meta->title?></title>
<meta name="description" content="<?=$vv->meta->description?>">
<meta name="keywords" content="<?=$vv->meta->keywords?>">
<meta name="twitter:card" content="summary" >
<meta name="twitter:title" content="<?=$vv->meta->title?>" >
<meta name="twitter:description" content="<?=$vv->meta->description?>" >
<meta property="og:title" content="<?=$vv->meta->title?>" />
<meta property="og:url" content="<?= the()->requestUrl->fullUrl?>" />
<meta property="og:description" content="<?=$vv->meta->description?>" />
<?if($vv->meta->author):?>
<meta name="author" content="<?php echo $vv->meta->author?>">
<?endif?>
<?

//Facebook API

?>
<?if($vv->facebookAppId):?>
<meta property="fb:app_id" content="<?=$vv->facebookAppId?>"/>
<?endif?>
<?

//google webmaster tools

?>
<?if($vv->googleSiteVerification):?>
<meta name="google-site-verification" content="<?=$vv->googleSiteVerification?>" />
<?endif?>
<?

//languages

?>
<link rel="canonical" href="<?=the()->requestUrl->fullUrl?>">
<?foreach($vv->hreflangs as $lang=>$url):?>
<link rel="alternate" hreflang="<?=$lang?>" href="<?=$url?>" />
<?endforeach?>
<?

//IE We love you---

?>
<!--[if IE]>
<meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1,requiresactivex=true">
<meta http-equiv="imagetoolbar" content="no">
<![endif]-->
<?

//Mobile

?>
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
<?

//OpenGraph (facebook mainly)--

?>
<?if($vv->ogImage):?>
<meta property="og:image" content="<?=$vv->ogImage?>">
<meta name="twitter:image" content="<?=$vv->ogImage?>" >
<?if($vv->ogImageHeight && $vv->ogImageHeight):?>
<meta property="og:image:width" content="<?=$vv->ogImageWidth?>">
<meta property="og:image:height" content="<?=$vv->ogImageHeight?>">
<?endif?>
<?endif?>
<?if($vv->ogType):?>
<meta property="og:type" content="<?=$vv->ogType?>">
<?endif?>
<?if($vv->ogLatitude || $vv->ogLongitude):?>
<meta property="place:location:latitude"  content="<?=$vv->ogLatitude?>" />
<meta property="place:location:longitude" content="<?=$vv->ogLongitude?>" />
<?endif?>
<?

//-------Favicons-------

?>
<?if($vv->favicon->icon144):?>
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo $vv->favicon->icon144?>">
<?endif?>
<?if($vv->favicon->icon114):?>
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $vv->favicon->icon114?>">
<?endif?>
<?if($vv->favicon->icon72):?>
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $vv->favicon->icon72?>">
<?endif?>
<?if($vv->favicon->icon57):?>
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo $vv->favicon->icon57?>">
<?endif?>
<?if($vv->favicon->favicon):?>
<link rel="shortcut icon" href="<?php echo $vv->favicon->favicon?>">
<?endif;?>
<?

//themeColor

?>
<?if($vv->meta->themeColor):?>
<meta name="theme-color" content="<?=$vv->meta->themeColor?>">
<meta name="msapplication-navbutton-color" content="<?=$vv->meta->themeColor?>">
<meta name="apple-mobile-web-app-status-bar-style" content="<?=$vv->meta->themeColor?>">
<?endif?>
<?

//webapp

?>
<?if($vv->webAppManifest):?>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<link rel="manifest" href="<?=$vv->webAppManifest?>">
<?endif?>
<?

//CSS & JS header....

?>
<?foreach($vv->cssHeaderFiles as $css):?>
<?=$css->htmlTag()?>
<?endforeach;?>
<?foreach($vv->jsHeaderFiles as $js):?>
<?=$js->htmlTag()?>
<?endforeach;?>
<?foreach($vv->importHeaderFiles as $import):?>
<?=$import->htmlTag()?>
<?endforeach;?>
</head>
<body>
<?

//------------------------------------BODY------------------------------


?>
<?=$view->insideContent?>
</body>
<?

//------------------------------AFTER BODY------------------------------


?>
</html>
<?

// JSON LayoutVars....

?>
<script>
<?
$vv->layoutVars->assets=[];
$vv->layoutVars->assets["javascriptHeader"]=[];
$vv->layoutVars->assets["javascriptFooter"]=[];
foreach ($vv->jsFooterFiles as $f){
    $vv->layoutVars->assets["javascriptFooter"][]=$f->url;
}
foreach ($vv->jsHeaderFiles as $f){
    $vv->layoutVars->assets["javascriptHeader"][]=$f->url;
}
?>
var LayoutVars=<?=json_encode($vv->layoutVars)?>;
var pageInfo=<?=json_encode($vv->pageInfo)?>;
var meta=<?=json_encode($vv->meta)?>;
</script>
<?

//JS & CSS footer....

?>
<?foreach($vv->cssFooterFiles as $css):?>
<?=$css->htmlTag()?>
<?endforeach;?>
<?foreach($vv->jsFooterFiles as $js):?>
<?=$js->htmlTag()?>
<?endforeach;?>
<?foreach($vv->importFooterFiles as $import):?>
<?=$import->htmlTag()?>
<?endforeach;?>
<?foreach($vv->jsFooterScripts as $script):?>
<?=$script?>
<?endforeach;?>

