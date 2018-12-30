import PovUtils from "./PovUtils";
import Xdebug from "./xdebug/Xdebug";
import {PovSSEevent} from "./PovSSEevent";
import md5 from "./md5";


export default class PovApi{

    /**
     * Evoie des données au controleur C_povApi->save
     * Attention le controlleur ne fera rien sans un listener côté PHP
     * @param {object} datas Les données à envoyer
     * @param cb
     */
    static save(datas,cb){
        let url=LayoutVars.rootUrl+"/povApi/save";
        $.ajax({
            dataType: "json",
            url: url,
            method:"post",
            data: datas,
            success: function(result){
                if(cb){
                    cb(result);
                }else{
                    console.log("PovApi.save cb non défini",result);
                }
            },
            error:function(response){
                console.error("oups save",response);
                if(response.responseText){
                    Xdebug.fromString(response.responseText)
                }
            }
        });
    };

    /**
     * Fait appel à C_povApi/action/votreAction
     * @deprecated Utilisez PovApi.actionCB
     * @param {string} actionName le nom de l'action à effectuer
     * @param {object} datas Les données POST à transmettre
     * @returns {Promise<any>}
     */
    static action(actionName,datas){
        return new Promise(function(resolve,reject){
            PovApi.actionCB(actionName,datas,
                function(response){
                    resolve(response);
                },
                function(response){
                    reject(response);
                }
            );
        });
    }

    /**
     *
     * Fait appel à C_povApi/action/votreAction
     *
     * @param {string} actionName le nom de l'action à effectuer
     * @param {object} datas Les données POST à transmettre
     * @param {function} cb Callback de l'action
     * @param {function} cbError Callback en cas d'erreurs bas niveau
     */
    static actionCB(actionName,datas,cb,cbError=null){
        let url=LayoutVars.rootUrl+"/povApi/action/"+actionName;
        if(cbError===null){
            cbError=function(){}
        }
        $.ajax({
            dataType: "json",
            url: url,
            method:"post",
            data: datas,
            success: function(response){
                cb(response);
            },
            error:function(response){
                if(response.responseText){
                    Xdebug.fromString(response.responseText)
                }
                cbError(response);
            }
        });
    }

    /**
     * Evoie des données au controleur C_povApi->delete
     * Attention le controlleur ne fera rien sans un listener côté PHP
     * @param {object} datas Les données à envoyer
     * @param cb
     */
    static delete(datas,cb){
        let url=LayoutVars.rootUrl+"/povApi/delete";
        $.ajax({
            dataType: "json",
            url: url,
            method:"post",
            data: datas,
            success: function(result){
                if(cb){
                    cb(result);
                }else{
                    console.log("PovApi.delete cb non défini",result);
                }
            },
            error:function(response){
                console.error("oups delete",response);
                if(response.responseText){
                    Xdebug.fromString(response.responseText)
                }
            }
        });
    };

    /**
     * Evoie des données au controleur C_povApi->create
     * Attention le controlleur ne fera rien sans un listener côté PHP
     * @param {object} datas Les données à envoyer
     * @param cb
     */
    static create(datas,cb){
        let url=LayoutVars.rootUrl+"/povApi/create";
        $.ajax({
            dataType: "json",
            url: url,
            method:"post",
            data: datas,
            success: function(result){
                if(cb){
                    cb(result);
                }else{
                    console.log("PovApi.create cb non défini",result);
                }
            },
            error:function(response){
                console.error("oups create",response);
                if(response.responseText){
                    Xdebug.fromString(response.responseText)
                }
            }
        });
    }

