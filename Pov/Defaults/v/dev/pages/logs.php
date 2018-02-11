<?php
use Dubture\Monolog\Reader\LogReader;

$view->inside("dev/dev-layout",the()->htmlLayout());
$messages=[];
$delete=the()->request("delete");
if($delete){
    if(file_exists($delete)){
        the()->fileSystem->delete($delete);
        the()->headerOutput->setRedirect(the()->requestUrl->fullUrlNoQueryString);
        the()->boot->end();
    }
}




$logFile=the()->request("logFile",the()->fileSystem->logFilepath());
//$logFile = the()->fileSystem->logFilepath();
$reader=[];
$logs=[];
if(file_exists($logFile)){
    $reader = new LogReader($logFile,10);
    foreach ($reader as $log){
        $logs[]=$log;
    }
    $logs=array_reverse($logs);
}


the()->htmlLayout()->meta->title="Logs";

/**
 * Renvoie un texte html dont la couleur diffère selon l'ip
 * @param string $ip
 * @return string
 */
function ipColorized($ip){
    $color=pov()->utils->color->randHex(0.9,0.3,$ip);
    return "<span style='color:#fff;background-color:#$color'>".$ip."</span>";
}
function bootColorized($str){
    $color=pov()->utils->color->fullRandHex($str);
    return "<span class='bootlog' style='color:#fff;background-color:#$color' title='$str'>&nbsp;</span>";
}

/**
 * @param $logLevel
 * @return string uk-label-danger par exemple
 */
function logLevelToCss($logLevel){

    $labels=[
        "DEBUG"=>"info",
        "INFO"=>"info",
        "NOTICE"=>"info",
        "WARNING"=>"warning",
        "ERROR"=>"warning",
        "CRITICAL"=>"danger",
        "ALERT"=>"danger",
        "EMERGENCY"=>"danger"
    ];
    return "uk-label-".$labels[$logLevel];
}

?>



<style>
    .time{
        font-family: monospace;
        font-size: 12px;
    }
    .code{
        font-family: monospace;
        font-size: 10px;
    }
    .code b{
        color: #390000;
    }
    .td-boot{
        position: relative;
    }
    .boot-elements{
        position: absolute;
        right: 0;
        top: -1px;
        bottom: -1px;
        display: flex;
    }
    .bootlog{
        height: 100%;
        display: block;
        width: 6px;
    }
</style>




<div class="uk-padding-small">



    <div class="" uk-grid>

        <div class="uk-width-expand@m">
            <h1>Logs <code id="timer"></code></h1>

        </div>

        <div>
            <?if($reader || the()->fileSystem->logFilesList()):?>

                <div class="uk-button-group">

                    <div class="uk-inline">
                        <button class="uk-button uk-button-default" type="button">
                            <span class="uk-margin-small-right" uk-icon="icon: chevron-down"></span>
                            <?=$logFile?>
                        </button>

                        <div uk-dropdown="mode: click">
                            <ul class="uk-nav uk-dropdown-nav">
                                <?foreach (the()->fileSystem->logFilesList() as $file):?>
                                    <li class="<?=$file==$logFile?"uk-active":""?>"><a href="?logFile=<?=$file?>"><?=$file?></a></li>
                                <?endforeach;?>
                            </ul>
                        </div>
                    </div>

                    <div class="uk-inline">
                        <a href="?delete=<?=$logFile?>" class="uk-button uk-button-danger" type="button">
                            <span uk-icon="icon:  trash"></span>
                        </a>
                    </div>

                </div>

            <?else:?>
                <span class="uk-label uk-label-danger">pas de logs</span>
            <?endif;?>

        </div>
    </div>





    <hr>

    <?if($reader):?>

    <table class="uk-table uk-table-divider uk-table-hover">
        <thead>
            <tr>
              <th>Level</th>
              <th class="uk-width-medium">Message</th>
              <th class="">.</th>
              <th>extra</th>
              <th>context</th>
              <th class="uk-width-small"><span uk-icon="icon: user"></span> <span uk-icon="icon: laptop"></span></th>
              <th class="uk-width-small"><span uk-icon="icon: clock"></span></th>
            </tr>
        </thead>
        <tbody>

        <?foreach ($logs as $log):?>
            <?if($log):?>
            <?$log=new \Dubture\Monolog\Reader\LineLog($log)?>

            <tr>
                <td><span class="uk-label <?=logLevelToCss($log->level)?>"><?=$log->level?></span></td>
                <td><?=$log->message?></td>
                <td class="td-boot">
                    <div class="boot-elements">
                        <?=bootColorized($log->extra->ip)?>
                        <?=bootColorized($log->extra->sessid)?>
                        <?=bootColorized($log->extra->bootid)?>
                        <?=bootColorized($log->extra->boottime)?>

                    </div>
                </td>
                <td class="code">
                    <b>url</b> <?=$log->extra->url?><br>
                    <b>file</b> <?=$log->extra->file?> @ <?=$log->extra->line?><br>
                    <b>Class/Method</b> <?=$log->extra->class?> <b>/</b> <?=$log->extra->function?>  <br>
                </td>
                <td  class="code"><?=nl2br(pov()->debug->dump($log->context))?></td>
                <td class="time" style="position:relative;">
                    <?=ipColorized($log->extra->ip)?><br>
                    <?=ipColorized($log->extra->os)?><br>
                    <?=ipColorized($log->extra->browser)?>
                    <?/*
                    <pre style="max-width: 500px;word-wrap: break-word;">
                        <?=json_encode($log->extra,JSON_PRETTY_PRINT)?>
                    </pre>
                    */?>
                </td>
                <td class="time"><?=$log->date->format("H:i:s")?><br><?=$log->date->format("Y-m-d")?></td>
            </tr>
            <?endif;?>
        <?endforeach;?>

        </tbody>
    </table>

    <?/*
    <h1>Raw stuffff</h1>
    <?foreach ($reader as $log):?>
        <?var_dump($log)?>
        <hr>
    <?endforeach;?>
    */?>
    <?endif;?>


</div>

<script>
    console.log("in page logs");
    Pov.onBodyReady(function(){

        let $timer=$("#timer");
        let start=new Date();
        let now = new Date();
        let diff= start-now;

        let loop=function(){
            now=new Date();
            diff=now.getTime()-start.getTime();
            diff=new Date(diff);
            display();
            if(diff.getSeconds()>20 && $(document).scrollTop()===0){
                location.reload(true);
            }
        }

        function display(){
                $timer.text(diff.getMinutes()+":"+diff.getSeconds());
        }
        setInterval(loop,200);



    });
</script>

