import EventEmitter from "event-emitter-es6";

export default class PovEvents extends EventEmitter{

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