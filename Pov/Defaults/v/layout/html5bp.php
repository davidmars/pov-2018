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
<meta property="og:title" content="<?=$vv->meta->title?>" />
<meta property="og:url" content="<?= the()->requestUrl->fullUrl?>" />
<meta name="description" content="<?=$vv->meta->description?>">
<meta property="og:description" content="<?=$vv->meta->description?>" />
<meta name="keywords" content="<?=$vv->meta->keywords?>">
<?if($vv->meta->author):?>
<meta name="author" content="<?php echo $vv->meta->author?>">
<?endif?>
<?/*
<?if($vv->metaFbAppId):?>
<meta property="fb:app_id" content="<?=$vv->metaFbAppId?>"/>
<?endif?>
<?if($vv->metaGooglePublisher):?>
<link href="<?=$vv->metaGooglePublisher?>" rel="publisher" />
<?endif?>
<?php if(!$vv->robotIndex):?>
<meta name="robots" content="noindex, follow">
<?endif?>
<?php echo $vv->metaGoogleWebmasterTools()?>

<?if($vv->twitterCard):?>
<!-- twitter card -->
<?=$view->render("layout/meta/twitter-card",$vv->twitterCard);?>
<?endif?>
<?if(PovFacebook::$app):?>
<meta property="fb:app_id" content="<?=PovFacebook::$app->appId?>"/>
<?endif?>
*/?>
<?

//----------languages---

?>
<link rel="canonical" href="<?=the()->requestUrl->fullUrl?>">
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
<?/*
<?if($vv->pageData && $vv->pageData->hashTag):?>
<meta name="hashtag" content="<?=$vv->pageData->hashTag?>">
<?endif?>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<?if($vv->appleTouchStartupImage):?>
<link rel="apple-touch-startup-image" href="<?php echo $vv->appleTouchStartupImage?>">
<?endif?>
<?//OpenGraph (facebook mainly)--?>
<?if($vv->ogImage):?>
<meta property="og:image" content="<?php echo $vv->ogImage?>">
<?endif?>
<?//RSS--?>
<?php if(isset($vv->hrefRss)):?>
    <link rel="alternate" type="application/rss+xml" title="RSS" href="<?php echo GiveMe::url($vv->hrefRss->url,true)?>">
<?php endif?>
*/?>
<?//Favicons--?>
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

<?if($vv->meta->themeColor):?>
<!-- Chrome, Firefox OS and Opera -->
<meta name="theme-color" content="<?=$vv->meta->themeColor?>">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="<?=$vv->meta->themeColor?>">
<!-- iOS Safari -->
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
<?/*
 *
 *
 * Right to left?
 *
 *
*/?>
    <?/*
<?if(theProject()->language->langCode==Language::ARABIC_CODE):?>
<style>
    body{
        direction: rtl;
    }
</style>
<?endif?>
*/?>
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

