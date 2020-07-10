<?php

use Pov\Html\Layout;

/** @var Layout $vv  */

if(!is_a($vv,"Pov\Html\Layout")){
    throw new Exception("La layout fonctionne avec un objet de type 'Pov\Html\Layout', mais ici vous utilisez un ".pov()->debug->type($vv));
}
?>
<!doctype html>
<!--[if lt IE 7 ]>      <html lang="<?php echo $vv->meta->langCode ?>" class="no-js ie6" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"> <![endif]-->
<!--[if IE 7 ]>         <html lang="<?php echo $vv->meta->langCode ?>" class="no-js ie7" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"> <![endif]-->
<!--[if IE 8 ]>         <html lang="<?php echo $vv->meta->langCode ?>" class="no-js ie8" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="<?php echo $vv->meta->langCode ?>" class="no-js" xmlns:og="http://opengraphprotocol.org/schema/"> <!--<![endif]-->
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<?php if($vv->base):?>
<base href="<?php echo $vv->base?>">
<?php endif; ?>
<?php

//redirect javascript ?

?>
<?php if($vv->redirectJS):?>
<script>document.location="<?php echo $vv->redirectJS?>";</script>
<?php endif; ?>
<?php

//title, description etc...

?>
<title><?php echo $vv->meta->title?></title>
<meta name="description" content="<?php echo $vv->meta->description?>">
<meta name="keywords" content="<?php echo $vv->meta->keywords?>">
<meta name="twitter:card" content="<?php echo the()->htmlLayout()->twitterCardType?>" >
<meta name="twitter:title" content="<?php echo $vv->meta->title?>" >
<meta name="twitter:description" content="<?php echo $vv->meta->description?>" >
<meta property="og:title" content="<?php echo $vv->meta->title?>" />
<meta property="og:url" content="<?php echo  the()->requestUrl->fullUrl?>" />
<meta property="og:description" content="<?php echo $vv->meta->description?>" />
<?php if($vv->meta->author):?>
<meta name="author" content="<?php echo $vv->meta->author?>">
<?php endif; ?>
<?php

//Pinterest domain verification

?>
<?php if($vv->pinterestDomainVerification):?>
<meta name="p:domain_verify" content="<?php echo $vv->pinterestDomainVerification?>"/>
<?php endif; ?>

<?php

//Facebook API

?>
<?php if($vv->facebookAppId):?>
<meta property="fb:app_id" content="<?php echo $vv->facebookAppId?>"/>
<?php endif; ?>
<?php

//google webmaster tools

?>
<?php if($vv->googleSiteVerification):?>
<meta name="google-site-verification" content="<?php echo $vv->googleSiteVerification?>" />
<?php endif; ?>
<?php

//languages

?>
<link rel="canonical" href="<?php echo the()->requestUrl->fullUrl?>">
<?php foreach($vv->hreflangs as $lang=>$url):?>
<link rel="alternate" hreflang="<?php echo $lang?>" href="<?php echo $url?>" />
<?php endforeach; ?>
<?php

//IE We love you---

?>
<!--[if IE]>
<meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1,requiresactivex=true">
<meta http-equiv="imagetoolbar" content="no">
<![endif]-->
<?php

//Mobile

?>
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
<?php

//OpenGraph (facebook mainly)--

?>
<?php if($vv->ogImage):?>
<meta property="og:image" content="<?php echo $vv->ogImage?>">
<meta name="twitter:image" content="<?php echo $vv->twitterImage()?>" >
<?php if($vv->ogImageHeight && $vv->ogImageHeight):?>
<meta property="og:image:width" content="<?php echo $vv->ogImageWidth?>">
<meta property="og:image:height" content="<?php echo $vv->ogImageHeight?>">
<?php endif; ?>
<?php endif; ?>
<?php if($vv->ogType):?>
<meta property="og:type" content="<?php echo $vv->ogType?>">
<?php endif; ?>

<?php if($vv->ogLatitude || $vv->ogLongitude):?>
<meta property="place:location:latitude"  content="<?php echo $vv->ogLatitude?>" />
<meta property="place:location:longitude" content="<?php echo $vv->ogLongitude?>" />
<?php endif; ?>
<?php

//-------Favicons-------

?>
<?php if($vv->favicon->icon144):?>
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo $vv->favicon->icon144?>">
<?php endif; ?>
<?php if($vv->favicon->icon192):?>
    <link rel="apple-touch-icon-precomposed" sizes="192x192" href="<?php echo $vv->favicon->icon192?>">
<?php endif; ?>
<?php if($vv->favicon->icon114):?>
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $vv->favicon->icon114?>">
<?php endif; ?>
<?php if($vv->favicon->icon72):?>
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $vv->favicon->icon72?>">
<?php endif; ?>
<?php if($vv->favicon->icon57):?>
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo $vv->favicon->icon57?>">
<?php endif; ?>
<?php if($vv->favicon->favicon):?>
<link rel="shortcut icon" href="<?php echo $vv->favicon->favicon?>">
<?php endif; ?>
<?php

//themeColor

?>
<?php if($vv->meta->themeColor):?>
<meta name="theme-color" content="<?php echo $vv->meta->themeColor?>">
<meta name="msapplication-navbutton-color" content="<?php echo $vv->meta->themeColor?>">
<meta name="apple-mobile-web-app-status-bar-style" content="<?php echo $vv->meta->themeColor?>">
<?php endif; ?>
<?php

//webapp

?>
<?php if($vv->webAppManifest):?>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<link rel="manifest" href="<?php echo $vv->webAppManifest?>">
<?php endif; ?>
<?php

//CSS & JS header....

?>
<?php foreach($vv->cssHeaderFiles as $css):?>
<?php echo $css->htmlTag()?>
<?php endforeach; ?>
<?php foreach($vv->jsHeaderFiles as $js):?>
<?php echo $js->htmlTag()?>
<?php endforeach; ?>
<?php foreach($vv->importHeaderFiles as $import):?>
<?php echo $import->htmlTag()?>
<?php endforeach; ?>
<?php foreach($vv->jsHeaderScripts as $script):?>
<?php echo $script?>
<?php endforeach; ?>
<?php foreach($vv->rawHeaderContents as $script):?>
<?php echo $script?>
<?php endforeach; ?>
</head>
<body>
<?php

//------------------------------------BODY------------------------------


?>
<?php echo $view->insideContent;?>
</body>
<?php

//------------------------------AFTER BODY------------------------------


?>
</html>
<?php

// JSON LayoutVars....

?>
<script>
<?php
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
var LayoutVars=<?php echo json_encode($vv->layoutVars,JSON_UNESCAPED_SLASHES)?>;
var pageInfo=<?php echo json_encode($vv->pageInfo,JSON_UNESCAPED_SLASHES)?>;
var meta=<?php echo json_encode($vv->meta,JSON_UNESCAPED_SLASHES)?>;
</script>
<?php

//JS & CSS footer....

?>
<?php foreach($vv->cssFooterFiles as $css):?>
<?php echo $css->htmlTag()?>
<?php endforeach; ?>
<?php foreach($vv->jsFooterFiles as $js):?>
<?php echo $js->htmlTag()?>
<?php endforeach; ?>
<?php foreach($vv->importFooterFiles as $import):?>
<?php echo $import->htmlTag()?>
<?php endforeach; ?>
<?php foreach($vv->jsFooterScripts as $script):?>
<?php echo $script?>
<?php endforeach; ?>
<?php foreach($vv->rawFooterContents as $script):?>
    <?php echo $script?>
<?php endforeach; ?>