    /**
     * Upload un fichier en passant par l'api et en le découpant
     * @param {File} file
     * @param {function} cbProgress Renvoie la progression sous forme de : pourcentage, bytesuploadés, bytesTotaux
     * @param {function} cbComplete Renvoie un ApiReturn avec le fichier
     * @param {function} cbError Renvoie un ApiReturn avec les erreurs
     */
    static uploadChuncked(file,cbProgress,cbComplete,cbError){
        let uploadUrl = LayoutVars.rootUrl+"/povApi/upload";

        //--------------1 va tester si le fichier existe déjà----------------
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        function testFileIdentifier(binary){
            let localFileIdentifier=md5(binary);
            let url=uploadUrl;
            $.ajax({
                dataType: "json",
                url: uploadUrl,
                method:"get",
                data: {fileIdentifier:localFileIdentifier},
                cache:false,
                success: function(result){
                    if(result.success){
                        console.log("success fileidentifier",result);
                        cbComplete(result);
                    }else{
                        console.log("error fileidentifier",result);
                        doUpload();
                    }
                },
                error:function(response){
                    console.error("oups testFileIdentifier",response);
                    if(response.responseText){
                        Xdebug.fromString(response.responseText)
                    }
                    cbError(response);
                }
            });
        }
        reader.onloadend = function (evt) {
            let binary = evt.target.result;
            testFileIdentifier(binary);
        };


        //-----------------2 l'upload---------------------------------

        function doUpload(){
            processFile();
            var size, filename, filenametmp;
            function processFile(e) {
                filename=file.name;
                filenametmp=""+new Date().getTime()+file.name;
                size = file.size;
                var sliceSize = 1048576; // 1MB chunk sizes.;
                var start = 0;
                setTimeout(loop, 1);
                function loop() {
                    var end = start + sliceSize;
                    if (size - end < 0) {
                        end = size;
                    }
                    var s = slice(file, start, end);
                    sendChunck(s, start, end,function(json){
                        if (end < size) {
                            start += sliceSize;
                            setTimeout(function(){
                                loop();
                            },1000);
                        }else{
                            cbComplete(json);
                        }
                    });
                }
            }

            function sendChunck(piece, start, end,cbNextChunk) {
                var formdata = new FormData();
                var xhr = new XMLHttpRequest();
                var apiurl=uploadUrl+"?";
                apiurl+="filename="+filename+"&";
                apiurl+="filenametmp="+filenametmp+"&";
                apiurl+="size="+size+"&";
                apiurl+="end="+end+"&";
                xhr.open('POST',apiurl,true);
                formdata.append('chunck', piece);
                xhr.addEventListener("error", function(){
                    alert("error upload 1");
                    console.error("error upload 1")
                    let json=JSON.parse(xhr.response);
                    cbError(json)
                }, false);
                xhr.onload = function(e) {
                    let percentage=Math.floor(100/size*end);
                    let json=JSON.parse(xhr.response);
                    console.log("upload recieve ",filename,""+percentage+"%",e);
                    cbProgress(percentage,end,size);
                    cbNextChunk(json);
                };
                xhr.send(formdata);
                console.log("upload send ",filename,""+Math.floor(100/size*start)+"%");
            }
            /**
             * Formalize file.slice
             */
            function slice(file, start, end) {
                var slice = file.mozSlice ? file.mozSlice :
                    file.webkitSlice ? file.webkitSlice :
                        file.slice ? file.slice : noop;

                return slice.bind(file)(start, end);
            }
            function noop() {}
        }


    }

