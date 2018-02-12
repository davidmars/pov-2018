/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_VALUES = {
    emitDelay: 10,
    strictMode: false
};

/**
 * @typedef {object} EventEmitterListenerFunc
 * @property {boolean} once
 * @property {function} fn
 */

/**
 * @class EventEmitter
 *
 * @private
 * @property {Object.<string, EventEmitterListenerFunc[]>} _listeners
 * @property {string[]} events
 */

var EventEmitter = function () {

    /**
     * @constructor
     * @param {{}}      [opts]
     * @param {number}  [opts.emitDelay = 10] - Number in ms. Specifies whether emit will be sync or async. By default - 10ms. If 0 - fires sync
     * @param {boolean} [opts.strictMode = false] - is true, Emitter throws error on emit error with no listeners
     */

    function EventEmitter() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_VALUES : arguments[0];

        _classCallCheck(this, EventEmitter);

        var emitDelay = void 0,
            strictMode = void 0;

        if (opts.hasOwnProperty('emitDelay')) {
            emitDelay = opts.emitDelay;
        } else {
            emitDelay = DEFAULT_VALUES.emitDelay;
        }
        this._emitDelay = emitDelay;

        if (opts.hasOwnProperty('strictMode')) {
            strictMode = opts.strictMode;
        } else {
            strictMode = DEFAULT_VALUES.strictMode;
        }
        this._strictMode = strictMode;

        this._listeners = {};
        this.events = [];
    }

    /**
     * @protected
     * @param {string} type
     * @param {function} listener
     * @param {boolean} [once = false]
     */


    _createClass(EventEmitter, [{
        key: '_addListenner',
        value: function _addListenner(type, listener, once) {
            if (typeof listener !== 'function') {
                throw TypeError('listener must be a function');
            }

            if (this.events.indexOf(type) === -1) {
                this._listeners[type] = [{
                    once: once,
                    fn: listener
                }];
                this.events.push(type);
            } else {
                this._listeners[type].push({
                    once: once,
                    fn: listener
                });
            }
        }

        /**
         * Subscribes on event type specified function
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'on',
        value: function on(type, listener) {
            this._addListenner(type, listener, false);
        }

        /**
         * Subscribes on event type specified function to fire only once
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'once',
        value: function once(type, listener) {
            this._addListenner(type, listener, true);
        }

        /**
         * Removes event with specified type. If specified listenerFunc - deletes only one listener of specified type
         * @param {string} eventType
         * @param {function} [listenerFunc]
         */

    }, {
        key: 'off',
        value: function off(eventType, listenerFunc) {
            var _this = this;

            var typeIndex = this.events.indexOf(eventType);
            var hasType = eventType && typeIndex !== -1;

            if (hasType) {
                if (!listenerFunc) {
                    delete this._listeners[eventType];
                    this.events.splice(typeIndex, 1);
                } else {
                    (function () {
                        var removedEvents = [];
                        var typeListeners = _this._listeners[eventType];

                        typeListeners.forEach(
                        /**
                         * @param {EventEmitterListenerFunc} fn
                         * @param {number} idx
                         */
                        function (fn, idx) {
                            if (fn.fn === listenerFunc) {
                                removedEvents.unshift(idx);
                            }
                        });

                        removedEvents.forEach(function (idx) {
                            typeListeners.splice(idx, 1);
                        });

                        if (!typeListeners.length) {
                            _this.events.splice(typeIndex, 1);
                            delete _this._listeners[eventType];
                        }
                    })();
                }
            }
        }

        /**
         * Applies arguments to specified event type
         * @param {string} eventType
         * @param {*[]} eventArguments
         * @protected
         */

    }, {
        key: '_applyEvents',
        value: function _applyEvents(eventType, eventArguments) {
            var typeListeners = this._listeners[eventType];

            if (!typeListeners || !typeListeners.length) {
                if (this._strictMode) {
                    throw 'No listeners specified for event: ' + eventType;
                } else {
                    return;
                }
            }

            var removableListeners = [];
            typeListeners.forEach(function (eeListener, idx) {
                eeListener.fn.apply(null, eventArguments);
                if (eeListener.once) {
                    removableListeners.unshift(idx);
                }
            });

            removableListeners.forEach(function (idx) {
                typeListeners.splice(idx, 1);
            });
        }

        /**
         * Emits event with specified type and params.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emit',
        value: function emit(type) {
            var _this2 = this;

            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                eventArgs[_key - 1] = arguments[_key];
            }

            if (this._emitDelay) {
                setTimeout(function () {
                    _this2._applyEvents.call(_this2, type, eventArgs);
                }, this._emitDelay);
            } else {
                this._applyEvents(type, eventArgs);
            }
        }

        /**
         * Emits event with specified type and params synchronously.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emitSync',
        value: function emitSync(type) {
            for (var _len2 = arguments.length, eventArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                eventArgs[_key2 - 1] = arguments[_key2];
            }

            this._applyEvents(type, eventArgs);
        }

        /**
         * Destroys EventEmitter
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this._listeners = {};
            this.events = [];
        }
    }]);

    return EventEmitter;
}();

module.exports = EventEmitter;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_event_emitter_es6__);


class PovEvents extends __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6___default.a{

    constructor(){
        super();

        this.READY="POV_EVENT_READY";
        /**
         *
         */
        this.DOM_CHANGE="POV_EVENT_DOM_CHANGE";
        /**
         * ready ou dom change
         */
        this.DOM_CHANGE_OR_READY="POV_EVENT_READY POV_EVENT_DOM_CHANGE";
        /**
         * Dispatche l'event donné depuis l'élément donné
         * @param $domElement
         * @param EVENT_NAME
         */

    }

    /**
     * Faity tout simplement un trigger sur un objet jquery
     * @param {JQuery} $domElement
     * @param {string} EVENT_NAME
     */
    dispatchDom($domElement,EVENT_NAME){
        "use strict";
        $domElement.trigger(EVENT_NAME);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = PovEvents;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_event_emitter_es6__);

/**
 * Parse les erreurs xdebug dans du html et les renvoie vers la console du navigateur
 */
class Xdebug{
    /**
     *
     * @param {JQuery} $xdebugTag
     */
    constructor($xdebugTag){
        $xdebugTag.addClass("xdebug-init");
        /**
         * Tout le contenu texte de l'erreur
         * @type {JQuery|string}
         */
        this.fullError=$xdebugTag.text();
        /**
         * Le message d'erreur
         * @type {JQuery|string}
         */
        this.firstLine=$xdebugTag.find("th,.pov-error").first().text();
        if(!this.firstLine){
            console.error("xdebug tag détecté mais impossible de trouver le message");
            this.firstLine=$xdebugTag.text();
        }
        console.error(this.fullError);
        Pov.events.emit(EVENTS.XDEBUG_DETECTED,this);

    }

    /**
     * Détecte et gère toutes les erreurs xdebug (non encore détectées)  dans le DOM.
     */
    static fromDom(){
        $(".xdebug-error").not(".xdebug-init").each(function(){
            new Xdebug($(this));
        })
    }

    /**
     * Gère les erreurs xdebug à partir d'un texte
     * @param str
     */
    static fromString(str){
        let $el=$("<div>"+str+"</div>");
        let $tags=$el.find(".xdebug-error").not(".xdebug-init");
        $tags.each(function(){
            new Xdebug($(this));
        });
        if($tags.length===0){
            console.log("xdebug problème pour trouver les erreurs...");
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Xdebug;




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PovUtils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PovSSEevent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__md5__ = __webpack_require__(13);






class PovApi{

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
                    __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__["a" /* default */].fromString(response.responseText)
                }
            }
        });
    };

    /**
     *
     * @param {string} actionName le nom de l'action à effectuer
     * @param datas
     * @returns {Promise<any>}
     */
    static action(actionName,datas){
        let url=LayoutVars.rootUrl+"/povApi/action/"+actionName;
        return new Promise(function(resolve,reject){
            $.ajax({
                dataType: "json",
                url: url,
                method:"post",
                data: datas,
                success: function(result){
                    resolve(result);
                },
                error:function(response){
                    if(response.responseText){
                        __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__["a" /* default */].fromString(response.responseText)
                    }
                    reject(response);

                }
            });
        });


    }

    /**
     * Evoie des données au controleur C_povApi->save
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
                    __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__["a" /* default */].fromString(response.responseText)
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
                    __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__["a" /* default */].fromString(response.responseText)
                }
            }
        });
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
                        let localFileIdentifier=Object(__WEBPACK_IMPORTED_MODULE_3__md5__["a" /* default */])(binary);
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
                                    __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__["a" /* default */].fromString(response.responseText)

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
     * //todo opti mettre un petit delay/cache pour éviter de faire plusieurs fois le même appel dans la même seconde
     */
    static getView(viewPath, $toReplace,datas={},cb) {
        let url=LayoutVars.rootUrl+"/povApi/getView";
        datas["viewPath"]=viewPath;
        datas["isAjax"]=true;
        /**
         * @type {string}
          */
        let refreshSelector=$toReplace.attr("pov-v-dom-selector");
        if(refreshSelector){
            $toReplace=$toReplace.evalHere(refreshSelector);
        }
        $toReplace.addClass("pov-api-refreshing");
        //$toReplace.empty();
        $.ajax({
            dataType: "json",
            url: url,
            method:"get",
            data: datas,
            cache:false,
            success: function(result){
                if(result.success){
                    let $repl=$(result.html);
                    if($toReplace.attr("data-pov-refresh-method")==="html"){
                        $toReplace.html($repl);
                        $toReplace.removeClass("pov-api-refreshing");
                    }else{
                        $toReplace.replaceWith($repl);
                    }
                    Pov.events.dispatchDom($repl,Pov.events.DOM_CHANGE);
                    if(cb){
                        cb($repl);
                    }
                }else{
                    Pov.events.dispatchDom($toReplace,PovApi.EVENT_ERROR);
                    console.error(result);
                }
            },
            error:function(response){
                console.error("oups getView...",response);
                if(response.responseText){
                    __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__["a" /* default */].fromString(response.responseText)
                }
            }
        });
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
                            __WEBPACK_IMPORTED_MODULE_1__xdebug_Xdebug__["a" /* default */].fromString(response.responseText)
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

        __webpack_require__(14);
        let url=LayoutVars.rootUrl+"/povApi/sse/"+__WEBPACK_IMPORTED_MODULE_0__PovUtils__["a" /* default */].uid();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = PovApi;

/**
 *
 * @type {string}
 */
PovApi.EVENT_ERROR="POV_API_ERROR";







/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PovSSEevent{
    constructor(data){
        /**
         *
         * @type {string}
         */
        this.id=data.id;
        /**
         *
         * @type {string} Message à logger
         */
        this.devMessage=data.devMessage;
        /**
         *
         * @type {string} Message à afficher
         */
        this.humanMessage=data.humanMessage;
        /**
         *
         * @type {string} quand YYYY-MM-dd HH:MM:SS
         */
        this.time=data.time;
        /**
         *
         * @type {object} données additionelles
         */
        this.vars=data.vars;
        /**
         *
         * @type {string} Type d'event
         */
        this.type=data.type;

        if(this.devMessage){
            console.log("SSE",this.devMessage,this);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PovSSEevent;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PovEvents__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Pov__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PovHistory__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PovApi__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Stage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PovSSE__ = __webpack_require__(17);
//les libs indispensables



__webpack_require__(6);

window.$=document.$ = window.jQuery = __webpack_require__(7);
__webpack_require__(8);

//notre m

window.Pov=__WEBPACK_IMPORTED_MODULE_1__Pov__["a" /* default */];

__WEBPACK_IMPORTED_MODULE_1__Pov__["a" /* default */].events=new __WEBPACK_IMPORTED_MODULE_0__PovEvents__["a" /* default */]();

//pour gérer une navigation ajax

window.PovHistory =__WEBPACK_IMPORTED_MODULE_2__PovHistory__["a" /* default */];

//pour communiquer avec le serveur

window.PovApi =__WEBPACK_IMPORTED_MODULE_3__PovApi__["a" /* default */];




window.povSSE=new __WEBPACK_IMPORTED_MODULE_5__PovSSE__["a" /* default */](null);


/**
 *
 * @type {Stage}
 */
var STAGE=window.STAGE= new __WEBPACK_IMPORTED_MODULE_4__Stage__["a" /* default */]();

$( document ).ready(function() {
    //console.log("jquery ready (pov.boot.js) ");
    /**
     * La balise body
     * @type {jQuery}
     */
    window.$body=$("body");

    __WEBPACK_IMPORTED_MODULE_1__Pov__["a" /* default */].onBodyReady(function(){
        "use strict";
    });

    //appelle tout ce qui a été enregistré autre part
    $(function(){
        for(let i=0;i<__WEBPACK_IMPORTED_MODULE_1__Pov__["a" /* default */].__onBodyReadyCallBacks.length;i++){
            __WEBPACK_IMPORTED_MODULE_1__Pov__["a" /* default */].__onBodyReadyCallBacks[i]();
        }
        __WEBPACK_IMPORTED_MODULE_1__Pov__["a" /* default */].__init();
    });



});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Constantes pour les events
 */
var EVENTS={

    /**
     * un élément devient visible ou masqué
     */
    VISIBILITY_CHANGE:"VISIBILITY_CHANGE",
    /**
     * un élément vient devient visible
     */
    VISIBLE:"VISIBLE",
    /**
     * un element vient d'être masqué
     */
    HIDDEN:"HIDDEN",
    /**
     * Rediemtionnement d'un élement (la fenêtre navigateur par exemple ;)
     */
    RESIZE:"RESIZE",
    /**
     * Ev^nement de scroll
     */
    SCROLL:"SCROLL",
    /**
     * Mouvement de souris
     */
    MOUSE_MOVE:"MOUSE_MOVE",
    /**
     * Changement d'orientation
     */
    ORIENTATION_CHANGE:"ORIENTATION_CHANGE",
    /**
     * Entrée ou sortie du full screen
     */
    FULL_SCREEN_CHANGE:"FULL_SCREEN_CHANGE",
    /**
     * Entrée en mode full screen
     */
    FULL_SCREEN_ENTER:"FULL_SCREEN_ENTER",
    /**
     * Sortie du full screen
     */
    FULL_SCREEN_CANCEL:"FULL_SCREEN_CANCEL",

    CLOSE:"CLOSE",
    OPEN:"OPEN",

    SAVED:"SAVED",
    /**
     * Pour désigner un évênement de sélection
     */
    SELECT:"SELECT",
    /**
     * History étape 1 Quand l'url change
     */
    HISTORY_CHANGE_URL:"HISTORY_CHANGE_URL",
    /**
     * History étape 2 Quand l'url a changé et qu'on a commencé à charger la page
     */
    HISTORY_CHANGE_URL_LOADING:"HISTORY_CHANGE_URL_LOADING",
    /**
     * History étape 3 Quand l'url a changé et que la page est chargée (mais pas injectée)
     */
    HISTORY_CHANGE_URL_LOADED:"HISTORY_CHANGE_URL_LOADED",
    /**
     * History étape 4 Quand l'url a changé, que la page est chargée ET injectée dans le DOM
     */
    HISTORY_CHANGE_URL_LOADED_INJECTED:"HISTORY_CHANGE_URL_LOADED_INJECTED",
    /**
     * l'upload de fichier est terminé
     */
    UPLOAD_COMPLETE:"UPLOAD_COMPLETE",

    /**
     * Emis quand un nouvel objet xdebug est instancié, le paramètre est l'objet xdebug
     */
    XDEBUG_DETECTED:"XDEBUG_DETECTED",

    /**
     * Evènement server qui dit si l'utilisateur est loggué en wysiwyg ou non (voir dans vars)
     * @type {string}
     */
    SSE_USER_IS_WYSIWYG:"SSE_USER_IS_WYSIWYG",
    /**
     * Evènement server qui dit que l'utilisateur vient de se logger
     * @type {string}
     */
    SSE_USER_LOGIN:"SSE_USER_LOGIN",
    /**
     * Evènement server qui dit que l'utilisateur vient de se dé-logger
     * @type {string}
     */
    SSE_USER_LOGOUT:"SSE_USER_LOGOUT",
    /**
     * Evènement server qui envoie une log
     * @type {string}
     */
    SSE_DEBUG_LOG:"debug.log",
    /**
     * Quand le serveur nous dit que le nombre de records a changé
     */
    SSE_DB_COUNT_CHANGE:"SSE_DB_COUNT_CHANGE",
    /**
     * Quand le serveur nous dit qu'un record a été effacé
     */
    SSE_DB_TRASH:"SSE_DB_TRASH",
    /**
     * Quand le serveur nous dit qu'un record a été modifié
     */
    SSE_DB_CHANGE:"SSE_DB_CHANGE",
    /**
     * Evènement server qui dit qu'il y a eu une modification sur les utilisateurs
     */
    SSE_USER_CHANGE:"SSE_USER_CHANGE",
    /**
     * Evènement server qui dit d'afficher une info
     * @type {string}
     */
    SSE_INFO:"info",
};

window.EVENTS=EVENTS;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Quelques methodes jquery paratiques
 * @external "JQuery.fn"
 */
(
    /**
     *
     * @param {JQuery} $
     */
    function ($) {
    /**
     * Retire toutes les classes qui commencent par prefix dans l'élément
     * @param {string} prefix
     * @returns {JQuery}
     */
    $.fn.removeClassPrefix = function(prefix) {
        "use strict";
        this.each(function(i, el) {
            var classes = el.className.split(" ");
            var classes2=[];
            for(var c = 0; c <classes.length; c++){
                if(String(classes[c]).indexOf(prefix)===0){
                }else{
                    classes2.push(classes[c]) ;
                }
            }
            el.className = $.trim(classes2.join(" "));
        });
        return this;
    };

    /**
     * Fais un eval dont le contexte est l'élément jquery.
     * '$(this)' fait référence à l'objet dom utilisé
     * @param {string} selector exemple: $(this).closest('div').find('pre')
     * @returns {JQuery}
     */
    $.fn.evalHere=function(selector){
        "use strict";
        //selector=selector.replace("$(this)","$(this)");
        return eval(selector)
    };

        /**
         *
         * Rafraichit la vue d'un élément dom (ou d'une selection) qui a un attribut data-pov-v-path
         * @param {function} cb Callback une fois que le refresh aura eu lieu, l'argument est l'élément dom qui a été rafraichit
         */
    $.fn.povRefresh=function (cb) {
        "use strict";
        //console.log("will refresh...");

        /**
         * @param {JQuery} $el
         */
        function doIt($el){
            var focusPos=0;
            var focusSelector=null;
            var focusType=null;
            console.log("refresh...",$el);
            let $focused=$el.find(":focus");
            if($focused.length>0 && !$focused.is("[refresh-dont-care-focus='true']")){
                console.log("focus détecté",$el);
                focusPos = $focused[0].selectionStart;
                focusSelector=$focused[0].tagName+"[wysiwyg-var='"+$focused.attr("wysiwyg-var")+"'][wysiwyg-id='"+$focused.attr("wysiwyg-id")+"'][wysiwyg-type='"+$focused.attr("wysiwyg-type")+"']";
                cb=function(){
                    $(focusSelector).focus();
                    var elem=$(focusSelector)[0];
                    if (elem.setSelectionRange && /text|search|password|tel|url/i.test(elem.type || '')) {
                        elem.setSelectionRange(focusPos,focusPos);
                    }

                    if(cb){
                        //cb(); todo important checker ce cb recursif de merde
                        //cb(); todo important faire une loading plus joli que ce clignotement foireux
                    }
                };
            }
            var view=$el.attr("data-pov-v-path");
            var uid=$el.attr("data-pov-vv-uid");
            if(!view){
                console.error("povRefresh impossible sur cet element, pas d'attribut data-pov-v-path",$el);
            }else{
                PovApi.getView(view,$el,{uid:uid},cb)
            }
        }
        $(this).each(function(){
            doIt($(this));
        })

    };
    /**
     * Ces variables sont des variables qui seront utilisées pour enregistrer des valeurs additioneles
     * Utilisé par exemple par PovApi pour enregistrer des valeurs dans les ListItem
     * @returns {*} Les data moreVars
     */
    $.fn.getMoreVars=function(){
        "use strict";
        if($(this).data("moreVars")){
            return $(this).data("moreVars");
        }else{
            return {};
        }
    };
    /**
     * Ajoute une variable à data moreVars
     * @param varName
     * @param value
     */
    $.fn.setMoreVars=function(varName,value){
        "use strict";
        var more=$(this).getMoreVars();
        more[varName]=value;
        $(this).data("moreVars",more);

    }



})(jQuery);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PovEvents__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_emitter_es6__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_emitter_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_event_emitter_es6__);


__webpack_require__(10);



class Pov{

    static __init(){
        let me=this;
        console.log("---------------Pov.EVENT_READY-------------------");
        Pov.events.dispatchDom($body,Pov.events.READY);
    }

    /**
     * Enregistre une fonction à exécuter quand le $body sera prêt.
     * @param cb
     */
    static onBodyReady(cb){
        if(window.$body){
            cb(); //si $body est déjà là on y va
        }else{
            Pov.__onBodyReadyCallBacks.push(cb); //sinon on le fera plus tard
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pov;

Pov.__onBodyReadyCallBacks=[];









/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xdebug_Xdebug__ = __webpack_require__(2);
/**
 * attributs html
 * [history-hrefs]='on s'en fout' les a[href] seront des liens ajax là dedans
 * [history-hrefs] [history-hrefs='disabled'] pour désactiver les liens ajax au sein d'un [history-hrefs]
 *
 *
 */


class PovHistory{

    static init(){
        let me=this;
        //initialise les href qui sont dans un [history-hrefs]
        $body.on("click","[history-hrefs] a",function(e){
            let $href=$(this);
            if($href.is("[href^='#']")){
                e.isAnchorClick=true;
                return;
            }
            if(me.isHrefHistory($href)){
                me.goUrl($href.attr('href'),$href,e);
                e.preventDefault();
                return false;
            }else{
                console.log("PovHistory","lien non compatible");
            }
        });
        window.onpopstate=function(event){
            let url=location.href;
            console.log("Back / next button?",event);
            console.log("url is...",url);
            if(!url.match(/#/)){
                me.goUrl(url,null,event);
            }else{
                console.log("#anchor = pas d'ajax");
            }

        };

        Pov.onBodyReady(function(){
            PovHistory.currentPageInfo=window.pageInfo;
        })



    }

    /**
     * Change l'url (pushstate)
     * @param {String} url
     * @param {jQuery} $href
     * @param {Event} event
     * @param {Boolean} preventPushState si true ne rajoute pas l'url à l'history (utilisé pour les back / prev)
     */
    static goUrl(url,$href,event,preventPushState=false){
        console.log("goUrl",url,$href,event);
        if(!preventPushState){
            history.pushState({ url: url }, "...",url,true );
        }
        Pov.events.dispatchDom($body,EVENTS.HISTORY_CHANGE_URL);
        this.loadPage(url);
    }

    static goToHomePage(){
        PovHistory.goUrl(LayoutVars.rootUrl);
    }

    /**
     * Charge l'url en ajax json
     * @param {string} url
     * @param {function} cb eventuellement fonction de callback qui permet d'injecter comme on veut le html
     */
    static loadPage(url,cb){
        Pov.events.dispatchDom($body,EVENTS.HISTORY_CHANGE_URL_LOADING);
        $.ajax({
            dataType: "json",
            url: url,
            data: {
                povHistory:true
            },
            success: function(e){
                //console.log("loadED page",url);
                //console.log("loadED page result",e);
                Pov.events.dispatchDom($body,EVENTS.HISTORY_CHANGE_URL_LOADED);
                if(cb){
                    cb(e);
                }else{
                    if(e.html){
                        PovHistory.injectHtml(e.html);
                    }
                    if(e.json.meta){
                        PovHistory.setMeta(e.json.meta);
                        PovHistory.currentPageInfo=e.json.pageInfo;
                    }
                }


            },
            error:function(e,t,err){
                __WEBPACK_IMPORTED_MODULE_0__xdebug_Xdebug__["a" /* default */].fromString(e.responseText);
            }
        });
    }

    /**
     * Définit les meta de la page html.
     * Utilisé après une changement d'url via history
     * @param {object} meta les données meta (meta.title par exemple pour le page title)
     */
    static setMeta(meta){
        if(meta){
            if(meta.title){
                document.title=meta.title;
            }
        }
    }

    /**
     * injecte le html dans [history-receiver]
     * Si PovHistory.readyToinject est false alors la fonction ne fera le job que quand ce sera sur true
     * @param {string} html
     */
    static injectHtml(html){
        if(PovHistory.readyToinject){
            let $target=$("[history-receiver]");
            $target.html(html);
            Pov.events.dispatchDom($target,Pov.events.DOM_CHANGE);
            Pov.events.dispatchDom($target,EVENTS.HISTORY_CHANGE_URL_LOADED_INJECTED);
        }else{
            //console.log("pas prêt pour injecter la page, on réésayera");
            setTimeout(function(){
                PovHistory.injectHtml(html);
            },200);
        }

    }

    /**
     * Teste si l'élément href donné est éligible pour PovHistory
     * @param {jQuery} $href
     * @returns {boolean} false si il y a un attribut target, si l'url est en http si la balise n'est pas marquée par [history-hrefs='disabled'] a
     */
    static isHrefHistory($href){
        //virer les liens [href^='#']
        if($href.is("[href^='#']")){
            return false;
        }
        //virer les liens avec http au début
        if($href.is("[href^='//'],[href^='http://'],[href^='https://']")){
            return false;
        }
        //virer les liens avec attribut target
        if($href.is("[target]")){
            return false;
        }
        //virer les liens dans les [history-hrefs='disabled']
        if($href.is("[history-hrefs='disabled'] a")){
            return false;
        }
        //todo virer les urls qui ne sont pas regexp conpatible avec $project->baseUrl
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PovHistory;


/**
 * Si défini sur false n'injectera pas le html tant que ce ne sera pas redéfini sur true
 * @type {boolean}
 */
PovHistory.readyToinject=true;
/**
 * Données relative à la page en cours
 * @type {object}
 */
PovHistory.currentPageInfo={};






/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PovUtils{
    /**
     * un id unique
     * @returns {string}
     * @see https://stackoverflow.com/a/105074/1204822
     */
    static uid(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     *
     * @param {number} inputValue
     * @param {number} inputMax
     * @param {number} outputMax
     * @param {number} inputMin
     * @param {number} outputMin
     * @returns {number}
     */
    static ratio(inputValue, inputMax, outputMax, inputMin=.0, outputMin=.0){
        let product = (inputValue - inputMin) / (inputMax - inputMin);
        return ((outputMax - outputMin) * product) + outputMin;
    };

    /**
     * html entity decode
     * @param html
     * @returns {string}
     */
    static decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    /**
     * Dédoublonne le tableau et le renvoie
     * @param {array} array
     * @returns {array}
     */
    static arrayUnique(array){
        array = array.reverse().filter(function (e, i, arr) {
            return array.indexOf(e, i+1) === -1;
        }).reverse();
        return array;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PovUtils;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = md5;
function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
var txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
+ hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
function add32(x, y) {
var lsw = (x & 0xFFFF) + (y & 0xFFFF),
msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
   * CommonJS module that exports EventSource polyfill version 0.9.6
   * This module is intended for browser side use
   * =====================================================================
   * THIS IS A POLYFILL MODULE, SO IT HAS SIDE EFFECTS
   * IT AUTOMATICALLY CHECKS IF window OBJECT DEFINES EventSource
   * AND ADD THE EXPORTED ONE IN CASE IT IS UNDEFINED
   * =====================================================================
   * Supported by sc AmvTek srl
   * :email: devel@amvtek.com
 */


var PolyfillEventSource = __webpack_require__(15).EventSource;
module.exports = PolyfillEventSource;

// Add EventSource to window if it is missing...
if (window && !window.EventSource){
    window.EventSource = PolyfillEventSource;
    if (console){
	console.log("polyfill-eventsource added missing EventSource to window");
    }
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*
   * EventSource polyfill version 0.9.6
   * Supported by sc AmvTek srl
   * :email: devel@amvtek.com
 */
;(function (global) {

    if (global.EventSource && !global._eventSourceImportPrefix){
        return;
    }

    var evsImportName = (global._eventSourceImportPrefix||'')+"EventSource";

    var EventSource = function (url, options) {

        if (!url || typeof url != 'string') {
            throw new SyntaxError('Not enough arguments');
        }

        this.URL = url;
        this.setOptions(options);
        var evs = this;
        setTimeout(function(){evs.poll()}, 0);
    };

    EventSource.prototype = {

        CONNECTING: 0,

        OPEN: 1,

        CLOSED: 2,

        defaultOptions: {

            loggingEnabled: false,

            loggingPrefix: "eventsource",

            interval: 500, // milliseconds

            bufferSizeLimit: 256*1024, // bytes

            silentTimeout: 300000, // milliseconds

            getArgs:{
                'evs_buffer_size_limit': 256*1024
            },

            xhrHeaders:{
                'Accept': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'X-Requested-With': 'XMLHttpRequest'
            }
        },

        setOptions: function(options){

            var defaults = this.defaultOptions;
            var option;

            // set all default options...
            for (option in defaults){

                if ( defaults.hasOwnProperty(option) ){
                    this[option] = defaults[option];
                }
            }

            // override with what is in options
            for (option in options){

                if (option in defaults && options.hasOwnProperty(option)){
                    this[option] = options[option];
                }
            }

            // if getArgs option is enabled
            // ensure evs_buffer_size_limit corresponds to bufferSizeLimit
            if (this.getArgs && this.bufferSizeLimit) {

                this.getArgs['evs_buffer_size_limit'] = this.bufferSizeLimit;
            }

            // if console is not available, force loggingEnabled to false
            if (typeof console === "undefined" || typeof console.log === "undefined") {

                this.loggingEnabled = false;
            }
        },

        log: function(message) {

            if (this.loggingEnabled) {

                console.log("[" + this.loggingPrefix +"]:" + message)
            }
        },

        poll: function() {

            try {

                if (this.readyState == this.CLOSED) {
                    return;
                }

                this.cleanup();
                this.readyState = this.CONNECTING;
                this.cursor = 0;
                this.cache = '';
                this._xhr = new this.XHR(this);
                this.resetNoActivityTimer();

            }
            catch (e) {

                // in an attempt to silence the errors
                this.log('There were errors inside the pool try-catch');
                this.dispatchEvent('error', { type: 'error', data: e.message });
            }
        },

        pollAgain: function (interval) {

            // schedule poll to be called after interval milliseconds
            var evs = this;
            evs.readyState = evs.CONNECTING;
            evs.dispatchEvent('error', {
                type: 'error',
                data: "Reconnecting "
            });
            this._pollTimer = setTimeout(function(){evs.poll()}, interval||0);
        },


        cleanup: function() {

            this.log('evs cleaning up')

            if (this._pollTimer){
                clearInterval(this._pollTimer);
                this._pollTimer = null;
            }

            if (this._noActivityTimer){
                clearInterval(this._noActivityTimer);
                this._noActivityTimer = null;
            }

            if (this._xhr){
                this._xhr.abort();
                this._xhr = null;
            }
        },

        resetNoActivityTimer: function(){

            if (this.silentTimeout){

                if (this._noActivityTimer){
                    clearInterval(this._noActivityTimer);
                }
                var evs = this;
                this._noActivityTimer = setTimeout(
                        function(){ evs.log('Timeout! silentTImeout:'+evs.silentTimeout); evs.pollAgain(); },
                        this.silentTimeout
                        );
            }
        },

        close: function () {

            this.readyState = this.CLOSED;
            this.log('Closing connection. readyState: '+this.readyState);
            this.cleanup();
        },

        ondata: function() {

            var request = this._xhr;

            if (request.isReady() && !request.hasError() ) {
                // reset the timer, as we have activity
                this.resetNoActivityTimer();

                // move this EventSource to OPEN state...
                if (this.readyState == this.CONNECTING) {
                    this.readyState = this.OPEN;
                    this.dispatchEvent('open', { type: 'open' });
                }

                var buffer = request.getBuffer();

                if (buffer.length > this.bufferSizeLimit) {
                    this.log('buffer.length > this.bufferSizeLimit');
                    this.pollAgain();
                }

                if (this.cursor == 0 && buffer.length > 0){

                    // skip byte order mark \uFEFF character if it starts the stream
                    if (buffer.substring(0,1) == '\uFEFF'){
                        this.cursor = 1;
                    }
                }

                var lastMessageIndex = this.lastMessageIndex(buffer);
                if (lastMessageIndex[0] >= this.cursor){

                    var newcursor = lastMessageIndex[1];
                    var toparse = buffer.substring(this.cursor, newcursor);
                    this.parseStream(toparse);
                    this.cursor = newcursor;
                }

                // if request is finished, reopen the connection
                if (request.isDone()) {
                    this.log('request.isDone(). reopening the connection');
                    this.pollAgain(this.interval);
                }
            }
            else if (this.readyState !== this.CLOSED) {

                this.log('this.readyState !== this.CLOSED');
                this.pollAgain(this.interval);

                //MV: Unsure why an error was previously dispatched
            }
        },

        parseStream: function(chunk) {

            // normalize line separators (\r\n,\r,\n) to \n
            // remove white spaces that may precede \n
            chunk = this.cache + this.normalizeToLF(chunk);

            var events = chunk.split('\n\n');

            var i, j, eventType, datas, line, retry;

            for (i=0; i < (events.length - 1); i++) {

                eventType = 'message';
                datas = [];
                parts = events[i].split('\n');

                for (j=0; j < parts.length; j++) {

                    line = this.trimWhiteSpace(parts[j]);

                    if (line.indexOf('event') == 0) {

                        eventType = line.replace(/event:?\s*/, '');
                    }
                    else if (line.indexOf('retry') == 0) {

                        retry = parseInt(line.replace(/retry:?\s*/, ''));
                        if(!isNaN(retry)) {
                            this.interval = retry;
                        }
                    }
                    else if (line.indexOf('data') == 0) {

                        datas.push(line.replace(/data:?\s*/, ''));
                    }
                    else if (line.indexOf('id:') == 0) {

                        this.lastEventId = line.replace(/id:?\s*/, '');
                    }
                    else if (line.indexOf('id') == 0) { // this resets the id

                        this.lastEventId = null;
                    }
                }

                if (datas.length) {
                    // dispatch a new event
                    var event = new MessageEvent(eventType, datas.join('\n'), window.location.origin, this.lastEventId);
                    this.dispatchEvent(eventType, event);
                }
            }

            this.cache = events[events.length - 1];
        },

        dispatchEvent: function (type, event) {
            var handlers = this['_' + type + 'Handlers'];

            if (handlers) {

                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].call(this, event);
                }
            }

            if (this['on' + type]) {
                this['on' + type].call(this, event);
            }

        },

        addEventListener: function (type, handler) {
            if (!this['_' + type + 'Handlers']) {
                this['_' + type + 'Handlers'] = [];
            }

            this['_' + type + 'Handlers'].push(handler);
        },

        removeEventListener: function (type, handler) {
            var handlers = this['_' + type + 'Handlers'];
            if (!handlers) {
                return;
            }
            for (var i = handlers.length - 1; i >= 0; --i) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        },

        _pollTimer: null,

        _noactivityTimer: null,

        _xhr: null,

        lastEventId: null,

        cache: '',

        cursor: 0,

        onerror: null,

        onmessage: null,

        onopen: null,

        readyState: 0,

        // ===================================================================
        // helpers functions
        // those are attached to prototype to ease reuse and testing...

        urlWithParams: function (baseURL, params) {

            var encodedArgs = [];

            if (params){

                var key, urlarg;
                var urlize = encodeURIComponent;

                for (key in params){
                    if (params.hasOwnProperty(key)) {
                        urlarg = urlize(key)+'='+urlize(params[key]);
                        encodedArgs.push(urlarg);
                    }
                }
            }

            if (encodedArgs.length > 0){

                if (baseURL.indexOf('?') == -1)
                    return baseURL + '?' + encodedArgs.join('&');
                return baseURL + '&' + encodedArgs.join('&');
            }
            return baseURL;
        },

        lastMessageIndex: function(text) {

            var ln2 =text.lastIndexOf('\n\n');
            var lr2 = text.lastIndexOf('\r\r');
            var lrln2 = text.lastIndexOf('\r\n\r\n');

            if (lrln2 > Math.max(ln2, lr2)) {
                return [lrln2, lrln2+4];
            }
            return [Math.max(ln2, lr2), Math.max(ln2, lr2) + 2]
        },

        trimWhiteSpace: function(str) {
            // to remove whitespaces left and right of string

            var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
            return str.replace(reTrim, '');
        },

        normalizeToLF: function(str) {

            // replace \r and \r\n with \n
            return str.replace(/\r\n|\r/g, '\n');
        }

    };

    if (!isOldIE()){

        EventSource.isPolyfill = "XHR";

        // EventSource will send request using XMLHttpRequest
        EventSource.prototype.XHR = function(evs) {

            request = new XMLHttpRequest();
            this._request = request;
            evs._xhr = this;

            // set handlers
            request.onreadystatechange = function(){
                if (request.readyState > 1 && evs.readyState != evs.CLOSED) {
                    if (request.status == 200 || (request.status>=300 && request.status<400)){
                        evs.ondata();
                    }
                    else {
                        request._failed = true;
                        evs.readyState = evs.CLOSED;
                        evs.dispatchEvent('error', {
                            type: 'error',
                            data: "The server responded with "+request.status
                        });
                        evs.close();
                    }
                }
            };

            request.onprogress = function () {
            };

            request.open('GET', evs.urlWithParams(evs.URL, evs.getArgs), true);

            var headers = evs.xhrHeaders; // maybe null
            for (var header in headers) {
                if (headers.hasOwnProperty(header)){
                    request.setRequestHeader(header, headers[header]);
                }
            }
            if (evs.lastEventId) {
                request.setRequestHeader('Last-Event-Id', evs.lastEventId);
            }

            request.send();
        };

        EventSource.prototype.XHR.prototype = {

            useXDomainRequest: false,

            _request: null,

            _failed: false, // true if we have had errors...

            isReady: function() {


                return this._request.readyState >= 2;
            },

            isDone: function() {

                return (this._request.readyState == 4);
            },

            hasError: function() {

                return (this._failed || (this._request.status >= 400));
            },

            getBuffer: function() {

                var rv = '';
                try {
                    rv = this._request.responseText || '';
                }
                catch (e){}
                return rv;
            },

            abort: function() {

                if ( this._request ) {
                    this._request.abort();
                }
            }
        };
    }
    else {

	EventSource.isPolyfill = "IE_8-9";

        // patch EventSource defaultOptions
        var defaults = EventSource.prototype.defaultOptions;
        defaults.xhrHeaders = null; // no headers will be sent
        defaults.getArgs['evs_preamble'] = 2048 + 8;

        // EventSource will send request using Internet Explorer XDomainRequest
        EventSource.prototype.XHR = function(evs) {

            request = new XDomainRequest();
            this._request = request;

            // set handlers
            request.onprogress = function(){
                request._ready = true;
                evs.ondata();
            };

            request.onload = function(){
                this._loaded = true;
                evs.ondata();
            };

            request.onerror = function(){
                this._failed = true;
                evs.readyState = evs.CLOSED;
                evs.dispatchEvent('error', {
                    type: 'error',
                    data: "XDomainRequest error"
                });
            };

            request.ontimeout = function(){
                this._failed = true;
                evs.readyState = evs.CLOSED;
                evs.dispatchEvent('error', {
                    type: 'error',
                    data: "XDomainRequest timed out"
                });
            };

            // XDomainRequest does not allow setting custom headers
            // If EventSource has enabled the use of GET arguments
            // we add parameters to URL so that server can adapt the stream...
            var reqGetArgs = {};
            if (evs.getArgs) {

                // copy evs.getArgs in reqGetArgs
                var defaultArgs = evs.getArgs;
                    for (var key in defaultArgs) {
                        if (defaultArgs.hasOwnProperty(key)){
                            reqGetArgs[key] = defaultArgs[key];
                        }
                    }
                if (evs.lastEventId){
                    reqGetArgs['evs_last_event_id'] = evs.lastEventId;
                }
            }
            // send the request

            request.open('GET', evs.urlWithParams(evs.URL,reqGetArgs));
            request.send();
        };

        EventSource.prototype.XHR.prototype = {

            useXDomainRequest: true,

            _request: null,

            _ready: false, // true when progress events are dispatched

            _loaded: false, // true when request has been loaded

            _failed: false, // true if when request is in error

            isReady: function() {

                return this._request._ready;
            },

            isDone: function() {

                return this._request._loaded;
            },

            hasError: function() {

                return this._request._failed;
            },

            getBuffer: function() {

                var rv = '';
                try {
                    rv = this._request.responseText || '';
                }
                catch (e){}
                return rv;
            },

            abort: function() {

                if ( this._request){
                    this._request.abort();
                }
            }
        };
    }

    function MessageEvent(type, data, origin, lastEventId) {

        this.bubbles = false;
        this.cancelBubble = false;
        this.cancelable = false;
        this.data = data || null;
        this.origin = origin || '';
        this.lastEventId = lastEventId || '';
        this.type = type || 'message';
    }

    function isOldIE () {

        //return true if we are in IE8 or IE9
        return (window.XDomainRequest && (window.XMLHttpRequest && new XMLHttpRequest().responseType === undefined)) ? true : false;
    }

    global[evsImportName] = EventSource;
})(this);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_event_emitter_es6__);



/**
 * @event EVENTS.RESIZE
 * @event EVENTS.SCROLL
 * @event EVENTS.FULL_SCREEN_CHANGE
 * @event EVENTS.ORIENTATION_CHANGE
 */
class Stage extends __WEBPACK_IMPORTED_MODULE_0_event_emitter_es6___default.a{

    constructor(){
        super();

        let me=this;

        /**
         * Hauteur de l'intérieur de la fenêtre
         * @type {number} window.innerHeight
         */
        this.height = window.innerHeight;
        /**
         * Largeur de l'intérieur de la fenêtre
         * @type {number} window.innerWidth
         */
        this.width = window.innerWidth;
        /**
         * Position de la souris par rapport à la fenêtre (sans tenir compte du scroll)
         * @type {number}
         */
        this.mouseX=0;
        /**
         *
         * @type {number}
         */
        this.mouseY=0;

        function updateProps() {
            me.height=window.innerHeight;
            me.width=window.innerWidth;
        }

        //resize listener
        window.addEventListener("resize", function(ev) {
            updateProps();
            me.emit(EVENTS.RESIZE,ev);
        }, false);

        //orientation
        window.addEventListener("orientationchange", function(ev) {
            updateProps();
            me.emit(EVENTS.ORIENTATION_CHANGE,ev);
            me.emit(EVENTS.RESIZE,ev);

        }, false);
        //scroll
        window.addEventListener("scroll", function(ev) {
            me.emit(EVENTS.SCROLL,ev);
        }, false);
        //mousemoove

        window.addEventListener("mousemove", function(ev) {
            //me.emit(EVENTS.MOUSE_MOVE,ev);
            me.mouseX=ev.clientX;
            me.mouseY=ev.clientY;
        }, false);

        function FShandler(){
            //Stage.events.dispatchEvent(EVENT_STAGE_FULL_SCREEN_CHANGE);
            updateProps();
            me.emit(EVENTS.RESIZE);
            me.emit(EVENTS.FULL_SCREEN_CHANGE);
            if(document.webkitIsFullScreen || document.mozFullscreen || document.fullScreen){
                me.emit(EVENTS.FULL_SCREEN_ENTER);
            }else{
                me.emit(EVENTS.FULL_SCREEN_CANCEL);
            }
        }

        document.addEventListener("fullscreenchange", FShandler);
        document.addEventListener("webkitfullscreenchange", FShandler);
        document.addEventListener("mozfullscreenchange", FShandler);
        document.addEventListener("MSFullscreenChange", FShandler);

        //----focus tab--------

        var state, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
            state = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
            visibilityChange = "mozvisibilitychange";
            state = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
            state = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
            state = "webkitVisibilityState";
        }

        // Add a listener that constantly changes the title
        document.addEventListener(visibilityChange, function() {
            me.__visibility = document[state];
            me.emit(EVENTS.VISIBILITY_CHANGE);
            if(me.visible()){
                updateProps();
                me.emit(EVENTS.VISIBLE);
            }else{
                me.emit(EVENTS.HIDDEN);
            }
        }, false);

        // Set the initial value
        me.__visibility = document[state];


    }

    /**
     *
     * @returns {boolean} true si l'onglet est actif.
     */
    visible(){
        return this.__visibility==="visible";
    }

    /**
     *
     * @returns {Stage.width}
     */
    width(){
        return this.width;
    }
    /**
     *
     * @returns {Stage.height}
     */
    height(){
        return this.height;
    }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stage;






/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PovApi__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_emitter_es6__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_emitter_es6___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_event_emitter_es6__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PovSSEevent__ = __webpack_require__(4);




/**
 *
 */
class PovSSE extends __WEBPACK_IMPORTED_MODULE_1_event_emitter_es6___default.a{
    /**
     *
     * @param eventSource
     */
    constructor(eventSource){
        super();
        /**
         *
         * @type {EventSource}
         */
        this.eventSource=null;

        if(eventSource){
            this.setSource(eventSource);
        }

        this.debug=false;

    }

    /**
     * Définit la source d'évènements
     * @param {EventSource} eventSource
     */
    setSource(eventSource){
        let me=this;
        this.eventSource=eventSource;
        this.eventSource.onmessage =function(e){

            let data=JSON.parse(e.data);
            let event = new __WEBPACK_IMPORTED_MODULE_2__PovSSEevent__["a" /* PovSSEevent */](data);
            me.emit(event.type,event);
            if(me.debug){
                console.log("PovSSE",event);
            }
        };
    }

    /**
     * Ferme la connexion
     */
    close(){
        this.eventSource.close();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PovSSE;



/***/ }),
/* 18 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Javascript utilisé dans l'interface de debuggage /dev
 */
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(5);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/*! UIkit 3.0.0-beta.40 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("uikit",e):t.UIkit=e()}(this,function(){"use strict";function t(t,e){return function(i){var n=arguments.length;return n?n>1?t.apply(e,arguments):t.call(e,i):t.call(e)}}var e=Object.prototype.hasOwnProperty;function i(t,i){return e.call(t,i)}var n=/([a-z\d])([A-Z])/g;function o(t){return t.replace(n,"$1-$2").toLowerCase()}var r=/-(\w)/g;function s(t){return t.replace(r,a)}function a(t,e){return e?e.toUpperCase():""}function l(t){return t.length?a(0,t.charAt(0))+t.slice(1):""}var h=String.prototype,u=h.startsWith||function(t){return 0===this.lastIndexOf(t,0)};function c(t,e){return u.call(t,e)}var d=h.endsWith||function(t){return this.substr(-t.length)===t};function f(t,e){return d.call(t,e)}var p=function(t){return~this.indexOf(t)},m=h.includes||p,g=Array.prototype.includes||p;function v(t,e){return t&&(S(t)?m:g).call(t,e)}var w=Array.isArray;function b(t){return"function"==typeof t}function y(t){return null!==t&&"object"==typeof t}function x(t){return y(t)&&Object.getPrototypeOf(t)===Object.prototype}function k(t){return y(t)&&t===t.window}function $(t){return y(t)&&9===t.nodeType}function I(t){return y(t)&&!!t.jquery}function T(t){return t instanceof Node||y(t)&&1===t.nodeType}function C(t){return t instanceof NodeList||t instanceof HTMLCollection}function E(t){return"boolean"==typeof t}function S(t){return"string"==typeof t}function _(t){return"number"==typeof t}function A(t){return _(t)||S(t)&&!isNaN(t-parseFloat(t))}function N(t){return void 0===t}function D(t){return E(t)?t:"true"===t||"1"===t||""===t||"false"!==t&&"0"!==t&&t}function M(t){var e=Number(t);return!isNaN(e)&&e}function B(t){return parseFloat(t)||0}function O(t){return T(t)||k(t)||$(t)?t:C(t)||I(t)?t[0]:w(t)?O(t[0]):null}var P=Array.prototype;function H(t){return T(t)?[t]:C(t)?P.slice.call(t):w(t)?t.map(O).filter(Boolean):I(t)?t.toArray():[]}function z(t){return w(t)?t:S(t)?t.split(/,(?![^(]*\))/).map(function(t){return A(t)?M(t):D(t.trim())}):[t]}function W(t){return t?f(t,"ms")?B(t):1e3*B(t):0}function L(t,e,i){return t.replace(new RegExp(e+"|"+i,"mg"),function(t){return t===e?i:e})}var j=Object.assign||function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];t=Object(t);for(var o=0;o<e.length;o++){var r=e[o];if(null!==r)for(var s in r)i(r,s)&&(t[s]=r[s])}return t};function F(t,e){for(var i in t)if(!1===e.call(t[i],t[i],i))break}function V(t,e,i){return void 0===e&&(e=0),void 0===i&&(i=1),Math.min(Math.max(t,e),i)}function R(){}function Y(t,e){return t.left<=e.right&&e.left<=t.right&&t.top<=e.bottom&&e.top<=t.bottom}function q(t,e){return Y({top:t.y,bottom:t.y,left:t.x,right:t.x},e)}var U={ratio:function(t,e,i){var n,o="width"===e?"height":"width";return(n={})[o]=Math.round(i*t[o]/t[e]),n[e]=i,n},contain:function(t,e){var i=this;return F(t=j({},t),function(n,o){return t=t[o]>e[o]?i.ratio(t,o,e[o]):t}),t},cover:function(t,e){var i=this;return F(t=this.contain(t,e),function(n,o){return t=t[o]<e[o]?i.ratio(t,o,e[o]):t}),t}};function X(t,e,i){if(y(e))for(var n in e)X(t,n,e[n]);else{if(N(i))return(t=O(t))&&t.getAttribute(e);H(t).forEach(function(t){b(i)&&(i=i.call(t,X(t,e))),null===i?G(t,e):t.setAttribute(e,i)})}}function J(t,e){return H(t).some(function(t){return t.hasAttribute(e)})}function G(t,e){t=H(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.removeAttribute(e)})})}function Z(t,e,i,n){X(t,e,function(t){return t?t.replace(i,n):t})}function Q(t,e){for(var i=0,n=[e,"data-"+e];i<n.length;i++)if(J(t,n[i]))return X(t,n[i])}var K="Promise"in window?window.Promise:it,tt=2,et="setImmediate"in window?setImmediate:setTimeout;function it(t){this.state=tt,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(t){e.reject(t)}}it.reject=function(t){return new it(function(e,i){i(t)})},it.resolve=function(t){return new it(function(e,i){e(t)})},it.all=function(t){return new it(function(e,i){var n=[],o=0;function r(i){return function(r){n[i]=r,(o+=1)===t.length&&e(n)}}0===t.length&&e(n);for(var s=0;s<t.length;s+=1)it.resolve(t[s]).then(r(s),i)})},it.race=function(t){return new it(function(e,i){for(var n=0;n<t.length;n+=1)it.resolve(t[n]).then(e,i)})};var nt=it.prototype;nt.resolve=function(t){var e=this;if(e.state===tt){if(t===e)throw new TypeError("Promise settled with itself.");var i=!1;try{var n=t&&t.then;if(null!==t&&y(t)&&b(n))return void n.call(t,function(t){i||e.resolve(t),i=!0},function(t){i||e.reject(t),i=!0})}catch(t){return void(i||e.reject(t))}e.state=0,e.value=t,e.notify()}},nt.reject=function(t){var e=this;if(e.state===tt){if(t===e)throw new TypeError("Promise settled with itself.");e.state=1,e.value=t,e.notify()}},nt.notify=function(){var t=this;et(function(){if(t.state!==tt)for(;t.deferred.length;){var e=t.deferred.shift(),i=e[0],n=e[1],o=e[2],r=e[3];try{0===t.state?b(i)?o(i.call(void 0,t.value)):o(t.value):1===t.state&&(b(n)?o(n.call(void 0,t.value)):r(t.value))}catch(t){r(t)}}})},nt.then=function(t,e){var i=this;return new it(function(n,o){i.deferred.push([t,e,n,o]),i.notify()})},nt.catch=function(t){return this.then(void 0,t)};var ot=window,rt=document,st=rt.documentElement,at="rtl"===X(st,"dir"),lt=ot.MutationObserver,ht="ontouchstart"in ot,ut=ot.PointerEvent,ct=ht||ot.DocumentTouch&&rt instanceof DocumentTouch||navigator.maxTouchPoints,dt=ct?"mousedown "+(ht?"touchstart":"pointerdown"):"mousedown",ft=ct?"mousemove "+(ht?"touchmove":"pointermove"):"mousemove",pt=ct?"mouseup "+(ht?"touchend":"pointerup"):"mouseup",mt=ct&&ut?"pointerenter":"mouseenter",gt=ct&&ut?"pointerleave":"mouseleave";var vt,wt={};function bt(t,e){return O(t)||xt(t,Ct(t)?e:rt)}function yt(t,e){var i=H(t);return i.length&&i||kt(t,Ct(t)?e:rt)}function xt(t,e){return O($t(t,e,"querySelector"))}function kt(t,e){return H($t(t,e,"querySelectorAll"))}function $t(t,e,i){if(void 0===e&&(e=rt),!t||!S(t))return null;var n;Ct(t=t.replace(Tt,"$1 *"))&&(n=[],t=t.split(",").map(function(t,i){var o=e;if("!"===(t=t.trim())[0]){var r=t.substr(1).trim().split(" ");o=Nt(e.parentNode,r[0]),t=r.slice(1).join(" ")}return o?(o.id||(o.id="uk-"+Date.now()+i,n.push(function(){return G(o,"id")})),"#"+Bt(o.id)+" "+t):null}).filter(Boolean).join(","),e=rt);try{return e[i](t)}catch(t){return null}finally{n&&n.forEach(function(t){return t()})}}(vt=rt.createElement("_").classList)&&(vt.add("a","b"),vt.toggle("c",!1),wt.Multiple=vt.contains("b"),wt.Force=!vt.contains("c"),wt.ClassList=!0),vt=null;var It=/(^|,)\s*[!>+~]/,Tt=/([!>+~])(?=\s+[!>+~]|\s*$)/g;function Ct(t){return S(t)&&t.match(It)}var Et=Element.prototype,St=Et.matches||Et.webkitMatchesSelector||Et.msMatchesSelector;function _t(t,e){return H(t).some(function(t){return St.call(t,e)})}var At=Et.closest||function(t){var e=this;do{if(_t(e,t))return e;e=e.parentNode}while(e&&1===e.nodeType)};function Nt(t,e){return c(e,">")&&(e=e.slice(1)),T(t)?t.parentNode&&At.call(t,e):H(t).map(function(t){return t.parentNode&&At.call(t,e)}).filter(Boolean)}function Dt(t,e){for(var i=[],n=O(t).parentNode;n&&1===n.nodeType;)_t(n,e)&&i.push(n),n=n.parentNode;return i}var Mt=ot.CSS&&CSS.escape||function(t){return t.replace(/([^\x7f-\uFFFF\w-])/g,function(t){return"\\"+t})};function Bt(t){return S(t)?Mt.call(null,t):""}var Ot={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function Pt(t){return H(t).some(function(t){return Ot[t.tagName.toLowerCase()]})}function Ht(t){return H(t).some(function(t){return t.offsetHeight||t.getBoundingClientRect().height})}var zt="input,select,textarea,button";function Wt(t){return H(t).some(function(t){return _t(t,zt)})}function Lt(t,e){return H(t).filter(function(t){return _t(t,e)})}function jt(t,e){return S(e)?_t(t,e)||Nt(t,e):t===e||O(e).contains(O(t))}function Ft(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i,n=Ut(t),o=n[0],r=n[1],s=n[2],a=n[3],l=n[4];return o=Jt(o),s&&(a=function(t,e,i){var n=this;return function(o){var r=o.target,s=">"===e[0]?kt(e,t).reverse().filter(function(t){return jt(r,t)})[0]:Nt(r,e);s&&(o.delegate=t,o.current=s,i.call(n,o))}}(o,s,a)),a.length>1&&(i=a,a=function(t){return w(t.detail)?i.apply(i,[t].concat(t.detail)):i(t)}),r.split(" ").forEach(function(t){return o&&o.addEventListener(t,a,l)}),function(){return Vt(o,r,a,l)}}function Vt(t,e,i,n){void 0===n&&(n=!1),(t=Jt(t))&&e.split(" ").forEach(function(e){return t.removeEventListener(e,i,n)})}function Rt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i=Ut(t),n=i[0],o=i[1],r=i[2],s=i[3],a=i[4],l=i[5],h=Ft(n,o,r,function(t){var e=!l||l(t);e&&(h(),s(t,e))},a);return h}function Yt(t,e,i){return Gt(t).reduce(function(t,n){return t&&n.dispatchEvent(qt(e,!0,!0,i))},!0)}function qt(t,e,i,n){if(void 0===e&&(e=!0),void 0===i&&(i=!1),S(t)){var o=document.createEvent("CustomEvent");o.initCustomEvent(t,e,i,n),t=o}return t}function Ut(t){return S(t[0])&&(t[0]=xt(t[0])),b(t[2])&&t.splice(2,0,!1),t}function Xt(t){return"EventTarget"in window?t instanceof EventTarget:t&&"addEventListener"in t}function Jt(t){return Xt(t)?t:O(t)}function Gt(t){return Xt(t)?[t]:w(t)?t.map(Jt).filter(Boolean):H(t)}function Zt(t,e){return new K(function(i,n){var o=j({data:null,method:"GET",headers:{},xhr:new XMLHttpRequest,beforeSend:R,responseType:""},e);o.beforeSend(o);var r=o.xhr;for(var s in o)if(s in r)try{r[s]=o[s]}catch(t){}for(var a in r.open(o.method.toUpperCase(),t),o.headers)r.setRequestHeader(a,o.headers[a]);Ft(r,"load",function(){0===r.status||r.status>=200&&r.status<300||304===r.status?i(r):n(j(Error(r.statusText),{xhr:r,status:r.status}))}),Ft(r,"error",function(){return n(j(Error("Network Error"),{xhr:r}))}),Ft(r,"timeout",function(){return n(j(Error("Network Timeout"),{xhr:r}))}),r.send(o.data)})}function Qt(){return"complete"===rt.readyState||"loading"!==rt.readyState&&!st.doScroll}function Kt(t){if(Qt())t();else var e=function(){i(),n(),t()},i=Ft(rt,"DOMContentLoaded",e),n=Ft(ot,"load",e)}function te(t,e){return e?H(t).indexOf(O(e)):H((t=O(t))&&t.parentNode.children).indexOf(t)}function ee(t,e,i,n){void 0===i&&(i=0),void 0===n&&(n=!1);var o=(e=H(e)).length;return t=A(t)?M(t):"next"===t?i+1:"previous"===t?i-1:te(e,t),n?V(t,0,o-1):(t%=o)<0?t+o:t}function ie(t){return(t=O(t)).innerHTML="",t}function ne(t,e){return t=O(t),N(e)?t.innerHTML:oe(t.hasChildNodes()?ie(t):t,e)}function oe(t,e){return t=O(t),ae(e,function(e){return t.appendChild(e)})}function re(t,e){return t=O(t),ae(e,function(e){return t.parentNode.insertBefore(e,t)})}function se(t,e){return t=O(t),ae(e,function(e){return t.nextSibling?re(t.nextSibling,e):oe(t.parentNode,e)})}function ae(t,e){return(t=S(t)?pe(t):t)?"length"in t?H(t).map(e):e(t):null}function le(t){H(t).map(function(t){return t.parentNode&&t.parentNode.removeChild(t)})}function he(t,e){for(e=O(re(t,e));e.firstChild;)e=e.firstChild;return oe(e,t),e}function ue(t,e){return H(H(t).map(function(t){return t.hasChildNodes?he(H(t.childNodes),e):oe(t,e)}))}function ce(t){H(t).map(function(t){return t.parentNode}).filter(function(t,e,i){return i.indexOf(t)===e}).forEach(function(t){re(t,t.childNodes),le(t)})}var de=/^\s*<(\w+|!)[^>]*>/,fe=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;function pe(t){var e=fe.exec(t);if(e)return rt.createElement(e[1]);var i=rt.createElement("div");return de.test(t)?i.insertAdjacentHTML("beforeend",t.trim()):i.textContent=t,i.childNodes.length>1?H(i.childNodes):i.firstChild}function me(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];xe(t,e,"add")}function ge(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];xe(t,e,"remove")}function ve(t,e){Z(t,"class",new RegExp("(^|\\s)"+e+"(?!\\S)","g"),"")}function we(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];e[0]&&ge(t,e[0]),e[1]&&me(t,e[1])}function be(t,e){return wt.ClassList&&H(t).some(function(t){return t.classList.contains(e)})}function ye(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];if(wt.ClassList&&e.length){var n=S((e=ke(e))[e.length-1])?[]:e.pop();e=e.filter(Boolean),H(t).forEach(function(t){for(var i=t.classList,o=0;o<e.length;o++)wt.Force?i.toggle.apply(i,[e[o]].concat(n)):i[(N(n)?!i.contains(e[o]):n)?"add":"remove"](e[o])})}}function xe(t,e,i){e=ke(e).filter(Boolean),wt.ClassList&&e.length&&H(t).forEach(function(t){var n=t.classList;wt.Multiple?n[i].apply(n,e):e.forEach(function(t){return n[i](t)})})}function ke(t){return t.reduce(function(t,e){return t.concat.call(t,S(e)&&v(e," ")?e.trim().split(" "):e)},[])}var $e={"animation-iteration-count":!0,"column-count":!0,"fill-opacity":!0,"flex-grow":!0,"flex-shrink":!0,"font-weight":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,widows:!0,"z-index":!0,zoom:!0};function Ie(t,e,i){return H(t).map(function(t){if(S(e)){if(e=Ae(e),N(i))return Ce(t,e);i||0===i?t.style[e]=A(i)&&!$e[e]?i+"px":i:t.style.removeProperty(e)}else{if(w(e)){var n=Te(t);return e.reduce(function(t,e){return t[e]=n[Ae(e)],t},{})}y(e)&&F(e,function(e,i){return Ie(t,i,e)})}return t})[0]}function Te(t,e){return(t=O(t)).ownerDocument.defaultView.getComputedStyle(t,e)}function Ce(t,e,i){return Te(t,i)[e]}var Ee={};function Se(t){if(!(t in Ee)){var e=oe(st,rt.createElement("div"));me(e,"var-"+t);try{Ee[t]=Ce(e,"content",":before").replace(/^["'](.*)["']$/,"$1"),Ee[t]=JSON.parse(Ee[t])}catch(t){}st.removeChild(e)}return Ee[t]}var _e={};function Ae(t){var e=_e[t];return e||(e=_e[t]=function(t){if((t=o(t))in De)return t;var e,i=Ne.length;for(;i--;)if((e="-"+Ne[i]+"-"+t)in De)return e}(t)||t),e}var Ne=["webkit","moz","ms"],De=rt.createElement("_").style;function Me(t,e,i,n){return void 0===i&&(i=400),void 0===n&&(n="linear"),K.all(H(t).map(function(t){return new K(function(o,r){for(var s in e){var a=Ie(t,s);""===a&&Ie(t,s,a)}var l=setTimeout(function(){return Yt(t,"transitionend")},i);Rt(t,"transitionend transitioncanceled",function(e){var i=e.type;clearTimeout(l),ge(t,"uk-transition"),Ie(t,{"transition-property":"","transition-duration":"","transition-timing-function":""}),"transitioncanceled"===i?r():o()},!1,function(e){var i=e.target;return t===i}),me(t,"uk-transition"),Ie(t,j({"transition-property":Object.keys(e).map(Ae).join(","),"transition-duration":i+"ms","transition-timing-function":n},e))})}))}var Be={start:Me,stop:function(t){return Yt(t,"transitionend"),K.resolve()},cancel:function(t){Yt(t,"transitioncanceled")},inProgress:function(t){return be(t,"uk-transition")}},Oe="uk-animation-",Pe="uk-cancel-animation";function He(t,e,i,n,o){var r=arguments;return void 0===i&&(i=200),K.all(H(t).map(function(t){return new K(function(s,a){if(be(t,Pe))requestAnimationFrame(function(){return K.resolve().then(function(){return He.apply(void 0,r).then(s,a)})});else{var l=e+" "+Oe+(o?"leave":"enter");c(e,Oe)&&(n&&(l+=" uk-transform-origin-"+n),o&&(l+=" "+Oe+"reverse")),h(),Rt(t,"animationend animationcancel",function(e){var i=!1;"animationcancel"===e.type?(a(),h()):(s(),K.resolve().then(function(){i=!0,h()})),requestAnimationFrame(function(){i||(me(t,Pe),requestAnimationFrame(function(){return ge(t,Pe)}))})},!1,function(e){var i=e.target;return t===i}),Ie(t,"animationDuration",i+"ms"),me(t,l)}function h(){Ie(t,"animationDuration",""),ve(t,Oe+"\\S*")}})}))}var ze=new RegExp(Oe+"(enter|leave)"),We={in:function(t,e,i,n){return He(t,e,i,n,!1)},out:function(t,e,i,n){return He(t,e,i,n,!0)},inProgress:function(t){return ze.test(X(t,"class"))},cancel:function(t){Yt(t,"animationcancel")}};function Le(t,e){return S(t)?Fe(t)?O(pe(t)):xt(t,e):O(t)}function je(t,e){return S(t)?Fe(t)?H(pe(t)):kt(t,e):H(t)}function Fe(t){return"<"===t[0]||t.match(/^\s*</)}var Ve={width:["x","left","right"],height:["y","top","bottom"]};function Re(t,e,i,n,o,r,s,a){i=Ke(i),n=Ke(n);var l={element:i,target:n};if(!t||!e)return l;var h=qe(t),u=qe(e),c=u;return Qe(c,i,h,-1),Qe(c,n,u,1),o=ti(o,h.width,h.height),r=ti(r,u.width,u.height),o.x+=r.x,o.y+=r.y,c.left+=o.x,c.top+=o.y,a=qe(a||ni(t)),s&&F(Ve,function(t,e){var r=t[0],d=t[1],f=t[2];if(!0===s||v(s,r)){var p=i[r]===d?-h[e]:i[r]===f?h[e]:0,m=n[r]===d?u[e]:n[r]===f?-u[e]:0;if(c[d]<a[d]||c[d]+h[e]>a[f]){var g=h[e]/2,w="center"===n[r]?-u[e]/2:0;"center"===i[r]&&(b(g,w)||b(-g,-w))||b(p,m)}}function b(t,i){var n=c[d]+t+i-2*o[r];if(n>=a[d]&&n+h[e]<=a[f])return c[d]=n,["element","target"].forEach(function(i){l[i][r]=t?l[i][r]===Ve[e][1]?Ve[e][2]:Ve[e][1]:l[i][r]}),!0}}),Ye(t,c),l}function Ye(t,e){if(t=O(t),!e)return qe(t);var i=Ye(t),n=Ie(t,"position");["left","top"].forEach(function(o){if(o in e){var r=Ie(t,o);t.style[o]=e[o]-i[o]+B("absolute"===n&&"auto"===r?Ue(t)[o]:r)+"px"}})}function qe(t){var e=ni(t=O(t)),i=e.pageYOffset,n=e.pageXOffset;if(k(t)){var o=t.innerHeight,r=t.innerWidth;return{top:i,left:n,height:o,width:r,bottom:i+o,right:n+r}}var s=!1;Ht(t)||(s=t.style.display,t.style.display="block");var a=t.getBoundingClientRect();return!1!==s&&(t.style.display=s),{height:a.height,width:a.width,top:a.top+i,left:a.left+n,bottom:a.bottom+i,right:a.right+n}}function Ue(t){var e=function(t){var e=O(t).offsetParent;for(;e&&"static"===Ie(e,"position");)e=e.offsetParent;return e||ri(t)}(t=O(t)),i=e===ri(t)?{top:0,left:0}:Ye(e),n=["top","left"].reduce(function(n,o){var r=l(o);return n[o]-=i[o]+(B(Ie(t,"margin"+r))||0)+(B(Ie(e,"border"+r+"Width"))||0),n},Ye(t));return{top:n.top,left:n.left}}var Xe=Ge("height"),Je=Ge("width");function Ge(t){var e=l(t);return function(i,n){if(i=O(i),N(n)){if(k(i))return i["inner"+e];if($(i)){var o=i.documentElement;return Math.max(o.offsetHeight,o.scrollHeight)}return n="auto"===(n=Ie(i,t))?i["offset"+e]:B(n)||0,Ze(t,i,n)}Ie(i,t,n||0===n?Ze(t,i,n)+"px":"")}}function Ze(t,e,i){return"border-box"===Ie(e,"boxSizing")?Ve[t].slice(1).map(l).reduce(function(t,i){return t-B(Ie(e,"padding"+i))-B(Ie(e,"border"+i+"Width"))},i):i}function Qe(t,e,i,n){F(Ve,function(o,r){var s=o[0],a=o[1],l=o[2];e[s]===l?t[a]+=i[r]*n:"center"===e[s]&&(t[a]+=i[r]*n/2)})}function Ke(t){var e=/left|center|right/,i=/top|center|bottom/;return 1===(t=(t||"").split(" ")).length&&(t=e.test(t[0])?t.concat(["center"]):i.test(t[0])?["center"].concat(t):["center","center"]),{x:e.test(t[0])?t[0]:"center",y:i.test(t[1])?t[1]:"center"}}function ti(t,e,i){var n=(t||"").split(" "),o=n[0],r=n[1];return{x:o?B(o)*(f(o,"%")?e/100:1):0,y:r?B(r)*(f(r,"%")?i/100:1):0}}function ei(t){switch(t){case"left":return"right";case"right":return"left";case"top":return"bottom";case"bottom":return"top";default:return t}}function ii(t,e,i){void 0===e&&(e=0),void 0===i&&(i=0);var n=ni(t=O(t));return Y(t.getBoundingClientRect(),{top:e,left:i,bottom:e+Xe(n),right:i+Je(n)})}function ni(t){return k(t)?t:oi(t).defaultView}function oi(t){return O(t).ownerDocument}function ri(t){return oi(t).documentElement}var si={reads:[],writes:[],read:function(t){return this.reads.push(t),ai(),t},write:function(t){return this.writes.push(t),ai(),t},clear:function(t){return hi(this.reads,t)||hi(this.writes,t)},flush:function(){li(this.reads),li(this.writes.splice(0,this.writes.length)),this.scheduled=!1,(this.reads.length||this.writes.length)&&ai()}};function ai(){si.scheduled||(si.scheduled=!0,requestAnimationFrame(si.flush.bind(si)))}function li(t){for(var e;e=t.shift();)e()}function hi(t,e){var i=t.indexOf(e);return!!~i&&!!t.splice(i,1)}function ui(){}function ci(t,e){return(e.y-t.y)/(e.x-t.x)}ui.prototype={positions:[],position:null,init:function(){var t=this;this.positions=[],this.position=null;var e=!1;this.unbind=Ft(rt,"mousemove",function(i){e||(setTimeout(function(){var n=Date.now(),o=t.positions.length;o&&n-t.positions[o-1].time>100&&t.positions.splice(0,o),t.positions.push({time:n,x:i.pageX,y:i.pageY}),t.positions.length>5&&t.positions.shift(),e=!1},5),e=!0)})},cancel:function(){this.unbind&&this.unbind()},movesTo:function(t){if(this.positions.length<2)return!1;var e=Ye(t),i=this.positions[this.positions.length-1],n=this.positions[0];if(e.left<=i.x&&i.x<=e.right&&e.top<=i.y&&i.y<=e.bottom)return!1;var o=[[{x:e.left,y:e.top},{x:e.right,y:e.bottom}],[{x:e.right,y:e.top},{x:e.left,y:e.bottom}]];return e.right<=i.x||(e.left>=i.x?(o[0].reverse(),o[1].reverse()):e.bottom<=i.y?o[0].reverse():e.top>=i.y&&o[1].reverse()),!!o.reduce(function(t,e){return t+(ci(n,e[0])<ci(i,e[0])&&ci(n,e[1])>ci(i,e[1]))},0)}};var di={};di.args=di.events=di.init=di.created=di.beforeConnect=di.connected=di.ready=di.beforeDisconnect=di.disconnected=di.destroy=function(t,e){return t=t&&!w(t)?[t]:t,e?t?t.concat(e):w(e)?e:[e]:t},di.update=function(t,e){return di.args(t,b(e)?{read:e}:e)},di.props=function(t,e){return w(e)&&(e=e.reduce(function(t,e){return t[e]=String,t},{})),di.methods(t,e)},di.computed=di.defaults=di.methods=function(t,e){return e?t?j({},t,e):e:t};var fi=function(t,e){return N(e)?t:e};function pi(t,e){var n={};if(e.mixins)for(var o=0,r=e.mixins.length;o<r;o++)t=pi(t,e.mixins[o]);for(var s in t)l(s);for(var a in e)i(t,a)||l(a);function l(i){n[i]=(di[i]||fi)(t[i],e[i])}return n}var mi=0,gi=function(t){this.id=++mi,this.el=O(t)};function vi(t,e){try{t.contentWindow.postMessage(JSON.stringify(j({event:"command"},e)),"*")}catch(t){}}gi.prototype.isVideo=function(){return this.isYoutube()||this.isVimeo()||this.isHTML5()},gi.prototype.isHTML5=function(){return"VIDEO"===this.el.tagName},gi.prototype.isIFrame=function(){return"IFRAME"===this.el.tagName},gi.prototype.isYoutube=function(){return this.isIFrame()&&!!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/)},gi.prototype.isVimeo=function(){return this.isIFrame()&&!!this.el.src.match(/vimeo\.com\/video\/.*/)},gi.prototype.enableApi=function(){var t=this;if(this.ready)return this.ready;var e,i=this.isYoutube(),n=this.isVimeo();return i||n?this.ready=new K(function(o){var r;Rt(t.el,"load",function(){if(i){var n=function(){return vi(t.el,{event:"listening",id:t.id})};e=setInterval(n,100),n()}}),(r=function(e){return i&&e.id===t.id&&"onReady"===e.event||n&&Number(e.player_id)===t.id},new K(function(t){Rt(ot,"message",function(e,i){return t(i)},!1,function(t){var e=t.data;if(e&&S(e)){try{e=JSON.parse(e)}catch(t){return}return e&&r(e)}})})).then(function(){o(),e&&clearInterval(e)}),X(t.el,"src",t.el.src+(v(t.el.src,"?")?"&":"?")+(i?"enablejsapi=1":"api=1&player_id="+mi))}):K.resolve()},gi.prototype.play=function(){var t=this;if(this.isVideo())if(this.isIFrame())this.enableApi().then(function(){return vi(t.el,{func:"playVideo",method:"play"})});else if(this.isHTML5())try{this.el.play()}catch(t){}},gi.prototype.pause=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return vi(t.el,{func:"pauseVideo",method:"pause"})}):this.isHTML5()&&this.el.pause())},gi.prototype.mute=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return vi(t.el,{func:"mute",method:"setVolume",value:0})}):this.isHTML5()&&(this.el.muted=!0,X(this.el,"muted","")))};var wi,bi,yi,xi,ki={};function $i(){wi&&clearTimeout(wi),bi&&clearTimeout(bi),yi&&clearTimeout(yi),wi=bi=yi=null,ki={}}Kt(function(){Ft(rt,"click",function(){return xi=!0},!0),Ft(rt,dt,function(t){var e=t.target,i=Ci(t),n=i.x,o=i.y,r=Date.now(),s=Ei(t.type);ki.type&&ki.type!==s||(ki.el="tagName"in e?e:e.parentNode,wi&&clearTimeout(wi),ki.x1=n,ki.y1=o,ki.last&&r-ki.last<=250&&(ki={}),ki.type=s,ki.last=r,xi=t.button>0)}),Ft(rt,ft,function(t){if(!t.defaultPrevented){var e=Ci(t),i=e.x,n=e.y;ki.x2=i,ki.y2=n}}),Ft(rt,pt,function(t){var e=t.type,i=t.target;ki.type===Ei(e)&&(ki.x2&&Math.abs(ki.x1-ki.x2)>30||ki.y2&&Math.abs(ki.y1-ki.y2)>30?bi=setTimeout(function(){var t,e,i,n,o;ki.el&&(Yt(ki.el,"swipe"),Yt(ki.el,"swipe"+(e=(t=ki).x1,i=t.x2,n=t.y1,o=t.y2,Math.abs(e-i)>=Math.abs(n-o)?e-i>0?"Left":"Right":n-o>0?"Up":"Down"))),ki={}}):"last"in ki?(yi=setTimeout(function(){return Yt(ki.el,"tap")}),ki.el&&"mouseup"!==e&&jt(i,ki.el)&&(wi=setTimeout(function(){wi=null,ki.el&&!xi&&Yt(ki.el,"click"),ki={}},350))):ki={})}),Ft(rt,"touchcancel",$i),Ft(ot,"scroll",$i)});var Ii=!1;function Ti(t){return Ii||"touch"===t.pointerType}function Ci(t){var e=t.touches,i=t.changedTouches,n=e&&e[0]||i&&i[0]||t;return{x:n.pageX,y:n.pageY}}function Ei(t){return t.slice(0,5)}Ft(rt,"touchstart",function(){return Ii=!0},!0),Ft(rt,"click",function(){Ii=!1}),Ft(rt,"touchcancel",function(){return Ii=!1},!0);var Si=Object.freeze({ajax:Zt,transition:Me,Transition:Be,animate:He,Animation:We,attr:X,hasAttr:J,removeAttr:G,filterAttr:Z,data:Q,addClass:me,removeClass:ge,removeClasses:ve,replaceClass:we,hasClass:be,toggleClass:ye,$:Le,$$:je,positionAt:Re,offset:Ye,position:Ue,height:Xe,width:Je,flipPosition:ei,isInView:ii,scrolledOver:function(t){var e=ni(t=O(t)),i=oi(t),n=t.offsetHeight,o=function(t){var e=0;do{e+=t.offsetTop}while(t=t.offsetParent);return e}(t),r=Xe(e),s=r+Math.min(0,o-r),a=Math.max(0,r-(Xe(i)-(o+n)));return V((s+e.pageYOffset-o)/((s+(n-(a<r?a:0)))/100)/100)},isReady:Qt,ready:Kt,index:te,getIndex:ee,empty:ie,html:ne,prepend:function(t,e){return(t=O(t)).hasChildNodes()?ae(e,function(e){return t.insertBefore(e,t.firstChild)}):oe(t,e)},append:oe,before:re,after:se,remove:le,wrapAll:he,wrapInner:ue,unwrap:ce,fragment:pe,win:ot,doc:rt,docEl:st,isRtl:at,Observer:lt,hasTouch:ct,pointerDown:dt,pointerMove:ft,pointerUp:pt,pointerEnter:mt,pointerLeave:gt,getImage:function(t){return new K(function(e,i){var n=new Image;n.onerror=i,n.onload=function(){return e(n)},n.src=t})},supports:wt,on:Ft,off:Vt,once:Rt,trigger:Yt,createEvent:qt,toEventTargets:Gt,preventClick:function(){var t=setTimeout(Rt(document,"click",function(e){e.preventDefault(),e.stopImmediatePropagation(),clearTimeout(t)},!0))},fastdom:si,isVoidElement:Pt,isVisible:Ht,selInput:zt,isInput:Wt,filter:Lt,within:jt,bind:t,hasOwn:i,hyphenate:o,camelize:s,ucfirst:l,startsWith:c,endsWith:f,includes:v,isArray:w,isFunction:b,isObject:y,isPlainObject:x,isWindow:k,isDocument:$,isJQuery:I,isNode:T,isNodeCollection:C,isBoolean:E,isString:S,isNumber:_,isNumeric:A,isUndefined:N,toBoolean:D,toNumber:M,toFloat:B,toNode:O,toNodes:H,toList:z,toMs:W,swap:L,assign:j,each:F,sortBy:function(t,e){return t.sort(function(t,i){return t[e]>i[e]?1:i[e]>t[e]?-1:0})},clamp:V,noop:R,intersectRect:Y,pointInRect:q,Dimensions:U,MouseTracker:ui,mergeOptions:pi,Player:gi,Promise:K,Deferred:function(){var t=this;this.promise=new K(function(e,i){t.reject=i,t.resolve=e})},query:bt,queryAll:yt,find:xt,findAll:kt,matches:_t,closest:Nt,parents:Dt,escape:Bt,css:Ie,getStyles:Te,getStyle:Ce,getCssVar:Se,propName:Ae,isTouch:Ti,getPos:Ci});function _i(t){return!(!c(t,"uk-")&&!c(t,"data-uk-"))&&s(t.replace("data-uk-","").replace("uk-",""))}var Ai,Ni,Di,Mi,Bi,Oi=function(t){this._init(t)};Oi.util=Si,Oi.data="__uikit__",Oi.prefix="uk-",Oi.options={},Oi.instances={},Oi.elements=[],function(t){var e,i=t.data;function n(t,e){if(t)for(var i in t)t[i]._isReady&&t[i]._callUpdate(e)}t.use=function(t){if(!t.installed)return t.call(null,this),t.installed=!0,this},t.mixin=function(e,i){i=(S(i)?t.components[i]:i)||this,(e=pi({},e)).mixins=i.options.mixins,delete i.options.mixins,i.options=pi(e,i.options)},t.extend=function(t){t=t||{};var e=function(t){this._init(t)};return(e.prototype=Object.create(this.prototype)).constructor=e,e.options=pi(this.options,t),e.super=this,e.extend=this.extend,e},t.update=function(e,o,r){if(void 0===r&&(r=!1),e=qt(e||"update"),o)if(o=O(o),r)do{n(o[i],e),o=o.parentNode}while(o);else!function t(e,i){if(1===e.nodeType)for(i(e),e=e.firstElementChild;e;)t(e,i),e=e.nextElementSibling}(o,function(t){return n(t[i],e)});else n(t.instances,e)},Object.defineProperty(t,"container",{get:function(){return e||rt.body},set:function(t){e=Le(t)}})}(Oi),(Ai=Oi).prototype._callHook=function(t){var e=this,i=this.$options[t];i&&i.forEach(function(t){return t.call(e)})},Ai.prototype._callConnected=function(){var t=this;this._connected||(v(Ai.elements,this.$options.el)||Ai.elements.push(this.$options.el),Ai.instances[this._uid]=this,this._data={},this._callHook("beforeConnect"),this._connected=!0,this._initEvents(),this._initObserver(),this._callHook("connected"),this._isReady||Kt(function(){return t._callReady()}),this._callUpdate())},Ai.prototype._callDisconnected=function(){if(this._connected){this._callHook("beforeDisconnect"),this._observer&&(this._observer.disconnect(),this._observer=null);var t=Ai.elements.indexOf(this.$options.el);~t&&Ai.elements.splice(t,1),delete Ai.instances[this._uid],this._unbindEvents(),this._callHook("disconnected"),this._connected=!1}},Ai.prototype._callReady=function(){this._isReady||(this._isReady=!0,this._callHook("ready"),this._resetComputeds(),this._callUpdate())},Ai.prototype._callUpdate=function(t){var e=this,i=(t=qt(t||"update")).type;v(["update","load","resize"],i)&&this._resetComputeds();var n=this.$options.update,o=this._frames,r=o.reads,s=o.writes;n&&n.forEach(function(n,o){var a=n.read,l=n.write,h=n.events;("update"===i||v(h,i))&&(a&&!v(si.reads,r[o])&&(r[o]=si.read(function(){var i=a.call(e,e._data,t);!1===i&&l?(si.clear(s[o]),delete s[o]):x(i)&&j(e._data,i),delete r[o]})),l&&!v(si.writes,s[o])&&(s[o]=si.write(function(){l.call(e,e._data,t),delete s[o]})))})},function(e){var n=0;function r(t,e){var i={},n=t.args;void 0===n&&(n=[]);var r=t.props;void 0===r&&(r={});var a=t.el;if(!r)return i;for(var l in r){var h=o(l);if(J(a,h)){var d=u(r[l],X(a,h),a);if("target"===h&&(!d||c(d,"_")))continue;i[l]=d}}var f=function(t,e){var i;void 0===e&&(e=[]);try{return t?c(t,"{")?JSON.parse(t):e.length&&!v(t,":")?((i={})[e[0]]=t,i):t.split(";").reduce(function(t,e){var i=e.split(/:(.+)/),n=i[0],o=i[1];return n&&o&&(t[n.trim()]=o.trim()),t},{}):{}}catch(t){return{}}}(Q(a,e),n);for(var p in f){var m=s(p);void 0!==r[m]&&(i[m]=u(r[m],f[p],a))}return i}function a(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:function(){var o=t._computeds,r=t.$props,s=t.$el;return i(o,e)||(o[e]=n.call(t,r,s)),o[e]},set:function(i){t._computeds[e]=i}})}function l(e,i,n){x(i)||(i={name:n,handler:i});var o,r,s=i.name,a=i.el,h=i.handler,u=i.capture,c=i.delegate,d=i.filter,f=i.self;a=b(a)?a.call(e):a||e.$el,w(a)?a.forEach(function(t){return l(e,j({},i,{el:t}),n)}):!a||d&&!d.call(e)||(o=S(h)?e[h]:t(h,e),h=function(t){return w(t.detail)?o.apply(void 0,[t].concat(t.detail)):o(t)},f&&(r=h,h=function(t){if(t.target===t.currentTarget||t.target===t.current)return r.call(null,t)}),e._events.push(Ft(a,s,c?S(c)?c:c.call(e):null,h,u)))}function h(t,e){return t.every(function(t){return!t||!i(t,e)})}function u(t,e,i){return t===Boolean?D(e):t===Number?M(e):"query"===t?bt(e,i):"list"===t?z(e):"media"===t?function(t){if(S(t))if("@"===t[0]){var e="media-"+t.substr(1);t=B(Se(e))}else if(isNaN(t))return t;return!(!t||isNaN(t))&&"(min-width: "+t+"px)"}(e):t?t(e):e}e.prototype.props={},e.prototype._init=function(t){t=t||{},t=this.$options=pi(this.constructor.options,t),this.$el=null,this.$name=e.prefix+o(this.$options.name),this.$props={},this._frames={reads:{},writes:{}},this._events=[],this._uid=n++,this._initData(),this._initMethods(),this._initComputeds(),this._callHook("created"),t.el&&this.$mount(t.el)},e.prototype._initData=function(){var t=this.$options,e=t.defaults,n=t.data;void 0===n&&(n={});var o=t.args;void 0===o&&(o=[]);var r=t.props;void 0===r&&(r={});var s=t.el;for(var a in o.length&&w(n)&&(n=n.slice(0,o.length).reduce(function(t,e,i){return x(e)?j(t,e):t[o[i]]=e,t},{})),j({},e,r))this.$props[a]=this[a]=i(n,a)&&!N(n[a])?u(r[a],n[a],s):e?e[a]&&w(e[a])?e[a].concat():e[a]:null},e.prototype._initMethods=function(){var e=this.$options.methods;if(e)for(var i in e)this[i]=t(e[i],this)},e.prototype._initComputeds=function(){var t=this.$options.computed;if(this._resetComputeds(),t)for(var e in t)a(this,e,t[e])},e.prototype._resetComputeds=function(){this._computeds={}},e.prototype._initProps=function(t){var e;for(e in this._resetComputeds(),t=t||r(this.$options,this.$name))N(t[e])||(this.$props[e]=t[e]);var i=[this.$options.computed,this.$options.methods];for(e in this.$props)e in t&&h(i,e)&&(this[e]=this.$props[e])},e.prototype._initEvents=function(){var t=this,e=this.$options.events;e&&e.forEach(function(e){if(i(e,"handler"))l(t,e);else for(var n in e)l(t,e[n],n)})},e.prototype._unbindEvents=function(){this._events.forEach(function(t){return t()}),this._events=[]},e.prototype._initObserver=function(){var t=this,e=this.$options,i=e.attrs,n=e.props,s=e.el;!this._observer&&n&&i&&lt&&(i=w(i)?i:Object.keys(n).map(function(t){return o(t)}),this._observer=new lt(function(){var e=r(t.$options,t.$name);i.some(function(i){return!N(e[i])&&e[i]!==t.$props[i]})&&t.$reset(e)}),this._observer.observe(s,{attributes:!0,attributeFilter:i.concat([this.$name,"data-"+this.$name])}))}}(Oi),Di=(Ni=Oi).data,Ni.prototype.$mount=function(t){var e=this.$options.name;t[Di]||(t[Di]={}),t[Di][e]||(t[Di][e]=this,this.$el=this.$options.el=this.$options.el||t,this._initProps(),this._callHook("init"),jt(t,st)&&this._callConnected())},Ni.prototype.$emit=function(t){this._callUpdate(t)},Ni.prototype.$update=function(t,e){Ni.update(t,this.$options.el,e)},Ni.prototype.$reset=function(t){this._callDisconnected(),this._initProps(t),this._callConnected()},Ni.prototype.$destroy=function(t){void 0===t&&(t=!1);var e=this.$options,i=e.el,n=e.name;i&&this._callDisconnected(),this._callHook("destroy"),i&&i[Di]&&(delete i[Di][n],Object.keys(i[Di]).length||delete i[Di],t&&le(this.$el))},Bi=(Mi=Oi).data,Mi.components={},Mi.component=function(t,e){var i=s(t);if(x(e))e.name=i,e=Mi.extend(e);else{if(N(e))return Mi.components[i];e.options.name=i}return Mi.components[i]=e,Mi[i]=function(t,e){for(var n=arguments.length,o=Array(n);n--;)o[n]=arguments[n];return x(t)?new Mi.components[i]({data:t}):Mi.components[i].options.functional?new Mi.components[i]({data:[].concat(o)}):t&&t.nodeType?r(t):je(t).map(r)[0];function r(t){var n=Mi.getComponent(t,i);return n&&e&&n.$reset(e),n||new Mi.components[i]({el:t,data:e||{}})}},Mi._initialized&&!e.options.functional&&si.read(function(){return Mi[i]("[uk-"+t+"],[data-uk-"+t+"]")}),Mi.components[i]},Mi.getComponents=function(t){return t&&(t=I(t)?t[0]:t)&&t[Bi]||{}},Mi.getComponent=function(t,e){return Mi.getComponents(t)[e]},Mi.connect=function(t){if(t[Bi])for(var e in t[Bi])t[Bi][e]._callConnected();for(var i=0;i<t.attributes.length;i++){var n=_i(t.attributes[i].name);n&&n in Mi.components&&Mi[n](t)}},Mi.disconnect=function(t){for(var e in t[Bi])t[Bi][e]._callDisconnected()};var Pi,Hi,zi={init:function(){me(this.$el,this.$name)}},Wi={props:{container:Boolean},defaults:{container:!0},computed:{container:function(t){var e=t.container;return!0===e&&Oi.container||e&&Le(e)}}},Li={props:{cls:Boolean,animation:"list",duration:Number,origin:String,transition:String,queued:Boolean},defaults:{cls:!1,animation:[!1],duration:200,origin:!1,transition:"linear",queued:!1,initProps:{overflow:"",height:"",paddingTop:"",paddingBottom:"",marginTop:"",marginBottom:""},hideProps:{overflow:"hidden",height:0,paddingTop:0,paddingBottom:0,marginTop:0,marginBottom:0}},computed:{hasAnimation:function(t){return!!t.animation[0]},hasTransition:function(t){var e=t.animation;return this.hasAnimation&&!0===e[0]}},methods:{toggleElement:function(t,e,i){var n=this;return new K(function(o){var r,s=function(t){return K.all(t.map(function(t){return n._toggleElement(t,e,i)}))},a=(t=H(t)).filter(function(t){return n.isToggled(t)}),l=t.filter(function(t){return!v(a,t)});if(n.queued&&N(i)&&N(e)&&n.hasAnimation&&!(t.length<2)){var h=rt.body,u=h.scrollTop,c=a[0],d=We.inProgress(c)&&be(c,"uk-animation-leave")||Be.inProgress(c)&&"0px"===c.style.height;r=s(a),d||(r=r.then(function(){var t=s(l);return h.scrollTop=u,t}))}else r=s(l.concat(a));r.then(o,R)})},toggleNow:function(t,e){var i=this;return new K(function(n){return K.all(H(t).map(function(t){return i._toggleElement(t,e,!1)})).then(n,R)})},isToggled:function(t){var e=H(t||this.$el);return this.cls?be(e,this.cls.split(" ")[0]):!J(e,"hidden")},updateAria:function(t){!1===this.cls&&X(t,"aria-hidden",!this.isToggled(t))},_toggleElement:function(t,e,i){var n=this;if(e=E(e)?e:We.inProgress(t)?be(t,"uk-animation-leave"):Be.inProgress(t)?"0px"===t.style.height:!this.isToggled(t),!Yt(t,"before"+(e?"show":"hide"),[this]))return K.reject();var o=(!1!==i&&this.hasAnimation?this.hasTransition?this._toggleHeight:this._toggleAnimation:this._toggleImmediate)(t,e);return Yt(t,e?"show":"hide",[this]),o.then(function(){Yt(t,e?"shown":"hidden",[n]),Oi.update(null,t)})},_toggle:function(t,e){t&&(this.cls?ye(t,this.cls,v(this.cls," ")?void 0:e):X(t,"hidden",e?null:""),je("[autofocus]",t).some(function(t){return Ht(t)&&(t.focus()||!0)}),this.updateAria(t),Oi.update(null,t))},_toggleImmediate:function(t,e){return this._toggle(t,e),K.resolve()},_toggleHeight:function(t,e){var i=this,n=Be.inProgress(t),o=t.hasChildNodes?B(Ie(t.firstElementChild,"marginTop"))+B(Ie(t.lastElementChild,"marginBottom")):0,r=Ht(t)?Xe(t)+(n?0:o):0;Be.cancel(t),this.isToggled(t)||this._toggle(t,!0),Xe(t,""),si.flush();var s=Xe(t)+(n?0:o);return Xe(t,r),(e?Be.start(t,j({},this.initProps,{overflow:"hidden",height:s}),Math.round(this.duration*(1-r/s)),this.transition):Be.start(t,this.hideProps,Math.round(this.duration*(r/s)),this.transition).then(function(){return i._toggle(t,!1)})).then(function(){return Ie(t,i.initProps)})},_toggleAnimation:function(t,e){var i=this;return We.cancel(t),e?(this._toggle(t,!0),We.in(t,this.animation[0],this.duration,this.origin)):We.out(t,this.animation[1]||this.animation[0],this.duration,this.origin).then(function(){return i._toggle(t,!1)})}}},ji={mixins:[zi,Wi,Li],props:{clsPanel:String,selClose:String,escClose:Boolean,bgClose:Boolean,stack:Boolean},defaults:{cls:"uk-open",escClose:!0,bgClose:!0,overlay:!0,stack:!1},computed:{panel:function(t,e){return Le("."+t.clsPanel,e)},transitionElement:function(){return this.panel},transitionDuration:function(){return W(Ie(this.transitionElement,"transitionDuration"))}},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.hide()}},{name:"toggle",self:!0,handler:function(t){t.defaultPrevented||(t.preventDefault(),this.toggle())}},{name:"beforeshow",self:!0,handler:function(t){var e=Pi&&Pi!==this&&Pi;if(Pi=this,e){if(!this.stack)return e.hide().then(this.show),void t.preventDefault();this.prev=e}!function(){if(Hi)return;Hi=[Ft(st,"click",function(t){var e=t.target,i=t.defaultPrevented;Pi&&Pi.bgClose&&!i&&!jt(e,Pi.panel||Pi.$el)&&Pi.hide()}),Ft(rt,"keydown",function(t){27===t.keyCode&&Pi&&Pi.escClose&&(t.preventDefault(),Pi.hide())})]}()}},{name:"beforehide",self:!0,handler:function(){(Pi=Pi&&Pi!==this&&Pi||this.prev)||(Hi&&Hi.forEach(function(t){return t()}),Hi=null)}},{name:"show",self:!0,handler:function(){be(st,this.clsPage)||(this.scrollbarWidth=Je(ot)-st.offsetWidth,Ie(rt.body,"overflowY",this.scrollbarWidth&&this.overlay?"scroll":"")),me(st,this.clsPage)}},{name:"hidden",self:!0,handler:function(){for(var t,e=this.prev;e;){if(e.clsPage===this.clsPage){t=!0;break}e=e.prev}t||ge(st,this.clsPage),!this.prev&&Ie(rt.body,"overflowY","")}}],methods:{toggle:function(){return this.isToggled()?this.hide():this.show()},show:function(){if(!this.isToggled())return this.container&&this.$el.parentNode!==this.container&&(oe(this.container,this.$el),this._callConnected()),this.toggleNow(this.$el,!0)},hide:function(){if(this.isToggled())return this.toggleNow(this.$el,!1)},getActive:function(){return Pi},_toggleImmediate:function(t,e){var i=this;return new K(function(n){return requestAnimationFrame(function(){i._toggle(t,e),i.transitionDuration?Rt(i.transitionElement,"transitionend",n,!1,function(t){return t.target===i.transitionElement}):n()})})}}};var Fi={props:{pos:String,offset:null,flip:Boolean,clsPos:String},defaults:{pos:"bottom-"+(at?"right":"left"),flip:!0,offset:!1,clsPos:""},computed:{pos:function(t){var e=t.pos;return(e+(v(e,"-")?"":"-center")).split("-")},dir:function(){return this.pos[0]},align:function(){return this.pos[1]}},methods:{positionAt:function(t,e,i){var n;ve(t,this.clsPos+"-(top|bottom|left|right)(-[a-z]+)?"),Ie(t,{top:"",left:""});var o=this.offset;o=A(o)?o:(n=Le(o))?Ye(n)["x"===r?"left":"top"]-Ye(e)["x"===r?"right":"bottom"]:0;var r=this.getAxis(),s=Re(t,e,"x"===r?ei(this.dir)+" "+this.align:this.align+" "+ei(this.dir),"x"===r?this.dir+" "+this.align:this.align+" "+this.dir,"x"===r?""+("left"===this.dir?-o:o):" "+("top"===this.dir?-o:o),null,this.flip,i).target,a=s.x,l=s.y;this.dir="x"===r?a:l,this.align="x"===r?l:a,ye(t,this.clsPos+"-"+this.dir+"-"+this.align,!1===this.offset)},getAxis:function(){return"top"===this.dir||"bottom"===this.dir?"y":"x"}}};function Vi(t){t.component("accordion",{mixins:[zi,Li],props:{targets:String,active:null,collapsible:Boolean,multiple:Boolean,toggle:String,content:String,transition:String},defaults:{targets:"> *",active:!1,animation:[!0],collapsible:!0,multiple:!1,clsOpen:"uk-open",toggle:"> .uk-accordion-title",content:"> .uk-accordion-content",transition:"ease"},computed:{items:function(t,e){return je(t.targets,e)}},events:[{name:"click",delegate:function(){return this.targets+" "+this.$props.toggle},handler:function(t){t.preventDefault(),this.toggle(te(je(this.targets+" "+this.$props.toggle,this.$el),t.current))}}],connected:function(){if(!1!==this.active){var t=this.items[Number(this.active)];t&&!be(t,this.clsOpen)&&this.toggle(t,!1)}},update:function(){var t=this;this.items.forEach(function(e){return t._toggleImmediate(Le(t.content,e),be(e,t.clsOpen))});var e=!this.collapsible&&!be(this.items,this.clsOpen)&&this.items[0];e&&this.toggle(e,!1)},methods:{toggle:function(t,e){var i=this,n=ee(t,this.items),o=Lt(this.items,"."+this.clsOpen);(t=this.items[n])&&[t].concat(!this.multiple&&!v(o,t)&&o||[]).forEach(function(n){var r=n===t,s=r&&!be(n,i.clsOpen);if(s||!r||i.collapsible||!(o.length<2)){ye(n,i.clsOpen,s);var a=n._wrapper?n._wrapper.firstElementChild:Le(i.content,n);n._wrapper||(n._wrapper=he(a,"<div>"),X(n._wrapper,"hidden",s?"":null)),i._toggleImmediate(a,!0),i.toggleElement(n._wrapper,s,e).then(function(){be(n,i.clsOpen)===s&&(s||i._toggleImmediate(a,!1),n._wrapper=null,ce(a))})}})}}})}function Ri(t){t.component("alert",{attrs:!0,mixins:[zi,Li],args:"animation",props:{close:String},defaults:{animation:[!0],selClose:".uk-alert-close",duration:150,hideProps:j({opacity:0},Li.defaults.hideProps)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.close()}}],methods:{close:function(){var t=this;this.toggleElement(this.$el).then(function(){return t.$destroy(!0)})}}})}function Yi(t){Kt(function(){var e=0,i=0;if(Ft(ot,"load resize",t.update),Ft(ot,"scroll",function(i){i.dir=e<=ot.pageYOffset?"down":"up",i.scrollY=e=ot.pageYOffset,t.update(i)}),Ft(rt,"animationstart",function(t){var e=t.target;(Ie(e,"animationName")||"").match(/^uk-.*(left|right)/)&&(i++,rt.body.style.overflowX="hidden",setTimeout(function(){--i||(rt.body.style.overflowX="")},W(Ie(e,"animationDuration"))+100))},!0),ct){var n="uk-hover";Ft(rt,"tap",function(t){var e=t.target;return je("."+n).forEach(function(t){return!jt(e,t)&&ge(t,n)})}),Object.defineProperty(t,"hoverSelector",{set:function(t){Ft(rt,"tap",t,function(t){return me(t.current,n)})}}),t.hoverSelector=".uk-animation-toggle, .uk-transition-toggle, [uk-hover]"}})}function qi(t){t.component("cover",{mixins:[zi,t.components.video.options],props:{width:Number,height:Number},defaults:{automute:!0},update:{write:function(){var t=this.$el;if(Ht(t)){var e=t.parentNode,i=e.offsetHeight,n=e.offsetWidth;Ie(Ie(t,{width:"",height:""}),U.cover({width:this.width||t.clientWidth,height:this.height||t.clientHeight},{width:n+(n%2?1:0),height:i+(i%2?1:0)}))}},events:["load","resize"]},events:{loadedmetadata:function(){this.$emit()}}})}function Ui(t){var e,i;t.component("drop",{mixins:[Fi,Li],args:"pos",props:{mode:"list",toggle:Boolean,boundary:"query",boundaryAlign:Boolean,delayShow:Number,delayHide:Number,clsDrop:String},defaults:{mode:["click","hover"],toggle:!0,boundary:ot,boundaryAlign:!1,delayShow:0,delayHide:800,clsDrop:!1,hoverIdle:200,animation:["uk-animation-fade"],cls:"uk-open"},computed:{clsDrop:function(t){var e=t.clsDrop;return e||"uk-"+this.$options.name},clsPos:function(){return this.clsDrop}},init:function(){this.tracker=new ui,me(this.$el,this.clsDrop)},connected:function(){var e=this.$props.toggle;this.toggle=e&&t.toggle(S(e)?bt(e,this.$el):this.$el.previousElementSibling,{target:this.$el,mode:this.mode}),this.updateAria(this.$el)},events:[{name:"click",delegate:function(){return"."+this.clsDrop+"-close"},handler:function(t){t.preventDefault(),this.hide(!1)}},{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){if(!t.defaultPrevented){var e=t.target.hash;e||t.preventDefault(),e&&jt(e,this.$el)||this.hide(!1)}}},{name:"beforescroll",handler:function(){this.hide(!1)}},{name:"toggle",self:!0,handler:function(t,e){t.preventDefault(),this.isToggled()?this.hide(!1):this.show(e,!1)}},{name:mt,filter:function(){return v(this.mode,"hover")},handler:function(t){Ti(t)||(e&&e!==this&&e.toggle&&v(e.toggle.mode,"hover")&&!jt(t.target,e.toggle.$el)&&!q({x:t.pageX,y:t.pageY},Ye(e.$el))&&e.hide(!1),t.preventDefault(),this.show(this.toggle))}},{name:"toggleshow",handler:function(t,e){e&&!v(e.target,this.$el)||(t.preventDefault(),this.show(e||this.toggle))}},{name:"togglehide "+gt,handler:function(t,e){Ti(t)||e&&!v(e.target,this.$el)||(t.preventDefault(),this.toggle&&v(this.toggle.mode,"hover")&&this.hide())}},{name:"beforeshow",self:!0,handler:function(){this.clearTimers(),this.position()}},{name:"show",self:!0,handler:function(){this.tracker.init(),me(this.toggle.$el,this.cls),X(this.toggle.$el,"aria-expanded","true"),function(){if(i)return;i=!0,Ft(st,"click",function(t){var i,n=t.target,o=t.defaultPrevented;if(!o)for(;e&&e!==i&&!jt(n,e.$el)&&(!e.toggle||!jt(n,e.toggle.$el));)i=e,e.hide(!1)})}()}},{name:"beforehide",self:!0,handler:function(){this.clearTimers()}},{name:"hide",handler:function(t){var i=t.target;this.$el===i?(e=this.isActive()?null:e,ge(this.toggle.$el,this.cls),X(this.toggle.$el,"aria-expanded","false"),this.toggle.$el.blur(),je("a, button",this.toggle.$el).forEach(function(t){return t.blur()}),this.tracker.cancel()):e=null===e&&jt(i,this.$el)&&this.isToggled()?this:e}}],update:{write:function(){this.isToggled()&&!We.inProgress(this.$el)&&this.position()},events:["resize"]},methods:{show:function(t,i){var n=this;void 0===i&&(i=!0);var o=function(){return!n.isToggled()&&n.toggleElement(n.$el,!0)},r=function(){if(n.toggle=t||n.toggle,n.clearTimers(),!n.isActive())if(i&&e&&e!==n&&e.isDelaying)n.showTimer=setTimeout(n.show,10);else{if(n.isParentOf(e)){if(!e.hideTimer)return;e.hide(!1)}else if(e&&!n.isChildOf(e)&&!n.isParentOf(e))for(var r;e&&e!==r&&!n.isChildOf(e);)r=e,e.hide(!1);i&&n.delayShow?n.showTimer=setTimeout(o,n.delayShow):o(),e=n}};t&&this.toggle&&t.$el!==this.toggle.$el?(Rt(this.$el,"hide",r),this.hide(!1)):r()},hide:function(t){var e=this;void 0===t&&(t=!0);var i=function(){return e.toggleNow(e.$el,!1)};this.clearTimers(),this.isDelaying=this.tracker.movesTo(this.$el),t&&this.isDelaying?this.hideTimer=setTimeout(this.hide,this.hoverIdle):t&&this.delayHide?this.hideTimer=setTimeout(i,this.delayHide):i()},clearTimers:function(){clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.showTimer=null,this.hideTimer=null,this.isDelaying=!1},isActive:function(){return e===this},isChildOf:function(t){return t&&t!==this&&jt(this.$el,t.$el)},isParentOf:function(t){return t&&t!==this&&jt(t.$el,this.$el)},position:function(){ve(this.$el,this.clsDrop+"-(stack|boundary)"),Ie(this.$el,{top:"",left:"",display:"block"}),ye(this.$el,this.clsDrop+"-boundary",this.boundaryAlign);var t=Ye(this.boundary),e=this.boundaryAlign?t:Ye(this.toggle.$el);if("justify"===this.align){var i="y"===this.getAxis()?"width":"height";Ie(this.$el,i,e[i])}else this.$el.offsetWidth>Math.max(t.right-e.left,e.right-t.left)&&me(this.$el,this.clsDrop+"-stack");this.positionAt(this.$el,this.boundaryAlign?this.boundary:this.toggle.$el,this.boundary),Ie(this.$el,"display","")}}}),t.drop.getActive=function(){return e}}function Xi(t){t.component("dropdown",t.components.drop.extend({name:"dropdown"}))}function Ji(t){t.component("form-custom",{mixins:[zi],args:"target",props:{target:Boolean},defaults:{target:!1},computed:{input:function(t,e){return Le(zt,e)},state:function(){return this.input.nextElementSibling},target:function(t,e){var i=t.target;return i&&(!0===i&&this.input.parentNode===e&&this.input.nextElementSibling||bt(i,e))}},update:function(){var t,e=this.target,i=this.input;e&&(e[Wt(e)?"value":"textContent"]=i.files&&i.files[0]?i.files[0].name:_t(i,"select")&&(t=je("option",i).filter(function(t){return t.selected})[0])?t.textContent:i.value)},events:[{name:"focusin focusout mouseenter mouseleave",delegate:zt,handler:function(t){var e=t.type;t.current===this.input&&ye(this.state,"uk-"+(v(e,"focus")?"focus":"hover"),v(["focusin","mouseenter"],e))}},{name:"change",handler:function(){this.$emit()}}]})}function Gi(t){t.component("gif",{update:{read:function(t){var e=ii(this.$el);if(!e||t.isInView===e)return!1;t.isInView=e},write:function(){this.$el.src=this.$el.src},events:["scroll","load","resize"]}})}function Zi(t){t.component("grid",t.components.margin.extend({mixins:[zi],name:"grid",defaults:{margin:"uk-grid-margin",clsStack:"uk-grid-stack"},update:{write:function(t){var e=t.stacks;ye(this.$el,this.clsStack,e)},events:["load","resize"]}}))}function Qi(t){t.component("height-match",{args:"target",props:{target:String,row:Boolean},defaults:{target:"> *",row:!0},computed:{elements:function(t,e){return je(t.target,e)}},update:{read:function(){var t=this,e=!1;return Ie(this.elements,"minHeight",""),{rows:this.row?this.elements.reduce(function(t,i){return e!==i.offsetTop?t.push([i]):t[t.length-1].push(i),e=i.offsetTop,t},[]).map(function(e){return t.match(e)}):[this.match(this.elements)]}},write:function(t){t.rows.forEach(function(t){var e=t.height;return Ie(t.elements,"minHeight",e)})},events:["load","resize"]},methods:{match:function(t){if(t.length<2)return{};var e=[],i=0;return t.forEach(function(t){var n,o;Ht(t)||(n=X(t,"style"),o=X(t,"hidden"),X(t,{style:(n||"")+";display:block !important;",hidden:null})),i=Math.max(i,t.offsetHeight),e.push(t.offsetHeight),N(n)||X(t,{style:n,hidden:o})}),t=t.filter(function(t,n){return e[n]<i}),{height:i,elements:t}}}})}function Ki(t){function e(t){return t&&t.offsetHeight||0}t.component("height-viewport",{props:{expand:Boolean,offsetTop:Boolean,offsetBottom:Boolean,minHeight:Number},defaults:{expand:!1,offsetTop:!1,offsetBottom:!1,minHeight:0},update:{write:function(){Ie(this.$el,"boxSizing","border-box");var t,i=Xe(ot),n=0;if(this.expand){Ie(this.$el,{height:"",minHeight:""});var o=i-e(st);o>0&&(t=e(this.$el)+o)}else{var r=Ye(this.$el).top;r<i/2&&this.offsetTop&&(n+=r),!0===this.offsetBottom?n+=e(this.$el.nextElementSibling):A(this.offsetBottom)?n+=i/100*this.offsetBottom:this.offsetBottom&&f(this.offsetBottom,"px")?n+=B(this.offsetBottom):S(this.offsetBottom)&&(n+=e(bt(this.offsetBottom,this.$el))),t=n?"calc(100vh - "+n+"px)":"100vh"}if(t){Ie(this.$el,{height:"",minHeight:t});var s=this.$el.offsetHeight;this.minHeight&&this.minHeight>s&&Ie(this.$el,"minHeight",this.minHeight),i-n>=s&&Ie(this.$el,"height",t)}},events:["load","resize"]}})}var tn,en='<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',nn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',on='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',rn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>',sn='<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',an='<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',ln='<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',hn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',un='<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',cn='<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',dn='<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>',fn='<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>',pn='<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>',mn='<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>',gn='<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',vn='<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>';function wn(t){var e={},i={spinner:gn,totop:vn,marker:on,"close-icon":en,"close-large":nn,"navbar-toggle-icon":rn,"overlay-icon":sn,"pagination-next":an,"pagination-previous":ln,"search-icon":hn,"search-large":un,"search-navbar":cn,"slidenav-next":dn,"slidenav-next-large":fn,"slidenav-previous":pn,"slidenav-previous-large":mn};function n(e,i){t.component(e,t.components.icon.extend({name:e,mixins:i?[i]:[],defaults:{icon:e}}))}t.component("icon",t.components.svg.extend({attrs:["icon","ratio"],mixins:[zi],name:"icon",args:"icon",props:["icon"],defaults:{exclude:["id","style","class","src","icon"]},init:function(){me(this.$el,"uk-icon"),at&&(this.icon=L(L(this.icon,"left","right"),"previous","next"))},methods:{getSvg:function(){var t=function(t){if(!i[t])return null;e[t]||(e[t]=Le(i[t].trim()));return e[t]}(this.icon);return t?K.resolve(t):K.reject("Icon not found.")}}})),["marker","navbar-toggle-icon","overlay-icon","pagination-previous","pagination-next","totop"].forEach(function(t){return n(t)}),["slidenav-previous","slidenav-next"].forEach(function(t){return n(t,{init:function(){me(this.$el,"uk-slidenav"),be(this.$el,"uk-slidenav-large")&&(this.icon+="-large")}})}),n("search-icon",{init:function(){be(this.$el,"uk-search-icon")&&Dt(this.$el,".uk-search-large").length?this.icon="search-large":Dt(this.$el,".uk-search-navbar").length&&(this.icon="search-navbar")}}),n("close",{init:function(){this.icon="close-"+(be(this.$el,"uk-close-large")?"large":"icon")}}),n("spinner",{connected:function(){var t=this;this.svg.then(function(e){return 1!==t.ratio&&Ie(Le("circle",e),"stroke-width",1/t.ratio)},R)}}),t.icon.add=function(n){Object.keys(n).forEach(function(t){i[t]=n[t],delete e[t]}),t._initialized&&F(t.instances,function(t){"icon"===t.$options.name&&t.$reset()})}}function bn(t){t.component("leader",{mixins:[zi],props:{fill:String,media:"media"},defaults:{fill:"",media:!1,clsWrapper:"uk-leader-fill",clsHide:"uk-leader-hide",attrFill:"data-fill"},computed:{fill:function(t){var e=t.fill;return e||Se("leader-fill")}},connected:function(){var t;t=ue(this.$el,'<span class="'+this.clsWrapper+'">'),this.wrapper=t[0]},disconnected:function(){ce(this.wrapper.childNodes)},update:[{read:function(t){var e=t.changed,i=t.width,n=i;return{width:i=Math.floor(this.$el.offsetWidth/2),changed:e||n!==i,hide:this.media&&!ot.matchMedia(this.media).matches}},write:function(t){ye(this.wrapper,this.clsHide,t.hide),t.changed&&(t.changed=!1,X(this.wrapper,this.attrFill,new Array(t.width).join(this.fill)))},events:["load","resize"]}]})}function yn(t){t.component("margin",{props:{margin:String,firstColumn:Boolean},defaults:{margin:"uk-margin-small-top",firstColumn:"uk-first-column"},update:{read:function(t){var e=this.$el.children;if(!e.length||!Ht(this.$el))return t.rows=!1;t.stacks=!0;for(var i=[[]],n=0;n<e.length;n++){var o=e[n],r=o.getBoundingClientRect();if(r.height)for(var s=i.length-1;s>=0;s--){var a=i[s];if(!a[0]){a.push(o);break}var l=a[0].getBoundingClientRect();if(r.top>=Math.floor(l.bottom)){i.push([o]);break}if(Math.floor(r.bottom)>l.top){if(t.stacks=!1,r.left<l.left&&!at){a.unshift(o);break}a.push(o);break}if(0===s){i.unshift([o]);break}}}t.rows=i},write:function(t){var e=this;t.rows.forEach(function(t,i){return t.forEach(function(t,n){ye(t,e.margin,0!==i),ye(t,e.firstColumn,0===n)})})},events:["load","resize"]}})}function xn(t){t.component("modal",{mixins:[ji],defaults:{clsPage:"uk-modal-page",clsPanel:"uk-modal-dialog",selClose:".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"},events:[{name:"show",self:!0,handler:function(){be(this.panel,"uk-margin-auto-vertical")?me(this.$el,"uk-flex"):Ie(this.$el,"display","block"),Xe(this.$el)}},{name:"hidden",self:!0,handler:function(){Ie(this.$el,"display",""),ge(this.$el,"uk-flex")}}]}),t.component("overflow-auto",{mixins:[zi],computed:{modal:function(t,e){return Nt(e,".uk-modal")},panel:function(t,e){return Nt(e,".uk-modal-dialog")}},connected:function(){Ie(this.$el,"minHeight",150)},update:{write:function(){if(this.panel&&this.modal){var t=Ie(this.$el,"maxHeight");Ie(Ie(this.$el,"maxHeight",150),"maxHeight",Math.max(150,150+Xe(this.modal)-this.panel.offsetHeight)),t!==Ie(this.$el,"maxHeight")&&Yt(this.$el,"resize")}},events:["load","resize"]}}),t.modal.dialog=function(e,i){var n=t.modal(' <div class="uk-modal"> <div class="uk-modal-dialog">'+e+"</div> </div> ",i);return n.show(),Ft(n.$el,"hidden",function(t){t.target===t.currentTarget&&n.$destroy(!0)}),n},t.modal.alert=function(e,i){return i=j({bgClose:!1,escClose:!1,labels:t.modal.labels},i),new K(function(n){return Ft(t.modal.dialog(' <div class="uk-modal-body">'+(S(e)?e:ne(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>'+i.labels.ok+"</button> </div> ",i).$el,"hide",n)})},t.modal.confirm=function(e,i){return i=j({bgClose:!1,escClose:!0,labels:t.modal.labels},i),new K(function(n,o){var r=t.modal.dialog(' <form> <div class="uk-modal-body">'+(S(e)?e:ne(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+i.labels.cancel+'</button> <button class="uk-button uk-button-primary" autofocus>'+i.labels.ok+"</button> </div> </form> ",i),s=!1;Ft(r.$el,"submit","form",function(t){t.preventDefault(),n(),s=!0,r.hide()}),Ft(r.$el,"hide",function(){s||o()})})},t.modal.prompt=function(e,i,n){return n=j({bgClose:!1,escClose:!0,labels:t.modal.labels},n),new K(function(o){var r=t.modal.dialog(' <form class="uk-form-stacked"> <div class="uk-modal-body"> <label>'+(S(e)?e:ne(e))+'</label> <input class="uk-input" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+n.labels.cancel+'</button> <button class="uk-button uk-button-primary">'+n.labels.ok+"</button> </div> </form> ",n),s=Le("input",r.$el);s.value=i;var a=!1;Ft(r.$el,"submit","form",function(t){t.preventDefault(),o(s.value),a=!0,r.hide()}),Ft(r.$el,"hide",function(){a||o(null)})})},t.modal.labels={ok:"Ok",cancel:"Cancel"}}function kn(t){t.component("nav",t.components.accordion.extend({name:"nav",defaults:{targets:"> .uk-parent",toggle:"> a",content:"> ul"}}))}function $n(t){t.component("navbar",{mixins:[zi],props:{dropdown:String,mode:"list",align:String,offset:Number,boundary:Boolean,boundaryAlign:Boolean,clsDrop:String,delayShow:Number,delayHide:Number,dropbar:Boolean,dropbarMode:String,dropbarAnchor:"query",duration:Number},defaults:{dropdown:".uk-navbar-nav > li",align:at?"right":"left",clsDrop:"uk-navbar-dropdown",mode:void 0,offset:void 0,delayShow:void 0,delayHide:void 0,boundaryAlign:void 0,flip:"x",boundary:!0,dropbar:!1,dropbarMode:"slide",dropbarAnchor:!1,duration:200},computed:{boundary:function(t,e){var i=t.boundary,n=t.boundaryAlign;return!0===i||n?e:i},pos:function(t){return"bottom-"+t.align}},beforeConnect:function(){var t=this.$props.dropbar;this.dropbar=t&&(S(t)&&bt(t,this.$el)||Le("<div></div>")),this.dropbar&&(me(this.dropbar,"uk-navbar-dropbar"),"slide"===this.dropbarMode&&me(this.dropbar,"uk-navbar-dropbar-slide"))},disconnected:function(){this.dropbar&&le(this.dropbar)},update:function(){t.drop(je(this.dropdown+" ."+this.clsDrop,this.$el).filter(function(e){return!t.getComponent(e,"drop")&&!t.getComponent(e,"dropdown")}),j({},this.$props,{boundary:this.boundary,pos:this.pos,offset:this.dropbar||this.offset}))},events:[{name:"mouseover",delegate:function(){return this.dropdown},handler:function(t){var e=t.current,i=this.getActive();i&&i.toggle&&!jt(i.toggle.$el,e)&&!i.tracker.movesTo(i.$el)&&i.hide(!1)}},{name:"mouseleave",el:function(){return this.dropbar},handler:function(){var t=this.getActive();t&&!_t(this.dropbar,":hover")&&t.hide()}},{name:"beforeshow",capture:!0,filter:function(){return this.dropbar},handler:function(){this.dropbar.parentNode||se(this.dropbarAnchor||this.$el,this.dropbar)}},{name:"show",capture:!0,filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el;this.clsDrop&&me(i,this.clsDrop+"-dropbar"),this.transitionTo(i.offsetHeight+B(Ie(i,"margin-top"))+B(Ie(i,"margin-bottom")),i)}},{name:"beforehide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();_t(this.dropbar,":hover")&&n&&n.$el===i&&t.preventDefault()}},{name:"hide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();(!n||n&&n.$el===i)&&this.transitionTo(0)}}],methods:{getActive:function(){var e=t.drop.getActive();return e&&v(e.mode,"hover")&&jt(e.toggle.$el,this.$el)&&e},transitionTo:function(t,e){var i=this.dropbar,n=Ht(i)?Xe(i):0;return Ie(e=n<t&&e,{height:n,overflow:"hidden"}),Xe(i,n),Be.cancel([e,i]),Be.start([e,i],{height:t},this.duration).catch(R).finally(function(){return Ie(e,{height:"",overflow:""})})}}})}function In(t){t.component("offcanvas",{mixins:[ji],args:"mode",props:{content:String,mode:String,flip:Boolean,overlay:Boolean},defaults:{content:".uk-offcanvas-content",mode:"slide",flip:!1,overlay:!1,clsPage:"uk-offcanvas-page",clsContainer:"uk-offcanvas-container",clsPanel:"uk-offcanvas-bar",clsFlip:"uk-offcanvas-flip",clsContent:"uk-offcanvas-content",clsContentAnimation:"uk-offcanvas-content-animation",clsSidebarAnimation:"uk-offcanvas-bar-animation",clsMode:"uk-offcanvas",clsOverlay:"uk-offcanvas-overlay",selClose:".uk-offcanvas-close"},computed:{content:function(t){var e=t.content;return Le(e)||rt.body},clsFlip:function(t){var e=t.flip,i=t.clsFlip;return e?i:""},clsOverlay:function(t){var e=t.overlay,i=t.clsOverlay;return e?i:""},clsMode:function(t){var e=t.mode,i=t.clsMode;return i+"-"+e},clsSidebarAnimation:function(t){var e=t.mode,i=t.clsSidebarAnimation;return"none"===e||"reveal"===e?"":i},clsContentAnimation:function(t){var e=t.mode,i=t.clsContentAnimation;return"push"!==e&&"reveal"!==e?"":i},transitionElement:function(t){return"reveal"===t.mode?this.panel.parentNode:this.panel}},update:{write:function(){this.getActive()===this&&((this.overlay||this.clsContentAnimation)&&Je(this.content,Je(ot)-this.scrollbarWidth),this.overlay&&(Xe(this.content,Xe(ot)),tn&&(this.content.scrollTop=tn.y)))},events:["resize"]},events:[{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.current;e.hash&&Le(e.hash,this.content)&&(tn=null,this.hide())}},{name:"beforescroll",filter:function(){return this.overlay},handler:function(t,e,i){e&&i&&this.isToggled()&&Le(i,this.content)&&(Rt(this.$el,"hidden",function(){return e.scrollTo(i)}),t.preventDefault())}},{name:"show",self:!0,handler:function(){tn=tn||{x:ot.pageXOffset,y:ot.pageYOffset},"reveal"!==this.mode||be(this.panel,this.clsMode)||(he(this.panel,"<div>"),me(this.panel.parentNode,this.clsMode)),Ie(st,"overflowY",(!this.clsContentAnimation||this.flip)&&this.scrollbarWidth&&this.overlay?"scroll":""),me(rt.body,this.clsContainer,this.clsFlip,this.clsOverlay),Xe(rt.body),me(this.content,this.clsContentAnimation),me(this.panel,this.clsSidebarAnimation+" "+("reveal"!==this.mode?this.clsMode:"")),me(this.$el,this.clsOverlay),Ie(this.$el,"display","block"),Xe(this.$el)}},{name:"hide",self:!0,handler:function(){ge(this.content,this.clsContentAnimation);var t=this.getActive();("none"===this.mode||t&&t!==this&&t!==this.prev)&&Yt(this.panel,"transitionend")}},{name:"hidden",self:!0,handler:function(){if("reveal"===this.mode&&ce(this.panel),this.overlay){if(!tn){var t=this.content,e=t.scrollLeft,i=t.scrollTop;tn={x:e,y:i}}}else tn={x:ot.pageXOffset,y:ot.pageYOffset};ge(this.panel,this.clsSidebarAnimation,this.clsMode),ge(this.$el,this.clsOverlay),Ie(this.$el,"display",""),ge(rt.body,this.clsContainer,this.clsFlip,this.clsOverlay),rt.body.scrollTop=tn.y,Ie(st,"overflow-y",""),Je(this.content,""),Xe(this.content,""),ot.scrollTo(tn.x,tn.y),tn=null}},{name:"swipeLeft swipeRight",handler:function(t){this.isToggled()&&Ti(t)&&("swipeLeft"===t.type&&!this.flip||"swipeRight"===t.type&&this.flip)&&this.hide()}}]})}function Tn(t){t.component("responsive",{props:["width","height"],init:function(){me(this.$el,"uk-responsive-width")},update:{read:function(){return!!(Ht(this.$el)&&this.width&&this.height)&&{width:Je(this.$el.parentNode),height:this.height}},write:function(t){Xe(this.$el,U.contain({height:this.height,width:this.width},t).height)},events:["load","resize"]}})}function Cn(t){t.component("scroll",{props:{duration:Number,offset:Number},defaults:{duration:1e3,offset:0},methods:{scrollTo:function(t){var e=this;t=t&&Le(t)||rt.body;var i=Xe(rt),n=Xe(ot),o=Ye(t).top-this.offset;if(o+n>i&&(o=i-n),Yt(this.$el,"beforescroll",[this,t])){var r=Date.now(),s=ot.pageYOffset,a=function(){var i,n=s+(o-s)*(i=V((Date.now()-r)/e.duration),.5*(1-Math.cos(Math.PI*i)));ot.scrollTo(ot.pageXOffset,n),n!==o?requestAnimationFrame(a):Yt(e.$el,"scrolled",[e,t])};a()}}},events:{click:function(t){t.defaultPrevented||(t.preventDefault(),this.scrollTo(Bt(this.$el.hash).substr(1)))}}})}function En(t){t.component("scrollspy",{args:"cls",props:{cls:"list",target:String,hidden:Boolean,offsetTop:Number,offsetLeft:Number,repeat:Boolean,delay:Number},defaults:{cls:[],target:!1,hidden:!0,offsetTop:0,offsetLeft:0,repeat:!1,delay:0,inViewClass:"uk-scrollspy-inview"},computed:{elements:function(t,e){var i=t.target;return i?je(i,e):[e]}},update:[{write:function(){this.hidden&&Ie(Lt(this.elements,":not(."+this.inViewClass+")"),"visibility","hidden")}},{read:function(e){var i=this;if(!t._initialized)return"complete"===rt.readyState&&requestAnimationFrame(function(){return i.$emit()}),!1;this.elements.forEach(function(t,n){var o=e[n];if(!o||o.el!==t){var r=Q(t,"uk-scrollspy-class");o={el:t,toggles:r&&r.split(",")||i.cls}}o.show=ii(t,i.offsetTop,i.offsetLeft),e[n]=o})},write:function(e){var i=this,n=1===this.elements.length?1:0;this.elements.forEach(function(o,r){var s=e[r],a=s.toggles[r]||s.toggles[0];if(!s.show||s.inview||s.timer)!s.show&&s.inview&&i.repeat&&(s.timer&&(clearTimeout(s.timer),delete s.timer),Ie(o,"visibility",i.hidden?"hidden":""),ge(o,i.inViewClass),ye(o,a),Yt(o,"outview"),t.update(null,o),s.inview=!1);else{var l=function(){Ie(o,"visibility",""),me(o,i.inViewClass),ye(o,a),Yt(o,"inview"),t.update(null,o),s.inview=!0,delete s.timer};i.delay&&n?s.timer=setTimeout(l,i.delay*n):l(),n++}})},events:["scroll","load","resize"]}]})}function Sn(t){t.component("scrollspy-nav",{props:{cls:String,closest:String,scroll:Boolean,overflow:Boolean,offset:Number},defaults:{cls:"uk-active",closest:!1,scroll:!1,overflow:!0,offset:0},computed:{links:function(t,e){return je('a[href^="#"]',e).filter(function(t){return t.hash})},elements:function(){return this.closest?Nt(this.links,this.closest):this.links},targets:function(){return je(this.links.map(function(t){return t.hash}).join(","))}},update:[{read:function(){this.scroll&&t.scroll(this.links,{offset:this.offset||0})}},{read:function(t){var e=this,i=ot.pageYOffset+this.offset+1,n=Xe(rt)-Xe(ot)+this.offset;t.active=!1,this.targets.every(function(o,r){var s=Ye(o).top,a=r+1===e.targets.length;if(!e.overflow&&(0===r&&s>i||a&&s+o.offsetTop<i))return!1;if(!a&&Ye(e.targets[r+1]).top<=i)return!0;if(i>=n)for(var l=e.targets.length-1;l>r;l--)if(ii(e.targets[l])){o=e.targets[l];break}return!(t.active=Le(Lt(e.links,'[href="#'+o.id+'"]')))})},write:function(t){var e=t.active;this.links.forEach(function(t){return t.blur()}),ge(this.elements,this.cls),e&&Yt(this.$el,"active",[e,me(this.closest?Nt(e,this.closest):e,this.cls)])},events:["scroll","load","resize"]}]})}function _n(t){function e(t,e){var i=e.$props,n=e.$el,o=e[t+"Offset"],r=i[t];if(r){if(A(r))return o+B(r);if(S(r)&&r.match(/^-?\d+vh$/))return Xe(ot)*B(r)/100;var s=!0===r?n.parentNode:bt(r,n);return s?Ye(s).top+s.offsetHeight:void 0}}t.component("sticky",{mixins:[zi],attrs:!0,props:{top:null,bottom:Boolean,offset:Number,animation:String,clsActive:String,clsInactive:String,clsFixed:String,clsBelow:String,selTarget:String,widthElement:"query",showOnUp:Boolean,media:"media",target:Number},defaults:{top:0,bottom:!1,offset:0,animation:"",clsActive:"uk-active",clsInactive:"",clsFixed:"uk-sticky-fixed",clsBelow:"uk-sticky-below",selTarget:"",widthElement:!1,showOnUp:!1,media:!1,target:!1},computed:{selTarget:function(t,e){var i=t.selTarget;return i&&Le(i,e)||e}},connected:function(){this.placeholder=Le('<div class="uk-sticky-placeholder"></div>'),this.widthElement=this.$props.widthElement||this.placeholder,this.isActive||this.hide()},disconnected:function(){this.isActive&&(this.isActive=!1,this.hide(),ge(this.selTarget,this.clsInactive)),le(this.placeholder),this.placeholder=null,this.widthElement=null},ready:function(){var t=this;if(this.target&&location.hash&&ot.pageYOffset>0){var e=Le(location.hash);e&&si.read(function(){var i=Ye(e).top,n=Ye(t.$el).top,o=t.$el.offsetHeight;n+o>=i&&n<=i+e.offsetHeight&&ot.scrollTo(0,i-o-t.target-t.offset)})}},events:[{name:"active",self:!0,handler:function(){we(this.selTarget,this.clsInactive,this.clsActive)}},{name:"inactive",self:!0,handler:function(){we(this.selTarget,this.clsActive,this.clsInactive)}}],update:[{write:function(){var t=this.placeholder,i=(this.isActive?t:this.$el).offsetHeight;Ie(t,j({height:"absolute"!==Ie(this.$el,"position")?i:""},Ie(this.$el,["marginTop","marginBottom","marginLeft","marginRight"]))),jt(t,st)||(se(this.$el,t),X(t,"hidden","")),X(this.widthElement,"hidden",null),this.width=this.widthElement.offsetWidth,X(this.widthElement,"hidden",this.isActive?null:""),this.topOffset=Ye(this.isActive?t:this.$el).top,this.bottomOffset=this.topOffset+i;var n=e("bottom",this);this.top=Math.max(B(e("top",this)),this.topOffset)-this.offset,this.bottom=n&&n-i,this.inactive=this.media&&!ot.matchMedia(this.media).matches,this.isActive&&this.update()},events:["load","resize"]},{read:function(t,e){var i=e.scrollY;return void 0===i&&(i=ot.pageYOffset),{scroll:this.scroll=i,visible:Ht(this.$el)}},write:function(t,e){var i=this,n=t.visible,o=t.scroll;void 0===e&&(e={});var r=e.dir;if(!(o<0||!n||this.disabled||this.showOnUp&&!r))if(this.inactive||o<this.top||this.showOnUp&&(o<=this.top||"down"===r||"up"===r&&!this.isActive&&o<=this.bottomOffset)){if(!this.isActive)return;this.isActive=!1,this.animation&&o>this.topOffset?(We.cancel(this.$el),We.out(this.$el,this.animation).then(function(){return i.hide()},R)):this.hide()}else this.isActive?this.update():this.animation?(We.cancel(this.$el),this.show(),We.in(this.$el,this.animation).catch(R)):this.show()},events:["scroll"]}],methods:{show:function(){this.isActive=!0,this.update(),X(this.placeholder,"hidden",null)},hide:function(){this.isActive&&!be(this.selTarget,this.clsActive)||Yt(this.$el,"inactive"),ge(this.$el,this.clsFixed,this.clsBelow),Ie(this.$el,{position:"",top:"",width:""}),X(this.placeholder,"hidden","")},update:function(){var t=0!==this.top||this.scroll>this.top,e=Math.max(0,this.offset);this.bottom&&this.scroll>this.bottom-this.offset&&(e=this.bottom-this.scroll),Ie(this.$el,{position:"fixed",top:e+"px",width:this.width}),be(this.selTarget,this.clsActive)?t||Yt(this.$el,"inactive"):t&&Yt(this.$el,"active"),ye(this.$el,this.clsBelow,this.scroll>this.bottomOffset),me(this.$el,this.clsFixed)}}})}var An,Nn,Dn={};function Mn(t){t.component("svg",{attrs:!0,props:{id:String,icon:String,src:String,style:String,width:Number,height:Number,ratio:Number,class:String},defaults:{ratio:1,id:!1,exclude:["src"],class:""},init:function(){this.class+=" uk-svg"},connected:function(){var t=this;if(!this.icon&&v(this.src,"#")){var n,o=this.src.split("#");if(o.length>1)n=o,this.src=n[0],this.icon=n[1]}this.svg=this.getSvg().then(function(n){var o;if(S(n)?(t.icon&&v(n,"<symbol")&&(n=function(t,n){if(!i[t]){var o;for(i[t]={};o=e.exec(t);)i[t][o[3]]='<svg xmlns="http://www.w3.org/2000/svg"'+o[1]+"svg>"}return i[t][n]}(n,t.icon)||n),o=Le(n.substr(n.indexOf("<svg")))):o=n.cloneNode(!0),!o)return K.reject("SVG not found.");var r=X(o,"viewBox");for(var s in r&&(r=r.split(" "),t.width=t.$props.width||r[2],t.height=t.$props.height||r[3]),t.width*=t.ratio,t.height*=t.ratio,t.$options.props)t[s]&&!v(t.exclude,s)&&X(o,s,t[s]);t.id||G(o,"id"),t.width&&!t.height&&G(o,"height"),t.height&&!t.width&&G(o,"width");var a=t.$el;if(Pt(a)||"CANVAS"===a.tagName){X(a,{hidden:!0,id:null});var l=a.nextElementSibling;l&&o.isEqualNode(l)?o=l:se(a,o)}else{var h=a.lastElementChild;h&&o.isEqualNode(h)?o=h:oe(a,o)}return t.svgEl=o,o},R)},disconnected:function(){var t=this;Pt(this.$el)&&X(this.$el,{hidden:null,id:this.id||null}),this.svg&&this.svg.then(function(e){return(!t._connected||e!==t.svgEl)&&le(e)},R),this.svg=this.svgEl=null},methods:{getSvg:function(){var t=this;return this.src?Dn[this.src]?Dn[this.src]:(Dn[this.src]=new K(function(e,i){c(t.src,"data:")?e(decodeURIComponent(t.src.split(",")[1])):Zt(t.src).then(function(t){return e(t.response)},function(){return i("SVG not found.")})}),Dn[this.src]):K.reject()}}});var e=/<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g,i={}}function Bn(t){t.component("switcher",{mixins:[Li],args:"connect",props:{connect:String,toggle:String,active:Number,swiping:Boolean},defaults:{connect:"~.uk-switcher",toggle:"> *",active:0,swiping:!0,cls:"uk-active",clsContainer:"uk-switcher",attrItem:"uk-switcher-item",queued:!0},computed:{connects:function(t,e){return yt(t.connect,e)},toggles:function(t,e){return je(t.toggle,e)}},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),this.show(t.current)}},{name:"click",el:function(){return this.connects},delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.show(Q(t.current,this.attrItem))}},{name:"swipeRight swipeLeft",filter:function(){return this.swiping},el:function(){return this.connects},handler:function(t){Ti(t)&&(t.preventDefault(),ot.getSelection().toString()||this.show("swipeLeft"===t.type?"next":"previous"))}}],update:function(){var t=this;this.connects.forEach(function(e){return t.updateAria(e.children)}),this.show(Lt(this.toggles,"."+this.cls)[0]||this.toggles[this.active]||this.toggles[0])},methods:{show:function(t){for(var e,i=this,n=this.toggles.length,o=!!this.connects.length&&te(Lt(this.connects[0].children,"."+this.cls)[0]),r=o>=0,s="previous"===t?-1:1,a=ee(t,this.toggles,o),l=0;l<n;l++,a=(a+s+n)%n)if(!_t(i.toggles[a],".uk-disabled, [disabled]")){e=i.toggles[a];break}!e||o>=0&&be(e,this.cls)||o===a||(ge(this.toggles,this.cls),X(this.toggles,"aria-expanded",!1),me(e,this.cls),X(e,"aria-expanded",!0),this.connects.forEach(function(t){r?i.toggleElement([t.children[o],t.children[a]]):i.toggleNow(t.children[a])}))}}})}function On(t){t.component("tab",t.components.switcher.extend({mixins:[zi],name:"tab",props:{media:"media"},defaults:{media:960,attrItem:"uk-tab-item"},init:function(){var e=be(this.$el,"uk-tab-left")?"uk-tab-left":!!be(this.$el,"uk-tab-right")&&"uk-tab-right";e&&t.toggle(this.$el,{cls:e,mode:"media",media:this.media})}}))}function Pn(t){t.component("toggle",{mixins:[t.mixin.togglable],args:"target",props:{href:String,target:null,mode:"list",media:"media"},defaults:{href:!1,target:!1,mode:"click",queued:!0,media:!1},computed:{target:function(t,e){var i=t.href,n=t.target;return n=yt(n||i,e),n.length&&n||[e]}},events:[{name:mt+" "+gt,filter:function(){return v(this.mode,"hover")},handler:function(t){Ti(t)||this.toggle("toggle"+(t.type===mt?"show":"hide"))}},{name:"click",filter:function(){return v(this.mode,"click")||ct},handler:function(t){var e;(Ti(t)||v(this.mode,"click"))&&((Nt(t.target,'a[href="#"], button')||(e=Nt(t.target,"a[href]"))&&(this.cls||!Ht(this.target)||e.hash&&_t(this.target,e.hash)))&&Rt(rt,"click",function(t){return t.preventDefault()}),this.toggle())}}],update:{write:function(){if(v(this.mode,"media")&&this.media){var t=this.isToggled(this.target);(ot.matchMedia(this.media).matches?!t:t)&&this.toggle()}},events:["load","resize"]},methods:{toggle:function(t){Yt(this.target,t||"toggle",[this])&&this.toggleElement(this.target)}}})}function Hn(t){t.component("video",{props:{automute:Boolean,autoplay:Boolean},defaults:{automute:!1,autoplay:!0},computed:{inView:function(t){return"inview"===t.autoplay}},ready:function(){this.player=new gi(this.$el),this.automute&&this.player.mute()},update:[{read:function(t,e){var i=e.type;return!(!this.player||!("scroll"!==i&&"resize"!==i||this.inView))&&{visible:Ht(this.$el)&&"hidden"!==Ie(this.$el,"visibility"),inView:this.inView&&ii(this.$el)}},write:function(t){var e=t.visible,i=t.inView;!e||this.inView&&!i?this.player.pause():(!0===this.autoplay||this.inView&&i)&&this.player.play()},events:["load","resize","scroll"]}]})}function zn(t,e){return void 0===t&&(t=0),void 0===e&&(e="%"),"translateX("+t+(t?e:"")+")"}function Wn(t){return"scale3d("+t+", "+t+", 1)"}function Ln(t){if(!Ln.installed){var e,i,n,o,r,s,a,l,h,u,c,d,f,p,m,g,v,w,b,y,x,k,$,I,T,C,E,S=t.util,_=S.$,A=S.assign,N=S.clamp,D=S.fastdom,M=S.getIndex,B=S.hasClass,O=S.isNumber,P=S.isRtl,H=S.Promise,z=S.toNodes,W=S.trigger;t.mixin.slider={attrs:!0,mixins:[(I=t,T=I.util,C=T.doc,E=T.pointerDown,{props:{autoplay:Boolean,autoplayInterval:Number,pauseOnHover:Boolean},defaults:{autoplay:!1,autoplayInterval:7e3,pauseOnHover:!0},connected:function(){this.startAutoplay()},disconnected:function(){this.stopAutoplay()},events:[{name:"visibilitychange",el:C,handler:function(){C.hidden?this.stopAutoplay():this.startAutoplay()}},{name:E,handler:"stopAutoplay"},{name:"mouseenter",filter:function(){return this.autoplay},handler:function(){this.isHovering=!0}},{name:"mouseleave",filter:function(){return this.autoplay},handler:function(){this.isHovering=!1}}],methods:{startAutoplay:function(){var t=this;this.stopAutoplay(),this.autoplay&&(this.interval=setInterval(function(){return!(t.isHovering&&t.pauseOnHover)&&!t.stack.length&&t.show("next")},this.autoplayInterval))},stopAutoplay:function(){this.interval&&clearInterval(this.interval)}}}),(h=t,u=h.util,c=u.doc,d=u.getPos,f=u.includes,p=u.isRtl,m=u.isTouch,g=u.off,v=u.on,w=u.pointerDown,b=u.pointerMove,y=u.pointerUp,x=u.preventClick,k=u.trigger,$=u.win,{defaults:{threshold:10,preventCatch:!1},init:function(){var t=this;["start","move","end"].forEach(function(e){var i=t[e];t[e]=function(e){var n=d(e).x*(p?-1:1);t.prevPos=n!==t.pos?t.pos:t.prevPos,t.pos=n,i(e)}})},events:[{name:w,delegate:function(){return this.slidesSelector},handler:function(t){var e;!m(t)&&!(e=t.target).children.length&&e.childNodes.length||t.button>0||this.length<2||this.preventCatch||this.start(t)}},{name:"dragstart",handler:function(t){t.preventDefault()}}],methods:{start:function(){this.drag=this.pos,this._transitioner?(this.percent=this._transitioner.percent(),this.drag+=this._transitioner.getDistance()*this.percent*this.dir,this._transitioner.translate(this.percent),this._transitioner.cancel(),this.dragging=!0,this.stack=[]):this.prevIndex=this.index,this.unbindMove=v(c,b,this.move,{capture:!0,passive:!1}),v($,"scroll",this.unbindMove),v(c,y,this.end,!0)},move:function(t){var e=this,i=this.pos-this.drag;if(!(0===i||this.prevPos===this.pos||!this.dragging&&Math.abs(i)<this.threshold)){t.cancelable&&t.preventDefault(),this.dragging=!0,this.dir=i<0?1:-1;for(var n=this.slides,o=this.prevIndex,r=Math.abs(i),s=this.getIndex(o+this.dir,o),a=this._getDistance(o,s)||n[o].offsetWidth;s!==o&&r>a;)e.drag-=a*e.dir,o=s,r-=a,s=e.getIndex(o+e.dir,o),a=e._getDistance(o,s)||n[o].offsetWidth;this.percent=r/a;var l,h=n[o],u=n[s],c=this.index!==s,d=o===s;[this.index,this.prevIndex].filter(function(t){return!f([s,o],t)}).forEach(function(t){k(n[t],"itemhidden",[e]),l=!0,d&&(e.prevIndex=o)}),(this.index===o&&this.prevIndex!==o||l&&d)&&k(n[this.index],"itemshown",[this]),c&&(this.prevIndex=o,this.index=s,!d&&k(h,"beforeitemhide",[this]),k(u,"beforeitemshow",[this])),(l||this.length<3)&&this._transitioner&&this._transitioner.reset(),this._transitioner=this._translate(Math.abs(this.percent),h,!d&&u),c&&(!d&&k(h,"itemhide",[this]),k(u,"itemshow",[this]))}},end:function(){if(g($,"scroll",this.unbindMove),this.unbindMove(),g(c,y,this.end,!0),this.dragging){if(this.dragging=null,this.index===this.prevIndex)this.percent=1-this.percent,this.dir*=-1,this._show(!1,this.index,!0),this._transitioner=null;else{var t=(p?this.dir*(p?1:-1):this.dir)<0==this.prevPos>this.pos;this.index=t?this.index:this.prevIndex,t&&(this.percent=1-this.percent),this.show(this.dir>0&&!t||this.dir<0&&t?"next":"previous",!0)}x()}this.drag=this.percent=null}}}),(e=t,i=e.util,n=i.$,o=i.$$,r=i.data,s=i.html,a=i.toggleClass,l=i.toNumber,{defaults:{selNav:!1},computed:{nav:function(t,e){var i=t.selNav;return n(i,e)},navItemSelector:function(t){var e=t.attrItem;return"["+e+"],[data-"+e+"]"},navItems:function(t,e){return o(this.navItemSelector,e)}},update:[{write:function(){var t=this;this.nav&&this.length!==this.nav.children.length&&s(this.nav,this.slides.map(function(e,i){return"<li "+t.attrItem+'="'+i+'"><a href="#"></a></li>'}).join("")),a(o(this.navItemSelector,this.$el).concat(this.nav),"uk-hidden",!this.maxIndex),this.updateNav()},events:["load","resize"]}],events:[{name:"click",delegate:function(){return this.navItemSelector},handler:function(t){t.preventDefault(),t.current.blur(),this.show(r(t.current,this.attrItem))}},{name:"itemshow",handler:"updateNav"}],methods:{updateNav:function(){var t=this,e=this.getValidIndex();this.navItems.forEach(function(i){var n=r(i,t.attrItem);a(i,t.clsActive,l(n)===e),a(i,"uk-invisible",t.finite&&("previous"===n&&0===e||"next"===n&&e>=t.maxIndex))})}}})],props:{clsActivated:Boolean,easing:String,index:Number,finite:Boolean,velocity:Number},defaults:{easing:"ease",finite:!1,velocity:1,index:0,stack:[],percent:0,clsActive:"uk-active",clsActivated:!1,Transitioner:!1,transitionOptions:{}},computed:{duration:function(t,e){var i=t.velocity;return jn(e.offsetWidth/i)},length:function(){return this.slides.length},list:function(t,e){var i=t.selList;return _(i,e)},maxIndex:function(){return this.length-1},slidesSelector:function(t){return t.selList+" > *"},slides:function(){return z(this.list.children)}},methods:{show:function(t,e){var i=this;if(void 0===e&&(e=!1),!this.dragging&&this.length){var n=this.stack,o=e?0:n.length,r=function(){n.splice(o,1),n.length&&i.show(n.shift(),!0)};if(n[e?"unshift":"push"](t),!e&&n.length>1)2===n.length&&this._transitioner.forward(Math.min(this.duration,200));else{var s=this.index,a=B(this.slides,this.clsActive)&&this.slides[s],l=this.getIndex(t,this.index),h=this.slides[l];if(a!==h){var u;if(this.dir="next"===(u=t)?1:"previous"===u?-1:u<s?-1:1,this.prevIndex=s,this.index=l,a&&W(a,"beforeitemhide",[this]),!W(h,"beforeitemshow",[this,a]))return this.index=this.prevIndex,void r();var c=this._show(a,h,e).then(function(){return a&&W(a,"itemhidden",[i]),W(h,"itemshown",[i]),new H(function(t){D.write(function(){n.shift(),n.length?i.show(n.shift(),!0):i._transitioner=null,t()})})});return a&&W(a,"itemhide",[this]),W(h,"itemshow",[this]),c}r()}}},getIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.index),N(M(t,this.slides,e,this.finite),0,this.maxIndex)},getValidIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),this.getIndex(t,e)},_show:function(t,e,i){if(this._transitioner=this._getTransitioner(t,e,this.dir,A({easing:i?e.offsetWidth<600?"cubic-bezier(0.25, 0.46, 0.45, 0.94)":"cubic-bezier(0.165, 0.84, 0.44, 1)":this.easing},this.transitionOptions)),!i&&!t)return this._transitioner.translate(1),H.resolve();var n=this.stack.length;return this._transitioner[n>1?"forward":"show"](n>1?Math.min(this.duration,75+75/(n-1)):this.duration,this.percent)},_getDistance:function(t,e){return new this._getTransitioner(t,t!==e&&e).getDistance()},_translate:function(t,e,i){void 0===e&&(e=this.prevIndex),void 0===i&&(i=this.index);var n=this._getTransitioner(e!==i&&e,i);return n.translate(t),n},_getTransitioner:function(t,e,i,n){return void 0===t&&(t=this.prevIndex),void 0===e&&(e=this.index),void 0===i&&(i=this.dir||1),void 0===n&&(n=this.transitionOptions),new this.Transitioner(O(t)?this.slides[t]:t,O(e)?this.slides[e]:e,i*(P?-1:1),n)}}}}}function jn(t){return.5*t+300}function Fn(t){if(!Fn.installed){t.use(Ln);var e,i,n=t.mixin,o=t.util,r=o.addClass,s=o.assign,a=o.fastdom,l=o.isNumber,h=o.removeClass,u=(e=t.util.css,i={slide:{show:function(t){return[{transform:zn(-100*t)},{transform:zn()}]},percent:function(t){return i.translated(t)},translate:function(t,e){return[{transform:zn(-100*e*t)},{transform:zn(100*e*(1-t))}]}},translated:function(t){return Math.abs(e(t,"transform").split(",")[4]/t.offsetWidth)||0}}),c=function(t){var e=t.util,i=e.createEvent,n=e.clamp,o=e.css,r=e.Deferred,s=e.noop,a=e.Promise,l=e.Transition,h=e.trigger;function u(t,e,n){h(t,i(e,!1,!1,n))}return function(t,e,i,h){var c=h.animation,d=h.easing,f=c.percent,p=c.translate,m=c.show;void 0===m&&(m=s);var g=m(i),v=new r;return{dir:i,show:function(o,r,h){var c=this;void 0===r&&(r=0);var f=h?"linear":d;return o-=Math.round(o*n(r,-1,1)),this.translate(r),u(e,"itemin",{percent:r,duration:o,timing:f,dir:i}),u(t,"itemout",{percent:1-r,duration:o,timing:f,dir:i}),a.all([l.start(e,g[1],o,f),l.start(t,g[0],o,f)]).then(function(){c.reset(),v.resolve()},s),v.promise},stop:function(){return l.stop([e,t])},cancel:function(){l.cancel([e,t])},reset:function(){for(var i in g[0])o([e,t],i,"")},forward:function(i,n){return void 0===n&&(n=this.percent()),l.cancel([e,t]),this.show(i,n,!0)},translate:function(n){var r=p(n,i);o(e,r[1]),o(t,r[0]),u(e,"itemtranslatein",{percent:n,dir:i}),u(t,"itemtranslateout",{percent:1-n,dir:i})},percent:function(){return f(t||e,e,i)},getDistance:function(){return t.offsetWidth}}}}(t);t.mixin.slideshow={mixins:[n.slider],props:{animation:String},defaults:{animation:"slide",clsActivated:"uk-transition-active",Animations:u,Transitioner:c},computed:{animation:function(t){var e=t.animation,i=t.Animations;return s(e in i?i[e]:i.slide,{name:e})},transitionOptions:function(){return{animation:this.animation}}},events:{"itemshow itemhide itemshown itemhidden":function(e){var i=e.target;t.update(null,i)},itemshow:function(){l(this.prevIndex)&&a.flush()},beforeitemshow:function(t){var e=t.target;r(e,this.clsActive)},itemshown:function(t){var e=t.target;r(e,this.clsActivated)},itemhidden:function(t){var e=t.target;h(e,this.clsActive,this.clsActivated)}}}}}function Vn(t){if(!Vn.installed){t.use(Fn);var e,i,n,o,r,s=t.mixin,a=t.util,l=a.$,h=a.addClass,u=a.ajax,c=a.append,d=a.assign,f=a.attr,p=a.css,m=a.doc,g=a.getImage,v=a.html,w=a.index,b=a.on,y=a.pointerDown,x=a.pointerMove,k=a.removeClass,$=a.Transition,I=a.trigger,T=(i=(e=t).mixin,n=e.util,o=n.assign,r=n.css,o({},i.slideshow.defaults.Animations,{fade:{show:function(){return[{opacity:0},{opacity:1}]},percent:function(t){return 1-r(t,"opacity")},translate:function(t){return[{opacity:1-t},{opacity:t}]}},scale:{show:function(){return[{opacity:0,transform:Wn(.8)},{opacity:1,transform:Wn(1)}]},percent:function(t){return 1-r(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Wn(1-.2*t)},{opacity:t,transform:Wn(.8+.2*t)}]}}}));t.component("lightbox-panel",{mixins:[s.container,s.modal,s.togglable,s.slideshow],functional:!0,defaults:{preload:1,videoAutoplay:!1,delayControls:3e3,items:[],cls:"uk-open",clsPage:"uk-lightbox-page",selList:".uk-lightbox-items",attrItem:"uk-lightbox-item",selClose:".uk-close-large",pauseOnHover:!1,velocity:2,Animations:T,template:'<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href="#" uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href="#" uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'},created:function(){var t=this;this.$mount(c(this.container,this.template)),this.caption=l(".uk-lightbox-caption",this.$el),this.items.forEach(function(){return c(t.list,"<li></li>")})},events:[{name:x+" "+y+" keydown",handler:"showControls"},{name:"click",self:!0,delegate:function(){return this.slidesSelector},handler:function(t){t.preventDefault(),this.hide()}},{name:"shown",self:!0,handler:"showControls"},{name:"hide",self:!0,handler:function(){this.hideControls(),k(this.slides,this.clsActive),$.stop(this.slides)}},{name:"keyup",el:function(){return m},handler:function(t){if(this.isToggled(this.$el))switch(t.keyCode){case 37:this.show("previous");break;case 39:this.show("next")}}},{name:"beforeitemshow",handler:function(t){this.isToggled()||(this.preventCatch=!0,t.preventDefault(),this.toggleNow(this.$el,!0),this.animation=T.scale,k(t.target,this.clsActive),this.stack.splice(1,0,this.index))}},{name:"itemshow",handler:function(t){var e=t.target,i=w(e),n=this.getItem(i).caption;p(this.caption,"display",n?"":"none"),v(this.caption,n);for(var o=0;o<=this.preload;o++)this.loadItem(this.getIndex(i+o)),this.loadItem(this.getIndex(i-o))}},{name:"itemshown",handler:function(){this.preventCatch=!1}},{name:"itemload",handler:function(t,e){var i,n=this,o=e.source,r=e.type,s=e.alt;if(this.setItem(e,"<span uk-spinner></span>"),o)if("image"===r||o.match(/\.(jp(e)?g|png|gif|svg)$/i))g(o).then(function(t){return n.setItem(e,'<img width="'+t.width+'" height="'+t.height+'" src="'+o+'" alt="'+(s||"")+'">')},function(){return n.setError(e)});else if("video"===r||o.match(/\.(mp4|webm|ogv)$/i)){var a=l("<video controls playsinline"+(e.poster?' poster="'+e.poster+'"':"")+' uk-video="autoplay: '+this.videoAutoplay+'"></video>');f(a,"src",o),b(a,"error",function(){return n.setError(e)}),b(a,"loadedmetadata",function(){f(a,{width:a.videoWidth,height:a.videoHeight}),n.setItem(e,a)})}else if("iframe"===r)this.setItem(e,'<iframe class="uk-lightbox-iframe" src="'+o+'" frameborder="0" allowfullscreen></iframe>');else if(i=o.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/watch\?v=([^&\s]+)/)||o.match(/()youtu\.be\/(.*)/)){var h=i[2],c=function(t,o){return void 0===t&&(t=640),void 0===o&&(o=450),n.setItem(e,C("//www.youtube"+(i[1]||"")+".com/embed/"+h,t,o,n.videoAutoplay))};g("//img.youtube.com/vi/"+h+"/maxresdefault.jpg").then(function(t){var e=t.width,i=t.height;120===e&&90===i?g("//img.youtube.com/vi/"+h+"/0.jpg").then(function(t){var e=t.width,i=t.height;return c(e,i)},c):c(e,i)},c)}else(i=o.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/))&&u("//vimeo.com/api/oembed.json?maxwidth=1920&url="+encodeURI(o),{responseType:"json"}).then(function(t){var o=t.response,r=o.height,s=o.width;return n.setItem(e,C("//player.vimeo.com/video/"+i[2],s,r,n.videoAutoplay))})}}],methods:{loadItem:function(t){void 0===t&&(t=this.index);var e=this.getItem(t);e.content||I(this.$el,"itemload",[e])},getItem:function(t){return void 0===t&&(t=this.index),this.items[t]||{}},setItem:function(e,i){d(e,{content:i});var n=v(this.slides[this.items.indexOf(e)],i);I(this.$el,"itemloaded",[this,n]),t.update(null,n)},setError:function(t){this.setItem(t,'<span uk-icon="icon: bolt; ratio: 2"></span>')},showControls:function(){clearTimeout(this.controlsTimer),this.controlsTimer=setTimeout(this.hideControls,this.delayControls),h(this.$el,"uk-active","uk-transition-active")},hideControls:function(){k(this.$el,"uk-active","uk-transition-active")}}})}function C(t,e,i,n){return'<iframe src="'+t+'" width="'+e+'" height="'+i+'" style="max-width: 100%; box-sizing: border-box;" frameborder="0" allowfullscreen uk-video="autoplay: '+n+'" uk-responsive></iframe>'}}function Rn(t){if(!Rn.installed){var e=t.mixin,i=t.util,n=i.css,o=i.Dimensions,r=i.each,s=i.getImage,a=i.includes,l=i.isNumber,h=i.isUndefined,u=i.toFloat,c=i.win,d=["x","y","bgx","bgy","rotate","scale","color","backgroundColor","borderColor","opacity","blur","hue","grayscale","invert","saturate","sepia","fopacity"];e.parallax={props:d.reduce(function(t,e){return t[e]="list",t},{media:"media"}),defaults:d.reduce(function(t,e){return t[e]=void 0,t},{media:!1}),computed:{props:function(t,e){var i=this;return d.reduce(function(o,r){if(h(t[r]))return o;var s,l,c,d=r.match(/color/i),f=d||"opacity"===r,p=t[r].slice(0);f&&n(e,r,""),p.length<2&&p.unshift(("scale"===r?1:f?n(e,r):0)||0);var m=a(p.join(""),"%")?"%":"px";if(d){var g=e.style.color;p=p.map(function(t){return n(n(e,"color",t),"color").split(/[(),]/g).slice(1,-1).concat(1).slice(0,4).map(function(t){return u(t)})}),e.style.color=g}else p=p.map(u);if(r.match(/^bg/))if(n(e,"background-position-"+r[2],""),l=n(e,"backgroundPosition").split(" ")["x"===r[2]?0:1],i.covers){var v=Math.min.apply(Math,p),w=Math.max.apply(Math,p),b=p.indexOf(v)<p.indexOf(w);c=w-v,p=p.map(function(t){return t-(b?v:w)}),s=(b?-c:0)+"px"}else s=l;return o[r]={steps:p,unit:m,pos:s,bgPos:l,diff:c},o},{})},bgProps:function(){var t=this;return["bgx","bgy"].filter(function(e){return e in t.props})},covers:function(t,e){return"cover"===n(""!==e.style.backgroundSize?n(e,"backgroundSize",""):e,"backgroundSize")}},disconnected:function(){delete this._image},update:[{read:function(t){var e=this;if(t.active=!this.media||c.matchMedia(this.media).matches,t.image&&(t.image.dimEl={width:this.$el.offsetWidth,height:this.$el.offsetHeight}),!("image"in t)&&this.covers&&this.bgProps.length){var i=n(this.$el,"backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/,"$1");i&&(t.image=!1,s(i).then(function(i){t.image={width:i.naturalWidth,height:i.naturalHeight},e.$emit()}))}},write:function(t){var e=this,i=t.image,r=t.active;if(i)if(r){var s=i.dimEl,a=o.cover(i,s);this.bgProps.forEach(function(t){var n=e.props[t],r=n.diff,l=n.bgPos,h=n.steps,u="bgy"===t?"height":"width",c=a[u]-s[u];if(l.match(/%$|0px/)){if(c<r)s[u]=a[u]+r-c;else if(c>r){var d=parseFloat(l);d&&(e.props[t].steps=h.map(function(t){return t-(c-r)/(100/d)}))}a=o.cover(i,s)}}),n(this.$el,{backgroundSize:a.width+"px "+a.height+"px",backgroundRepeat:"no-repeat"})}else n(this.$el,{backgroundSize:"",backgroundRepeat:""})},events:["load","resize"]}],methods:{reset:function(){var t=this;r(this.getCss(0),function(e,i){return n(t.$el,i,"")})},getCss:function(t){var e=this.props,i=!1;return Object.keys(e).reduce(function(n,o){var r=e[o],s=r.steps,a=r.unit,l=r.pos,h=p(s,t);switch(o){case"x":case"y":if(i)break;var c=["x","y"].map(function(i){return o===i?h+a:e[i]?p(e[i].steps,t)+e[i].unit:0}),d=c[0],m=c[1];i=n.transform+=" translate3d("+d+", "+m+", 0)";break;case"rotate":n.transform+=" rotate("+h+"deg)";break;case"scale":n.transform+=" scale("+h+")";break;case"bgy":case"bgx":n["background-position-"+o[2]]="calc("+l+" + "+(h+a)+")";break;case"color":case"backgroundColor":case"borderColor":var g=f(s,t),v=g[0],w=g[1],b=g[2];n[o]="rgba("+v.map(function(t,e){return t+=b*(w[e]-t),3===e?u(t):parseInt(t,10)}).join(",")+")";break;case"blur":n.filter+=" blur("+h+"px)";break;case"hue":n.filter+=" hue-rotate("+h+"deg)";break;case"fopacity":n.filter+=" opacity("+h+"%)";break;case"grayscale":case"invert":case"saturate":case"sepia":n.filter+=" "+o+"("+h+"%)";break;default:n[o]=h}return n},{transform:"",filter:""})}}}}function f(t,e){var i=t.length-1,n=Math.min(Math.floor(i*e),i-1),o=t.slice(n,n+2);return o.push(1===e?1:e%(1/i)*i),o}function p(t,e){var i=f(t,e),n=i[0],o=i[1],r=i[2];return(l(n)?n+Math.abs(n-o)*r*(n<o?1:-1):+o).toFixed(2)}}function Yn(t){var e=t.util.removeClass;return{update:[{write:function(){if(!this.stack.length&&!this.dragging){var t=this.getValidIndex();delete this.index,e(this.slides,this.clsActive,this.clsActivated),this.show(t)}},events:["load","resize"]}]}}function qn(t,e){t.use(Rn);var i=t.mixin,n=t.util,o=n.closest,r=n.css,s=n.endsWith,a=n.noop,l=n.Transition;return{mixins:[i.parallax],computed:{item:function(){var i=t.getComponent(o(this.$el,".uk-"+e),e);return i&&o(this.$el,i.slidesSelector)}},events:[{name:"itemshown",self:!0,el:function(){return this.item},handler:function(){r(this.$el,this.getCss(.5))}},{name:"itemin itemout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,o=i.duration,s=i.timing,c=i.dir;l.cancel(this.$el),r(this.$el,this.getCss(u(e,c,n))),l.start(this.$el,this.getCss(h(e)?.5:c>0?1:0),o,s).catch(a)}},{name:"transitioncanceled transitionend",self:!0,el:function(){return this.item},handler:function(){l.cancel(this.$el)}},{name:"itemtranslatein itemtranslateout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,o=i.dir;l.cancel(this.$el),r(this.$el,this.getCss(u(e,o,n)))}}]};function h(t){return s(t,"in")}function u(t,e,i){return i/=2,h(t)?e<0?1-i:i:e<0?i:1-i}}return Oi.version="3.0.0-beta.40",(An=Oi).mixin.class=zi,An.mixin.container=Wi,An.mixin.modal=ji,An.mixin.position=Fi,An.mixin.togglable=Li,(Nn=Oi).use(Pn),Nn.use(Vi),Nn.use(Ri),Nn.use(Hn),Nn.use(qi),Nn.use(Ui),Nn.use(Xi),Nn.use(Ji),Nn.use(Qi),Nn.use(Ki),Nn.use(yn),Nn.use(Gi),Nn.use(Zi),Nn.use(bn),Nn.use(xn),Nn.use(kn),Nn.use($n),Nn.use(In),Nn.use(Tn),Nn.use(Cn),Nn.use(En),Nn.use(Sn),Nn.use(_n),Nn.use(Mn),Nn.use(wn),Nn.use(Bn),Nn.use(On),Nn.use(Yi),Oi.use(function t(e){if(!t.installed){var i=e.util,n=i.$,o=i.doc,r=i.empty,s=i.html;e.component("countdown",{mixins:[e.mixin.class],attrs:!0,props:{date:String,clsWrapper:String},defaults:{date:"",clsWrapper:".uk-countdown-%unit%"},computed:{date:function(t){var e=t.date;return Date.parse(e)},days:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","days"),e)},hours:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","hours"),e)},minutes:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","minutes"),e)},seconds:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","seconds"),e)},units:function(){var t=this;return["days","hours","minutes","seconds"].filter(function(e){return t[e]})}},connected:function(){this.start()},disconnected:function(){var t=this;this.stop(),this.units.forEach(function(e){return r(t[e])})},events:[{name:"visibilitychange",el:o,handler:function(){o.hidden?this.stop():this.start()}}],update:{write:function(){var t,e,i=this,n=(t=this.date,{total:e=t-Date.now(),seconds:e/1e3%60,minutes:e/1e3/60%60,hours:e/1e3/60/60%24,days:e/1e3/60/60/24});n.total<=0&&(this.stop(),n.days=n.hours=n.minutes=n.seconds=0),this.units.forEach(function(t){var e=String(Math.floor(n[t]));e=e.length<2?"0"+e:e;var o=i[t];o.textContent!==e&&((e=e.split("")).length!==o.children.length&&s(o,e.map(function(){return"<span></span>"}).join("")),e.forEach(function(t,e){return o.children[e].textContent=t}))})}},methods:{start:function(){var t=this;this.stop(),this.date&&this.units.length&&(this.$emit(),this.timer=setInterval(function(){return t.$emit()},1e3))},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}}})}}),Oi.use(function t(e){if(!t.installed){var i=e.util,n=i.addClass,o=i.css,r=i.scrolledOver,s=i.sortBy,a=i.toFloat;e.component("grid-parallax",e.components.grid.extend({props:{target:String,translate:Number},defaults:{target:!1,translate:150},computed:{translate:function(t){var e=t.translate;return Math.abs(e)}},init:function(){n(this.$el,"uk-grid")},disconnected:function(){this.reset(),o(this.$el,"marginBottom","")},update:[{read:function(t){var e=t.rows;return{columns:e&&e[0]&&e[0].length||0,rows:e&&e.map(function(t){return s(t,"offsetLeft")})}},write:function(t){var e=t.columns;o(this.$el,"marginBottom",e>1?this.translate+a(o(o(this.$el,"marginBottom",""),"marginBottom")):"")},events:["load","resize"]},{read:function(){return{scrolled:r(this.$el)*this.translate}},write:function(t){var e=t.rows,i=t.columns,n=t.scrolled;if(!e||1===i||!n)return this.reset();e.forEach(function(t){return t.forEach(function(t,e){return o(t,"transform","translateY("+(e%2?n:n/8)+"px)")})})},events:["scroll","load","resize"]}],methods:{reset:function(){o(this.$el.children,"transform","")}}})),e.components.gridParallax.options.update.unshift({read:function(){this.reset()},events:["load","resize"]})}}),Oi.use(function t(e){if(!t.installed){e.use(Vn);var i=e.util,n=i.$$,o=i.assign,r=i.data,s=i.index,a=e.components.lightboxPanel.options;e.component("lightbox",{attrs:!0,props:o({toggle:String},a.props),defaults:o({toggle:"a"},Object.keys(a.props).reduce(function(t,e){return t[e]=a.defaults[e],t},{})),computed:{toggles:function(t,e){var i=t.toggle;return n(i,e)}},disconnected:function(){this._destroy()},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),t.current.blur(),this.show(s(this.toggles,t.current))}}],update:function(t){var e,i;this.panel&&this.animation&&(this.panel.$props.animation=this.animation,this.panel.$emit()),!this.panel||t.toggles&&(e=t.toggles,i=this.toggles,e.length===i.length&&e.every(function(t,e){return t!==i[e]}))||(t.toggles=this.toggles,this._destroy(),this._init())},methods:{_init:function(){return this.panel=this.panel||e.lightboxPanel(o({},this.$props,{items:this.toggles.reduce(function(t,e){return t.push(["href","caption","type","poster","alt"].reduce(function(t,i){return t["href"===i?"source":i]=r(e,i),t},{})),t},[])}))},_destroy:function(){this.panel&&(this.panel.$destroy(!0),this.panel=null)},show:function(t){return this.panel||this._init(),this.panel.show(t)},hide:function(){return this.panel&&this.panel.hide()}}})}}),Oi.use(function t(e){var i;if(!t.installed){var n=e.util,o=n.append,r=n.closest,s=n.css,a=n.each,l=n.pointerEnter,h=n.pointerLeave,u=n.remove,c=n.toFloat,d=n.Transition,f=n.trigger,p={};e.component("notification",{functional:!0,args:["message","status"],defaults:{message:"",status:"",timeout:5e3,group:null,pos:"top-center",clsClose:"uk-notification-close",clsMsg:"uk-notification-message"},created:function(){p[this.pos]||(p[this.pos]=o(e.container,'<div class="uk-notification uk-notification-'+this.pos+'"></div>'));var t=s(p[this.pos],"display","block");this.$mount(o(t,'<div class="'+this.clsMsg+(this.status?" "+this.clsMsg+"-"+this.status:"")+'"> <a href="#" class="'+this.clsClose+'" data-uk-close></a> <div>'+this.message+"</div> </div>"))},ready:function(){var t=this,e=c(s(this.$el,"marginBottom"));d.start(s(this.$el,{opacity:0,marginTop:-this.$el.offsetHeight,marginBottom:0}),{opacity:1,marginTop:0,marginBottom:e}).then(function(){t.timeout&&(t.timer=setTimeout(t.close,t.timeout))})},events:(i={click:function(t){r(t.target,'a[href="#"]')&&t.preventDefault(),this.close()}},i[l]=function(){this.timer&&clearTimeout(this.timer)},i[h]=function(){this.timeout&&(this.timer=setTimeout(this.close,this.timeout))},i),methods:{close:function(t){var e=this,i=function(){f(e.$el,"close",[e]),u(e.$el),p[e.pos].children.length||s(p[e.pos],"display","none")};this.timer&&clearTimeout(this.timer),t?i():d.start(this.$el,{opacity:0,marginTop:-this.$el.offsetHeight,marginBottom:0}).then(i)}}}),e.notification.closeAll=function(t,i){a(e.instances,function(e){"notification"!==e.$options.name||t&&t!==e.group||e.close(i)})}}}),Oi.use(function t(e){if(!t.installed){e.use(Rn);var i=e.mixin,n=e.util,o=n.clamp,r=n.css,s=n.scrolledOver,a=n.query;e.component("parallax",{mixins:[i.parallax],props:{target:String,viewport:Number,easing:Number},defaults:{target:!1,viewport:1,easing:1},computed:{target:function(t,e){var i=t.target;return i&&a(i,e)||e}},update:[{read:function(t){var e,i;return{prev:t.percent,percent:(e=s(this.target)/(this.viewport||1),i=this.easing,o(e*(1-(i-i*e))))}},write:function(t,e){var i=t.prev,n=t.percent,o=t.active;"scroll"!==e.type&&(i=!1),o?i!==n&&r(this.$el,this.getCss(n)):this.reset()},events:["scroll","load","resize"]}]})}}),Oi.use(function t(e){if(!t.installed){e.use(Ln);var i=e.mixin,n=e.util,o=n.$,r=n.$$,s=n.addClass,a=n.css,l=n.data,h=n.includes,u=n.isNumeric,c=n.isUndefined,d=n.toggleClass,f=n.toFloat,p=function(t){var e=t.util,i=e.assign,n=e.clamp,o=e.createEvent,r=e.css,s=e.Deferred,a=e.includes,l=e.index,h=e.isRtl,u=e.noop,c=e.sortBy,d=e.toNodes,f=e.Transition,p=e.trigger,m=i(function(t,e,i,o){var d=o.center,p=o.easing,w=o.list,b=new s,y=t?m.getLeft(t,w,d):m.getLeft(e,w,d)+e.offsetWidth*i,x=e?m.getLeft(e,w,d):y+t.offsetWidth*i*(h?-1:1);return{dir:i,show:function(e,o,r){void 0===o&&(o=0);var s=r?"linear":p;return e-=Math.round(e*n(o,-1,1)),this.translate(o),t&&this.updateTranslates(),o=t?o:n(o,0,1),g(this.getItemIn(),"itemin",{percent:o,duration:e,timing:s,dir:i}),t&&g(this.getItemIn(!0),"itemout",{percent:1-o,duration:e,timing:s,dir:i}),f.start(w,{transform:zn(-x*(h?-1:1),"px")},e,s).then(b.resolve,u),b.promise},stop:function(){return f.stop(w)},cancel:function(){f.cancel(w)},reset:function(){r(w,"transform","")},forward:function(t,e){return void 0===e&&(e=this.percent()),f.cancel(w),this.show(t,e,!0)},translate:function(e){var o=this.getDistance()*i*(h?-1:1);r(w,"transform",zn(n(o-o*e-x,-m.getWidth(w),w.offsetWidth)*(h?-1:1),"px")),this.updateTranslates(),t&&(e=n(e,-1,1),g(this.getItemIn(),"itemtranslatein",{percent:e,dir:i}),g(this.getItemIn(!0),"itemtranslateout",{percent:1-e,dir:i}))},percent:function(){return Math.abs((r(w,"transform").split(",")[4]*(h?-1:1)+y)/(x-y))},getDistance:function(){return Math.abs(x-y)},getItemIn:function(e){void 0===e&&(e=!1);var n=this.getActives(),o=c(v(w),"offsetLeft"),r=l(o,n[i*(e?-1:1)>0?n.length-1:0]);return~r&&o[r+(t&&!e?i:0)]},getActives:function(){var i=m.getLeft(t||e,w,d);return c(v(w).filter(function(t){var e=m.getElLeft(t,w);return e>=i&&e+t.offsetWidth<=w.offsetWidth+i}),"offsetLeft")},updateTranslates:function(){var t=this.getActives();v(w).forEach(function(i){var n=a(t,i);g(i,"itemtranslate"+(n?"in":"out"),{percent:n?1:0,dir:i.offsetLeft<=e.offsetLeft?1:-1})})}}},{getLeft:function(t,e,i){var n=this.getElLeft(t,e);return i?n-this.center(t,e):Math.min(n,this.getMax(e))},getMax:function(t){return Math.max(0,this.getWidth(t)-t.offsetWidth)},getWidth:function(t){return v(t).reduce(function(t,e){return e.offsetWidth+t},0)},getMaxWidth:function(t){return v(t).reduce(function(t,e){return Math.max(t,e.offsetWidth)},0)},center:function(t,e){return e.offsetWidth/2-t.offsetWidth/2},getElLeft:function(t,e){return(t.offsetLeft+(h?t.offsetWidth-e.offsetWidth:0))*(h?-1:1)}});function g(t,e,i){p(t,o(e,!1,!1,i))}function v(t){return d(t.children)}return m}(e);e.component("slider-parallax",qn(e,"slider")),e.component("slider",{mixins:[i.class,i.slider,Yn(e)],props:{center:Boolean,sets:Boolean},defaults:{center:!1,sets:!1,attrItem:"uk-slider-item",selList:".uk-slider-items",selNav:".uk-slider-nav",clsContainer:"uk-slider-container",Transitioner:p},computed:{avgWidth:function(){return p.getWidth(this.list)/this.length},finite:function(t){var e=t.finite;return e||p.getWidth(this.list)<this.list.offsetWidth+p.getMaxWidth(this.list)+this.center},maxIndex:function(){if(!this.finite||this.center&&!this.sets)return this.length-1;if(this.center)return this.sets[this.sets.length-1];a(this.slides,"order","");for(var t=p.getMax(this.list),e=this.length;e--;)if(p.getElLeft(this.list.children[e],this.list)<t)return Math.min(e+1,this.length-1);return 0},sets:function(t){var e=this,i=t.sets,n=this.list.offsetWidth/(this.center?2:1),o=0,r=n,s=0;return i=i&&this.slides.reduce(function(t,i,a){var l=i.offsetWidth;if(s+l>o&&(!e.center&&a>e.maxIndex&&(a=e.maxIndex),!h(t,a))){var u=e.slides[a+1];e.center&&u&&l<r-u.offsetWidth/2?r-=l:(r=n,t.push(a),o=s+n+(e.center?l/2:0))}return s+=l,t},[]),i&&i.length&&i},transitionOptions:function(){return{center:this.center,list:this.list}}},connected:function(){d(this.$el,this.clsContainer,!o("."+this.clsContainer,this.$el))},update:{write:function(){var t=this;r("["+this.attrItem+"],[data-"+this.attrItem+"]",this.$el).forEach(function(e){var i=l(e,t.attrItem);t.maxIndex&&d(e,"uk-hidden",u(i)&&(t.sets&&!h(t.sets,f(i))||i>t.maxIndex))})},events:["load","resize"]},events:{beforeitemshow:function(t){!this.dragging&&this.sets&&this.stack.length<2&&!h(this.sets,this.index)&&(this.index=this.getValidIndex());var e=Math.abs(this.index-this.prevIndex+(this.dir>0&&this.index<this.prevIndex||this.dir<0&&this.index>this.prevIndex?(this.maxIndex+1)*this.dir:0));if(!this.dragging&&e>1){for(var i=0;i<e;i++)this.stack.splice(1,0,this.dir>0?"next":"previous");t.preventDefault()}else this.duration=jn(this.avgWidth/this.velocity)*((this.dir<0||!this.slides[this.prevIndex]?this.slides[this.index]:this.slides[this.prevIndex]).offsetWidth/this.avgWidth),this.reorder()},itemshow:function(){!c(this.prevIndex)&&s(this._getTransitioner().getItemIn(),this.clsActive)},itemshown:function(){var t=this,e=this._getTransitioner(this.index).getActives();this.slides.forEach(function(i){return d(i,t.clsActive,h(e,i))}),(!this.sets||h(this.sets,f(this.index)))&&this.slides.forEach(function(i){return d(i,t.clsActivated,h(e,i))})}},methods:{reorder:function(){var t=this;if(a(this.slides,"order",""),!this.finite){var e=this.dir>0&&this.slides[this.prevIndex]?this.prevIndex:this.index;if(this.slides.forEach(function(i,n){return a(i,"order",t.dir>0&&n<e?1:t.dir<0&&n>=t.index?-1:"")}),this.center)for(var i=this.slides[e],n=this.list.offsetWidth/2-i.offsetWidth/2,o=0;n>0;){var r=t.getIndex(--o+e,e),s=t.slides[r];a(s,"order",r>e?-2:-1),n-=s.offsetWidth}}},getValidIndex:function(t,e){var i;if(void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),t=this.getIndex(t,e),!this.sets)return t;do{if(h(this.sets,t))return t;i=t,t=this.getIndex(t+this.dir,e)}while(t!==i);return t}}})}}),Oi.use(function t(e){if(!t.installed){e.use(Fn);var i,n,o,r,s,a,l=e.mixin,h=e.util.height,u=(n=(i=e).mixin,o=i.util,r=o.assign,s=o.css,a=r({},n.slideshow.defaults.Animations,{fade:{show:function(){return[{opacity:0,zIndex:0},{zIndex:-1}]},percent:function(t){return 1-s(t,"opacity")},translate:function(t){return[{opacity:1-t,zIndex:0},{zIndex:-1}]}},scale:{show:function(){return[{opacity:0,transform:Wn(1.5),zIndex:0},{zIndex:-1}]},percent:function(t){return 1-s(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Wn(1+.5*t),zIndex:0},{zIndex:-1}]}},pull:{show:function(t){return t<0?[{transform:zn(30),zIndex:-1},{transform:zn(),zIndex:0}]:[{transform:zn(-100),zIndex:0},{transform:zn(),zIndex:-1}]},percent:function(t,e,i){return i<0?1-a.translated(e):a.translated(t)},translate:function(t,e){return e<0?[{transform:zn(30*t),zIndex:-1},{transform:zn(-100*(1-t)),zIndex:0}]:[{transform:zn(100*-t),zIndex:0},{transform:zn(30*(1-t)),zIndex:-1}]}},push:{show:function(t){return t<0?[{transform:zn(100),zIndex:0},{transform:zn(),zIndex:-1}]:[{transform:zn(-30),zIndex:-1},{transform:zn(),zIndex:0}]},percent:function(t,e,i){return i>0?1-a.translated(e):a.translated(t)},translate:function(t,e){return e<0?[{transform:zn(100*t),zIndex:0},{transform:zn(-30*(1-t)),zIndex:-1}]:[{transform:zn(-30*t),zIndex:-1},{transform:zn(100*(1-t)),zIndex:0}]}}}));e.component("slideshow-parallax",qn(e,"slideshow")),e.component("slideshow",{mixins:[l.class,l.slideshow,Yn(e)],props:{ratio:String,minHeight:Boolean,maxHeight:Boolean},defaults:{ratio:"16:9",minHeight:!1,maxHeight:!1,selList:".uk-slideshow-items",attrItem:"uk-slideshow-item",selNav:".uk-slideshow-nav",Animations:u},update:{read:function(){var t=this.ratio.split(":").map(Number),e=t[0],i=t[1];return i=i*this.$el.offsetWidth/e,this.minHeight&&(i=Math.max(this.minHeight,i)),this.maxHeight&&(i=Math.min(this.maxHeight,i)),{height:i}},write:function(t){var e=t.height;h(this.list,Math.floor(e))},events:["load","resize"]}})}}),Oi.use(function t(e){var i;if(!t.installed){var n=e.mixin,o=e.util,r=o.addClass,s=o.after,a=o.assign,l=o.append,h=o.attr,u=o.before,c=o.closest,d=o.css,f=o.doc,p=o.docEl,m=o.height,g=o.fastdom,v=o.getPos,w=o.includes,b=o.index,y=o.isInput,x=o.noop,k=o.offset,$=o.off,I=o.on,T=o.pointerDown,C=o.pointerMove,E=o.pointerUp,S=o.position,_=o.preventClick,A=o.Promise,N=o.remove,D=o.removeClass,M=o.toggleClass,B=o.toNodes,O=o.Transition,P=o.trigger,H=o.win,z=o.within;e.component("sortable",{mixins:[n.class],props:{group:String,animation:Number,threshold:Number,clsItem:String,clsPlaceholder:String,clsDrag:String,clsDragState:String,clsBase:String,clsNoDrag:String,clsEmpty:String,clsCustom:String,handle:String},defaults:{group:!1,animation:150,threshold:5,clsItem:"uk-sortable-item",clsPlaceholder:"uk-sortable-placeholder",clsDrag:"uk-sortable-drag",clsDragState:"uk-drag",clsBase:"uk-sortable",clsNoDrag:"uk-sortable-nodrag",clsEmpty:"uk-sortable-empty",clsCustom:"",handle:!1},init:function(){var t=this;["init","start","move","end"].forEach(function(e){var i=t[e];t[e]=function(e){t.scrollY=H.pageYOffset;var n=v(e),o=n.x,r=n.y;t.pos={x:o,y:r},i(e)}})},events:(i={},i[T]="init",i),update:{write:function(){if(this.clsEmpty&&M(this.$el,this.clsEmpty,!this.$el.children.length),this.drag){k(this.drag,{top:this.pos.y+this.origin.top,left:this.pos.x+this.origin.left});var t,e=k(this.drag).top,i=e+this.drag.offsetHeight;e>0&&e<this.scrollY?t=this.scrollY-5:i<m(f)&&i>m(H)+this.scrollY&&(t=this.scrollY+5),t&&setTimeout(function(){return H.scrollTo(H.scrollX,t)},5)}}},methods:{init:function(t){var e=t.target,i=t.button,n=t.defaultPrevented,o=B(this.$el.children).filter(function(t){return z(e,t)})[0];!o||y(t.target)||this.handle&&!z(e,this.handle)||i>0||z(e,"."+this.clsNoDrag)||n||(t.preventDefault(),this.touched=[this],this.placeholder=o,this.origin=a({target:e,index:b(o)},this.pos),I(p,C,this.move),I(p,E,this.end),I(H,"scroll",this.scroll),this.threshold||this.start(t))},start:function(t){this.drag=l(e.container,this.placeholder.outerHTML.replace(/^<li/i,"<div").replace(/li>$/i,"div>")),d(this.drag,a({boxSizing:"border-box",width:this.placeholder.offsetWidth,height:this.placeholder.offsetHeight},d(this.placeholder,["paddingLeft","paddingRight","paddingTop","paddingBottom"]))),h(this.drag,"uk-no-boot",""),r(this.drag,this.clsDrag,this.clsCustom),m(this.drag.firstElementChild,m(this.placeholder.firstElementChild));var i=k(this.placeholder),n=i.left,o=i.top;a(this.origin,{left:n-this.pos.x,top:o-this.pos.y}),r(this.placeholder,this.clsPlaceholder),r(this.$el.children,this.clsItem),r(p,this.clsDragState),P(this.$el,"start",[this,this.placeholder,this.drag]),this.move(t)},move:function(t){if(this.drag){this.$emit();var e="mousemove"===t.type?t.target:f.elementFromPoint(this.pos.x-f.body.scrollLeft,this.pos.y-f.body.scrollTop),i=W(e),n=W(this.placeholder),o=i!==n;if(i&&!z(e,this.placeholder)&&(!o||i.group&&i.group===n.group)){if(e=i.$el===e.parentNode&&e||B(i.$el.children).filter(function(t){return z(e,t)})[0],o)n.remove(this.placeholder);else if(!e)return;i.insert(this.placeholder,e),w(this.touched,i)||this.touched.push(i)}}else(Math.abs(this.pos.x-this.origin.x)>this.threshold||Math.abs(this.pos.y-this.origin.y)>this.threshold)&&this.start(t)},scroll:function(){var t=H.pageYOffset;t!==this.scrollY&&(this.pos.y+=t-this.scrollY,this.scrollY=t,this.$emit())},end:function(t){if($(p,C,this.move),$(p,E,this.end),$(H,"scroll",this.scroll),this.drag){_();var e=W(this.placeholder);this===e?this.origin.index!==b(this.placeholder)&&P(this.$el,"moved",[this,this.placeholder]):(P(e.$el,"added",[e,this.placeholder]),P(this.$el,"removed",[this,this.placeholder])),P(this.$el,"stop",[this]),N(this.drag),this.drag=null;var i=this.touched.map(function(t){return t.clsPlaceholder+" "+t.clsItem}).join(" ");this.touched.forEach(function(t){return D(t.$el.children,i)}),D(p,this.clsDragState)}else"mouseup"!==t.type&&z(t.target,"a[href]")&&(location.href=c(t.target,"a[href]").href)},insert:function(t,e){var i=this;r(this.$el.children,this.clsItem);var n=function(){var n,o;e?!z(t,i.$el)||(o=e,(n=t).parentNode===o.parentNode&&b(n)>b(o))?u(e,t):s(e,t):l(i.$el,t)};this.animation?this.animate(n):n()},remove:function(t){z(t,this.$el)&&(this.animation?this.animate(function(){return N(t)}):N(t))},animate:function(t){var e=this,i=[],n=B(this.$el.children),o={position:"",width:"",height:"",pointerEvents:"",top:"",left:"",bottom:"",right:""};n.forEach(function(t){i.push(a({position:"absolute",pointerEvents:"none",width:t.offsetWidth,height:t.offsetHeight},S(t)))}),t(),n.forEach(O.cancel),d(this.$el.children,o),this.$update("update",!0),g.flush(),d(this.$el,"minHeight",m(this.$el));var r=n.map(function(t){return S(t)});A.all(n.map(function(t,n){return O.start(d(t,i[n]),r[n],e.animation)})).then(function(){d(e.$el,"minHeight",""),d(n,o),e.$update("update",!0),g.flush()},x)}}})}function W(t){return t&&(e.getComponent(t,"sortable")||W(t.parentNode))}}),Oi.use(function t(e){var i;if(!t.installed){var n=e.util,o=e.mixin,r=n.append,s=n.attr,a=n.doc,l=n.flipPosition,h=n.hasAttr,u=n.includes,c=n.isTouch,d=n.isVisible,f=n.matches,p=n.on,m=n.pointerDown,g=n.pointerEnter,v=n.pointerLeave,w=n.remove,b=n.within,y=[];e.component("tooltip",{attrs:!0,args:"title",mixins:[o.container,o.togglable,o.position],props:{delay:Number,title:String},defaults:{pos:"top",title:"",delay:0,animation:["uk-animation-scale-up"],duration:100,cls:"uk-active",clsPos:"uk-tooltip"},beforeConnect:function(){this._hasTitle=h(this.$el,"title"),s(this.$el,{title:"","aria-expanded":!1})},disconnected:function(){this.hide(),s(this.$el,{title:this._hasTitle?this.title:null,"aria-expanded":null})},methods:{show:function(){var t=this;u(y,this)||(y.forEach(function(t){return t.hide()}),y.push(this),this._unbind=p(a,"click",function(e){return!b(e.target,t.$el)&&t.hide()}),clearTimeout(this.showTimer),this.tooltip=r(this.container,'<div class="'+this.clsPos+'" aria-hidden><div class="'+this.clsPos+'-inner">'+this.title+"</div></div>"),s(this.$el,"aria-expanded",!0),this.positionAt(this.tooltip,this.$el),this.origin="y"===this.getAxis()?l(this.dir)+"-"+this.align:this.align+"-"+l(this.dir),this.showTimer=setTimeout(function(){t.toggleElement(t.tooltip,!0),t.hideTimer=setInterval(function(){d(t.$el)||t.hide()},150)},this.delay))},hide:function(){var t=y.indexOf(this);!~t||f(this.$el,"input")&&this.$el===a.activeElement||(y.splice(t,1),clearTimeout(this.showTimer),clearInterval(this.hideTimer),s(this.$el,"aria-expanded",!1),this.toggleElement(this.tooltip,!1),this.tooltip&&w(this.tooltip),this.tooltip=!1,this._unbind())}},events:(i={},i["focus "+g+" "+m]=function(t){t.type===m&&c(t)||this.show()},i.blur="hide",i[v]=function(t){c(t)||this.hide()},i)})}}),Oi.use(function t(e){if(!t.installed){var i=e.util,n=i.addClass,o=i.ajax,r=i.matches,s=i.noop,a=i.on,l=i.removeClass,h=i.trigger;e.component("upload",{props:{allow:String,clsDragover:String,concurrent:Number,maxSize:Number,mime:String,msgInvalidMime:String,msgInvalidName:String,msgInvalidSize:String,multiple:Boolean,name:String,params:Object,type:String,url:String},defaults:{allow:!1,clsDragover:"uk-dragover",concurrent:1,maxSize:0,mime:!1,msgInvalidMime:"Invalid File Type: %s",msgInvalidName:"Invalid File Name: %s",msgInvalidSize:"Invalid File Size: %s Bytes Max",multiple:!1,name:"files[]",params:{},type:"POST",url:"",abort:s,beforeAll:s,beforeSend:s,complete:s,completeAll:s,error:s,fail:s,load:s,loadEnd:s,loadStart:s,progress:s},events:{change:function(t){r(t.target,'input[type="file"]')&&(t.preventDefault(),t.target.files&&this.upload(t.target.files),t.target.value="")},drop:function(t){c(t);var e=t.dataTransfer;e&&e.files&&(l(this.$el,this.clsDragover),this.upload(e.files))},dragenter:function(t){c(t)},dragover:function(t){c(t),n(this.$el,this.clsDragover)},dragleave:function(t){c(t),l(this.$el,this.clsDragover)}},methods:{upload:function(t){var e=this;if(t.length){h(this.$el,"upload",[t]);for(var i=0;i<t.length;i++){if(e.maxSize&&1e3*e.maxSize<t[i].size)return void e.fail(e.msgInvalidSize.replace("%s",e.allow));if(e.allow&&!u(e.allow,t[i].name))return void e.fail(e.msgInvalidName.replace("%s",e.allow));if(e.mime&&!u(e.mime,t[i].type))return void e.fail(e.msgInvalidMime.replace("%s",e.mime))}this.multiple||(t=[t[0]]),this.beforeAll(this,t);var n=function(t,e){for(var i=[],n=0;n<t.length;n+=e){for(var o=[],r=0;r<e;r++)o.push(t[n+r]);i.push(o)}return i}(t,this.concurrent),r=function(t){var i=new FormData;for(var s in t.forEach(function(t){return i.append(e.name,t)}),e.params)i.append(s,e.params[s]);o(e.url,{data:i,method:e.type,beforeSend:function(t){var i=t.xhr;i.upload&&a(i.upload,"progress",e.progress),["loadStart","load","loadEnd","abort"].forEach(function(t){return a(i,t.toLowerCase(),e[t])}),e.beforeSend(t)}}).then(function(t){e.complete(t),n.length?r(n.shift()):e.completeAll(t)},function(t){return e.error(t.message)})};r(n.shift())}}}})}function u(t,e){return e.match(new RegExp("^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$","i"))}function c(t){t.preventDefault(),t.stopPropagation()}}),function(t){var e=t.connect,i=t.disconnect;function n(){r(rt.body,e),si.flush(),new lt(function(t){return t.forEach(o)}).observe(st,{childList:!0,subtree:!0,characterData:!0,attributes:!0}),t._initialized=!0}function o(n){var o=n.target;("attributes"!==n.type?function(t){for(var n=t.addedNodes,o=t.removedNodes,s=0;s<n.length;s++)r(n[s],e);for(var a=0;a<o.length;a++)r(o[a],i);return!0}(n):function(e){var i=e.target,n=e.attributeName;if("href"===n)return!0;var o=_i(n);if(o&&o in t.components){if(J(i,n))return t[o](i),!0;var r=t.getComponent(i,o);return r?(r.$destroy(),!0):void 0}}(n))&&t.update("update",o,!0)}function r(t,e){if(1===t.nodeType&&!J(t,"uk-no-boot"))for(e(t),t=t.firstElementChild;t;){var i=t.nextElementSibling;r(t,e),t=i}}lt&&(rt.body?n():new lt(function(){rt.body&&(this.disconnect(),n())}).observe(st,{childList:!0,subtree:!0}))}(Oi),Oi});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22).setImmediate))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(23);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18), __webpack_require__(24)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);