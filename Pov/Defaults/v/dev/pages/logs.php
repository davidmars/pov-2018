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
            <?php if($reader || the()->fileSystem->logFilesList()):?>

                <div class="uk-button-group">

                    <div class="uk-inline">
                        <button class="uk-button uk-button-default" type="button">
                            <span class="uk-margin-small-right" uk-icon="icon: chevron-down"></span>
                            <?php echo $logFile?>
                        </button>

                        <div uk-dropdown="mode: click">
                            <ul class="uk-nav uk-dropdown-nav">
                                <?php foreach (the()->fileSystem->logFilesList() as $file):?>
                                    <li class="<?php echo $file==$logFile?"uk-active":""?>"><a href="?logFile=<?php echo $file?>"><?php echo $file?></a></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>

                    <div class="uk-inline">
                        <a href="?delete=<?php echo $logFile?>" class="uk-button uk-button-danger" type="button">
                            <span uk-icon="icon:  trash"></span>
                        </a>
                    </div>

                </div>

            <?php else: ?>
                <span class="uk-label uk-label-danger">pas de logs</span>
            <?php endif; ?>

        </div>
    </div>





    <hr>

    <?php if($reader):?>

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

        <?php foreach ($logs as $log):?>
            <?php if($log):?>
            <?php $log=new \Dubture\Monolog\Reader\LineLog($log)?>

            <tr>
                <td><span class="uk-label <?php echo logLevelToCss($log->level)?>"><?php echo $log->level?></span></td>
                <td><?php echo $log->message?></td>
                <td class="td-boot">
                    <div class="boot-elements">
                        <?php echo bootColorized($log->extra->ip)?>
                        <?php echo bootColorized($log->extra->sessid)?>
                        <?php echo bootColorized($log->extra->bootid)?>
                        <?php echo bootColorized($log->extra->boottime)?>

                    </div>
                </td>
                <td class="code">
                    <b>url</b> <?php echo $log->extra->url?><br>
                    <b>file</b> <?php echo $log->extra->file?> @ <?php echo $log->extra->line?><br>
                    <b>Class/Method</b> <?php echo $log->extra->class?> <b>/</b> <?php echo $log->extra->function?>  <br>
                </td>
                <td  class="code"><?php echo nl2br(pov()->debug->dump($log->context))?></td>
                <td class="time" style="position:relative;">
                    <?php echo ipColorized($log->extra->ip)?><br>
                    <?php echo ipColorized($log->extra->os)?><br>
                    <?php echo ipColorized($log->extra->browser)?>
                    <?php /*
                    <pre style="max-width: 500px;word-wrap: break-word;">
                        <?php echo json_encode($log->extra,JSON_PRETTY_PRINT)?>
                    </pre>
                    */?>
                </td>
                <td class="time"><?php echo $log->date->format("H:i:s")?><br><?php echo $log->date->format("Y-m-d")?></td>
            </tr>
            <?php endif; ?>
        <?php endforeach; ?>

        </tbody>
    </table>

    <?php /*
    <h1>Raw stuffff</h1>
    <?php foreach ($reader as $log):?>
        <?php var_dump($log)?>
        <hr>
    <?php endforeach; ?>
    */?>
    <?php endif; ?>


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

