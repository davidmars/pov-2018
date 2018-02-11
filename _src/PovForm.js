
class PovForm{

    /**
     *
     * @param {jQuery.fn} $form L'élément html du formulaire
     */
    constructor($form){

        if($form.length != 1){
            console.error("incorrect $form element",$form);
        }

        this.$form=$form;
        this.$form.attr(PovForm.DATA_SELECTOR,"init");
        this.$messageBox=$form.find("["+PovForm.DATA_SELECTOR_MESSAGE+"]");
        this._initDom();
        /**
         * Mettre sur true pour arrêter un submit
         * @type {boolean}
         */
        this.stopped=false;

    }

    _getViewPath(){
        return this.$form.attr("pov-v");
    }

    _initDom(){
        let me=this;

        this.$form.css("border","10px dotted red");
        this.$form.on("submit",function(e){
            e.preventDefault();
            e.stopPropagation();
            me.submit();
        });
        this.$form.on("[href='#submit']","click",function(){
            me.submit();
        });
    }

    /**
     * Envoie le formulaire
     */
    submit(){
        let me=this;
        this.data=PovForm.getDataObject(this.$form);
        //enregistre les champs
        let formFields=[];
        for(let k of Object.keys(this.data)){
            formFields.push(k);
        }
        this.data.formFields=formFields;

        this.$form.trigger(PovForm.EVENT_BEFORE_SEND,[this.$form,this]);

        //

        if(!this.stopped){
            PovApi.save(this.data,function(apiResponse){
                if(apiResponse.success){
                    me.setMessage(apiResponse.messages.join(". "));
                    if(me._getViewPath()){
                        PovApi.getView(me._getViewPath(),me.$form);
                    }
                }else{
                   me.setMessage(apiResponse.errors.join(". "));
                }
            });
        }
    }
    setMessage(message="..."){
        this.$messageBox.html(message);
    }


     /**
     * Renvoie les données d'un $FORM sous forme d'objet
     * @param $form
     * @returns {*}
     */
    static getDataObject($form){
        let data = $form.serializeArray();

        function objectifyForm(formArray) {//serialize data function
            let returnArray = {};
            for (let i = 0; i < formArray.length; i++){
                returnArray[formArray[i]['name']] = formArray[i]['value'];
            }
            return returnArray;
        }
        return objectifyForm(data);
    }
    static initInDom(){
        $("["+PovForm.DATA_SELECTOR+"='']").each(function(){
            new PovForm($(this));
        })
    }
}

Pov.onBodyReady(
    function(){
        "use strict";
        $body.on(Pov.events.DOM_CHANGE+" "+Pov.events.READY,function(e){
            "use strict";
            PovForm.initInDom();
        });
    }
);


PovForm.EVENT_BEFORE_SEND="POV_FORM_EVENT_BEFORE_SEND";
PovForm.DATA_SELECTOR="pov-form";
PovForm.DATA_SELECTOR_MESSAGE="pov-form-message";
