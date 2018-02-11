interface removeClassPrefix {
    settings: removeClassPrefixSettings;
    (behavior: 'enable'): JQuery;
    (settings?: removeClassPrefixSettings): JQuery;
}
interface removeClassPrefixSettings {
    title?: string;
}



interface evalHere {
    settings: evalHereSettings;
    (behavior: 'enable'): JQuery;
    (settings?: evalHereSettings): JQuery;
}
interface evalHereSettings {
    title?: string;
}


interface getMoreVars {
    settings: getMoreVarsSettings;
    (behavior: 'enable'): JQuery;
    (settings?: getMoreVarsSettings): JQuery;
}
interface getMoreVarsSettings {
    title?: string;
}


interface setMoreVars {
    settings: setMoreVarsSettings;
    (behavior: 'enable'): JQuery;
    (settings?: setMoreVarsSettings): JQuery;
}
interface setMoreVarsSettings {
    title?: string;
}



interface JQuery {
    removeClassPrefix: removeClassPrefix;
    evalHere: evalHere;
    getMoreVars: getMoreVars;
    setMoreVars: setMoreVars;
}

interface JQuery{
    /**
     * ts Retire toutes les classes qui commencent par prefix dans l'élément
     * @param {string} prefix
     * @function external:"JQuery.fn".removeClassPrefix
     * @returns {JQuery.fn}
     */
    removeClassPrefix(prefix);

    /**
     *
     * ts Rafraichit la vue d'un élément dom (ou d'une selection) qui a un attribut data-pov-v-path
     * @param {function} cb Callback une fois que le refresh aura eu lieu, l'argument est l'élément dom qui a été rafraichit
     */
    povRefresh(cb);
    /**
     * ts Fais un eval dont le contexte est l'élément jquery.
     * '$(this)' fait référence à l'objet dom utilisé
     * @param {string} selector exemple: $(this).closest('div').find('pre')
     * @returns {JQuery}
     */
    evalHere(selector);
    /**
     * ts Ces variables sont des variables qui seront utilisées pour enregistrer des valeurs additioneles
     * Utilisé par exemple par PovApi pour enregistrer des valeurs dans les ListItem
     * @returns {*} Les data moreVars
     */
    getMoreVars();
    /**
     * Ajoute une variable à data moreVars
     * @param varName
     * @param value
     */
    setMoreVar(varName,value);
}