    /**
     * Upload un fichier en passant par l'api
     * @param {File} file
     * @param {function} cbProgress Renvoie la progression sous forme de : pourcentage, bytesuploadés, bytesTotaux
     * @returns {Promise} retourne un ApiReturn
     */
    static upload(file,cbProgress){

        let xhr = new XMLHttpRequest();
        let uploadUrl = LayoutVars.rootUrl+"/povApi/upload";
        if(file.name){
            uploadUrl+="?filename="+file.name;
        }

        let promise = new Promise(
            function(resolve, reject) {
                var eventSource = xhr.upload || xhr;
                //gèrera le progress
                eventSource.addEventListener("progress", function (e) {
                    // get percentage of how much of the current file has been sent
                    var position = e.position || e.loaded;
                    var total = e.totalSize || e.total;
                    var percentage = Math.round((position / total) * 100);
                    console.log("UPLOAD PROGRESS",percentage);
                    if(cbProgress){
                        cbProgress(percentage,position,total);
                    }
                });

                var reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onloadend = function (evt) {



                    function testFileIdentifier(){
                        let localFileIdentifier=md5(binary);
                        let url=LayoutVars.rootUrl+"/povApi/upload";

                        $.ajax({
                            dataType: "json",
                            url: url,
                            method:"get",
                            data: {fileIdentifier:localFileIdentifier},
                            cache:false,
                            success: function(result){
                                if(result.success){
                                    console.log("success fileidentifier",result);
                                    resolve(result);
                                }else{
                                    console.log("error fileidentifier",result);
                                    doUpload();
                                }
                            },
                            error:function(response){
                                console.error("oups testFileIdentifier",response);
                                if(response.responseText){
                                    Xdebug.fromString(response.responseText)

                                }
                                reject();
                            }
                        });
                    }

                    function doUpload(){
                        xhr.open("POST", uploadUrl, true);
                        // make sure we have the sendAsBinary method on all browsers
                        XMLHttpRequest.prototype.mySendAsBinary = function (text) {
                            var data = new ArrayBuffer(text.length);
                            var ui8a = new Uint8Array(data, 0);
                            for (var i = 0; i < text.length; i++) ui8a[i] = (text.charCodeAt(i) & 0xff);
                            var blob;
                            if (typeof window.Blob === "function") {
                                blob = new Blob([data]);
                            } else {
                                var bb = new (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)();
                                bb.append(data);
                                blob = bb.getBlob();
                            }
                            console.log("send file");
                            this.send(blob);
                        };
                        // state change observer - we need to know when and if the file was successfully uploaded
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    xhr.onreadystatechange = function () {
                                        //prevent multiple calls};
                                    };
                                    var json=JSON.parse(xhr.response);
                                    // process success
                                    console.log("EVENT UPLOAD SUCCESS",json);
                                    console.log("distantFileIdentifier obj",json.json.record.fileidentifier);
                                    resolve(json);
                                } else {
                                    // process error
                                    console.error("EVENT UPLOAD ERROR",xhr.status,xhr);
                                    reject();
                                }
                            }else{
                                console.log("UPLOAD ready state",xhr.readyState);
                            }
                        };
                        // start sending
                        xhr.mySendAsBinary(evt.target.result);
                    }

                    var binary = evt.target.result;
                    testFileIdentifier();
                };
            }
        );
        return promise;



    }

    /**
     * Charge la vue et remplace l'élément DOM ainsi obtenu.
     * Une fois l'opération terminée dispatche un évênement Pov.events.DOM_CHANGE.
     * @param {string} viewPath Chemin vers le template php
     * @param {JQuery} $toReplace Objet DOM à remplacer.
     * Si l'élément $toReplace a un attribut pov-v-dom-selector c'est ce selecteur DOM qui sera utilisé
     * @param {object} datas Les données à transmettre au controleur
     * @param {function} cb
     * @return {XMLHttpRequest}
     * //todo opti mettre un petit delay/cache pour éviter de faire plusieurs fois le même appel dans la même seconde
     */
    static getView(viewPath, $toReplace,datas={},cb) {
        let url=LayoutVars.rootUrl+"/povApi/getView";
        datas["viewPath"]=viewPath;
        datas["isAjax"]=true;
        if($toReplace){
            /**
             * @type {string}
             */
            let refreshSelector=$toReplace.attr("pov-v-dom-selector");
            if(refreshSelector){
                $toReplace=$toReplace.evalHere(refreshSelector);
            }
            $toReplace.addClass("pov-api-refreshing");
        }

        //$toReplace.empty();
        let xhr=$.ajax({
            dataType: "json",
            url: url,
            method:"get",
            data: datas,
            cache:false,
            success: function(result){
                if(result.success){
                    let $repl=$(result.html);
                    if($toReplace){
                        if($toReplace.attr("data-pov-refresh-method")==="html"){
                            $toReplace.html($repl);
                            $toReplace.removeClass("pov-api-refreshing");
                        }else{
                            $toReplace.replaceWith($repl);
                        }
                    }

                    Pov.events.dispatchDom($repl,Pov.events.DOM_CHANGE);
                    if(cb){
                        cb($repl);
                    }
                }else{
                    if($toReplace){
                        Pov.events.dispatchDom($toReplace,PovApi.EVENT_ERROR);
                    }

                    console.error(result);
                }
            },
            error:function(response){
                if(response.statusText==="abort"){
                    return; // ce n'est pas une vraie erreur on a simplement abort la requete
                }
                console.error("oups getView...",response);
                if(response.responseText){
                    Xdebug.fromString(response.responseText)
                }
            }
        });

        return xhr;
    }

    /**
     * Renvoie l'url d'une image formattée
     * @param {string} imageUrl L'url de l'image (en local par rapport au serveur)
     * @param {string} formatUrl Une url d'image avec les paramètres de sive
     * @param {boolean} preserveGif
     * @returns {Promise}
     */
    static imageFormat(imageUrl,formatUrl,preserveGif=false){
        let url=LayoutVars.rootUrl+"/povApi/getImageFormat";
        return new Promise(
            function(resolve, reject) {
                $.ajax({
                    dataType: "json",
                    url: url,
                    method:"post",
                    data: {
                        imageUrl:imageUrl,
                        formatUrl:formatUrl,
                        preserveGif:preserveGif,
                    },
                    cache:false,
                    success: function(result){
                        if(result.success){
                            resolve(result.json.result);
                        }else{
                            reject("erreur de formattage d'image (1)")
                        }
                    },
                    error:function(response){
                        console.error("oups imageFormat",response);
                        if(response.responseText){
                            Xdebug.fromString(response.responseText)
                        }
                        reject("erreur de formattage d'image (2)")
                    }
                });
            }
        );
    }

    /**
     * Commence à écouter un nouveau SSE stream (Server-Sent Events)
     * @returns {EventSource}
     */
    static listenSSE(){

        require('eventsource-polyfill');
        let url=LayoutVars.rootUrl+"/povApi/sse/"+PovUtils.uid();
        var evtSource = new EventSource(url);



        evtSource.onerror = function(e) {
            if (evtSource.readyState === 2) {
                //déconnexion définitive
                console.error("SSE déconnecté...on retentera dans 5 secondes",e);
                setTimeout(function(){
                    console.error("SSE reconnection",e);
                    window.povSSE.setSource(PovApi.listenSSE());
                },5000); //essaye de se reconnecter dans 5 secondes
            }
            if (evtSource.readyState === 0) {
                console.log("SSE déco tmp",e);
                //déconnexion temporaire
            }
        };

        return evtSource;
    }



}
/**
 *
 * @type {string}
 */
PovApi.EVENT_ERROR="POV_API_ERROR";





