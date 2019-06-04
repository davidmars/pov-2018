/**
 * attributs html
 * [history-hrefs]='on s'en fout' les a[href] seront des liens ajax là dedans
 * [history-hrefs] [history-hrefs='disabled'] pour désactiver les liens ajax au sein d'un [history-hrefs]
 *
 *
 */
import Xdebug from "./xdebug/Xdebug";

export default class PovHistory{

    static init(){
        let me=this;
        //initialise les href qui sont dans un [history-hrefs]
        $body.on("click","[history-hrefs] [href]",function(e){
            let $href=$(this);
            let url=$href.attr("href");

            if($href.is("[href^='#']")){
                e.isAnchorClick=true;
                return;
            }
            if(me.isHrefHistory($href)){
                me.goUrl(url,$href,e);
                e.preventDefault();
                return false;
            }else{
                console.log("PovHistory","lien non compatible");
                e.stopPropagation();
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
                if(e.json.pageInfo){
                    PovHistory.currentPageInfo=e.json.pageInfo;
                }
                Pov.events.dispatchDom($body,EVENTS.HISTORY_CHANGE_URL_LOADED);
                if(cb){
                    cb(e);
                }else{
                    if(e.json.meta){
                        PovHistory.setMeta(e.json.meta);

                    }
                    if(e.html){
                        PovHistory.injectHtml(e.html);
                    }
                }
            },
            error:function(e,t,err){
                Xdebug.fromString(e.responseText);
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




