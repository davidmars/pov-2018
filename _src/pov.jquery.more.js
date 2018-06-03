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
                //si le focus est ou est dans un .focus-prevent-refresh alors on ne fait rien
                if($focused.is("[focus-prevent-refresh],[focus-prevent-refresh] *")){
                    console.log("[focus-prevent-refresh]");
                    return;
                }
                console.log("focus détecté");
                focusPos = $focused[0].selectionStart;
                focusSelector=$focused[0].tagName+"[wysiwyg-var='"+$focused.attr("wysiwyg-var")+"'][wysiwyg-id='"+$focused.attr("wysiwyg-id")+"'][wysiwyg-type='"+$focused.attr("wysiwyg-type")+"']";
                cb=function(){
                    $(focusSelector).focus();
                    var elem=$(focusSelector)[0];
                    if (elem && elem.setSelectionRange && /text|search|password|tel|url/i.test(elem.type || '')) {
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
