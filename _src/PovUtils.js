export default class PovUtils{
    /**
     * un id unique
     * @returns {string}
     * @see https://stackoverflow.com/a/105074/1204822
     */
    static uid(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     *
     * @param {number} inputValue
     * @param {number} inputMax
     * @param {number} outputMax
     * @param {number} inputMin
     * @param {number} outputMin
     * @returns {number}
     */
    static ratio(inputValue, inputMax, outputMax, inputMin=.0, outputMin=.0){
        let product = (inputValue - inputMin) / (inputMax - inputMin);
        return ((outputMax - outputMin) * product) + outputMin;
    };

    /**
     * html entity decode
     * @param html
     * @returns {string}
     */
    static decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    /**
     * Dédoublonne le tableau et le renvoie
     * @param {array} array
     * @returns {array}
     */
    static arrayUnique(array){
        array = array.reverse().filter(function (e, i, arr) {
            return array.indexOf(e, i+1) === -1;
        }).reverse();
        return array;
    }
}