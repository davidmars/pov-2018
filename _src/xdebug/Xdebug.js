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
        let found=false;

        if($tags.length===0){
            //si jamais xdebug n'est pas installé on aura des fatal error classiques
            let regex = /(<b>Fatal error<\/b>)([^\0]*)/;
            let m;
            if ((m = regex.exec(str)) !== null) {
                found=true;
                console.error("PHP Fatal error detected");
                var n = m[2].split("\n");
                for(var x in n){
                    console.error(n[x]);
                }
            }
        }else{
            found=true;
            $tags.each(function(){
                found=true;
                new Xdebug($(this));
            });
        }

        if(!found){
            console.error("xdebug problème pour trouver les erreurs...");
            console.error(str);
        }
    }
}

