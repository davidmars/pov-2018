import EventEmiter from "event-emitter-es6";
/**
 * Parse les erreurs xdebug dans du html et les renvoie vers la console du navigateur
 */
export default class Xdebug{
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

