import PovApi from "./PovApi";
import EventEmitter from "event-emitter-es6";
import {PovSSEevent} from "./PovSSEevent";

/**
 *
 */
export default class PovSSE extends EventEmitter{
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
            let event = new PovSSEevent(data);
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
