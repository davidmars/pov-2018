export default class Pov{

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

    /**
     * Renvoie un terme traduit
     * @param termIdentitifier
     * @return {string} Le terme traduit
     */
    static translate(termIdentitifier){
        if(LayoutVars.translations[termIdentitifier]){
            return LayoutVars.translations[termIdentitifier];
        }else{
            console.error(termIdentitifier+" n'est pas défini dans LayoutVars.translations");
            return termIdentitifier;
        }
    }
}
Pov.__onBodyReadyCallBacks=[];







