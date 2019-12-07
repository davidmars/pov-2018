
import EventEmitter from "event-emitter-es6";

/**
 * @event EVENTS.RESIZE
 * @event EVENTS.SCROLL
 * @event EVENTS.FULL_SCREEN_CHANGE
 * @event EVENTS.ORIENTATION_CHANGE
 */
export default class Stage extends EventEmitter{

    constructor(){
        super();

        let me=this;

        /**
         * Est on en full screen ou non?
         * @type {boolean}
         */
        this.isFullScreen=false;

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
        /**
         * Position Y du scroll
         * @type {number}
         */
        this.scrollY=window.pageYOffset || document.documentElement.scrollTop;
        /**
         * Précédente position Y du scroll (afin de déterminer le sens du scroll)
         * @type {number}
         * @private
         */
        this._previousScrollY=0;

        function updateProps() {
            me.height=window.innerHeight;
            me.width=window.innerWidth;
            updateScrollProps();
        }

        /**
         * Met à jour les propriétés du scroll uniquement
         */
        function updateScrollProps(e){
            me._previousScrollY=me.scrollY;
            me.scrollY=window.pageYOffset || document.documentElement.scrollTop;
            if(me.scrollY<me._previousScrollY){
                me.emit(EVENTS.SCROLL_UP,e);
            }
            if(me.scrollY>me._previousScrollY){
                me.emit(EVENTS.SCROLL_DOWN,e);
            }
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
            updateScrollProps(ev);
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
                me.isFullScreen=true;
                me.emit(EVENTS.FULL_SCREEN_ENTER);
            }else{
                me.isFullScreen=false;
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



