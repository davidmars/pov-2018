export class PovSSEevent{
    constructor(data){
        /**
         *
         * @type {string}
         */
        this.id=data.id;
        /**
         *
         * @type {string} Message à logger
         */
        this.devMessage=data.devMessage;
        /**
         *
         * @type {string} Message à afficher
         */
        this.humanMessage=data.humanMessage;
        /**
         *
         * @type {string} quand YYYY-MM-dd HH:MM:SS
         */
        this.time=data.time;
        /**
         *
         * @type {object} données additionelles
         */
        this.vars=data.vars;
        /**
         *
         * @type {string} Type d'event
         */
        this.type=data.type;

        if(this.devMessage){
            console.log("SSE",this.devMessage,this);
        }
    }
}