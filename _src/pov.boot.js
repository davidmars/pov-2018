//les libs indispensables

import PovEvents from "./PovEvents";

require("./EVENTS");

window.$=document.$ = window.jQuery = require("jquery");
require("./pov.jquery.more");

//notre m
import Pov from "./Pov";
window.Pov=Pov;

Pov.events=new PovEvents();

//pour gérer une navigation ajax
import PovHistory from "./PovHistory";
window.PovHistory =PovHistory;

//pour communiquer avec le serveur
import PovApi from "./PovApi";
window.PovApi =PovApi;

import Stage from "./Stage";

import PovSSE from "./PovSSE";
import PovUtils from "./PovUtils";
import Xdebug from "./xdebug/Xdebug";
window.povSSE=new PovSSE(null);

window.pov={
    /**
     * @type {PovUtils}
     */
    utils:PovUtils,
    /**
     * @type {PovHistory}
     */
    history:window.PovHistory,
    /**
     * @type {PovApi}
     */
    api:window.PovApi,
    /**
     * une instance de PovSS
     * @type {PovSSE}
     */
    sse:window.povSSE,
    /**
     * Accès à la classe PovSSE
     * @type {PovSSE}
     */
    PovSSE:PovSSE,
    /**
     * Accès à la classe Xdebug
     * @type {Xdebug}
     */
    Xdebug:Xdebug
};


/**
 *
 * @type {Stage}
 */
var STAGE=window.STAGE= new Stage();

$( document ).ready(function() {
    //console.log("jquery ready (pov.boot.js) ");
    /**
     * La balise body
     * @type {jQuery}
     */
    window.$body=$("body");

    Pov.onBodyReady(function(){
        "use strict";
    });

    //appelle tout ce qui a été enregistré autre part
    $(function(){
        for(let i=0;i<Pov.__onBodyReadyCallBacks.length;i++){
            Pov.__onBodyReadyCallBacks[i]();
        }
        Pov.__init();
    });



});