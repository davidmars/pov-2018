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
<title><?=$vv->meta->title?></title>
<meta name="twitter:card" content="summary" >
<meta property="og:title" content="<?=$vv->meta->title?>" />
<meta name="twitter:title" content="<?=$vv->meta->title?>" >
<meta property="og:url" content="<?= the()->requestUrl->fullUrl?>" />
<meta name="description" content="<?=$vv->meta->description?>">
<meta property="og:description" content="<?=$vv->meta->description?>" />
<meta name="twitter:description" content="<?=$vv->meta->description?>" >
<meta name="keywords" content="<?=$vv->meta->keywords?>">
<?if($vv->meta->author):?>
<meta name="author" content="<?php echo $vv->meta->author?>">
<?endif?>
<?if($vv->facebookAppId):?>
<meta property="fb:app_id" content="<?=$vv->facebookAppId?>"/>
<?endif?>
<?if($vv->googleSiteVerification):?>
<meta name="google-site-verification" content="<?=$vv->googleSiteVerification?>" />
<?endif?>
<?
//----------languages---
?>
<link rel="canonical" href="<?=the()->requestUrl->fullUrl?>">
<link rel="alternate" href="<?=the()->requestUrl->fullUrl?>" hreflang="<?=$vv->hreflang?>"/>
<?/*
<?foreach(theProject()->hosts() as $h):?>
<link rel="alternate" hreflang="<?=$h->language->langCode?>" href="<?=$h->getUrl(ThePage::currentUrl())?>" />
<?endforeach?>
*/?>
<?
//IE We love you---
?>
<!--[if IE]>
<meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1,requiresactivex=true">
<meta http-equiv="imagetoolbar" content="no">
<![endif]-->
<?

//Mobile--

?>
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
<?
//----OpenGraph (facebook mainly)--
?>
<?if($vv->ogImage):?>
<meta property="og:image" content="<?php echo $vv->ogImage?>">
<meta name="twitter:image" content="<?php echo the()->configProjectUrl->absoluteUrl().$vv->ogImage?>" >
<?endif?>
<?if($vv->ogType):?>
<meta property="og:type" content="<?php echo $vv->ogType?>">
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
//-------themeColor-------
?>
<?if($vv->meta->themeColor):?>
<meta name="theme-color" content="<?=$vv->meta->themeColor?>">
<meta name="msapplication-navbutton-color" content="<?=$vv->meta->themeColor?>">
<meta name="apple-mobile-web-app-status-bar-style" content="<?=$vv->meta->themeColor?>">
<?endif?>
<?/*
 *
 *
 * CSS & JS header....
 *
 *
 */?>
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
<?/*
 *
 *
 * page content
 *
 *
 */?>
<?=$view->insideContent?>


</body>
</html>
<?/*
 *
 *
 * js scripts here...
 *
 *
 */?>
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
<?foreach($vv->cssFooterFiles as $css):?>
<?=$css->htmlTag()?>
<?endforeach;?>
<?foreach($vv->jsFooterFiles as $js):?>
<?=$js->htmlTag()?>
<?endforeach;?>
<?foreach($vv->importFooterFiles as $import):?>
<?=$import->htmlTag()?>
<?endforeach;?>

