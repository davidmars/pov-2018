/**
 * Constantes pour les events
 */
var EVENTS={

    /**
     * un élément devient visible ou masqué
     */
    VISIBILITY_CHANGE:"VISIBILITY_CHANGE",
    /**
     * un élément vient devient visible
     */
    VISIBLE:"VISIBLE",
    /**
     * un element vient d'être masqué
     */
    HIDDEN:"HIDDEN",
    /**
     * Rediemtionnement d'un élement (la fenêtre navigateur par exemple ;)
     */
    RESIZE:"RESIZE",
    /**
     * Ev^nement de scroll
     */
    SCROLL:"SCROLL",
    /**
     * Mouvement de souris
     */
    MOUSE_MOVE:"MOUSE_MOVE",
    /**
     * Changement d'orientation
     */
    ORIENTATION_CHANGE:"ORIENTATION_CHANGE",
    /**
     * Entrée ou sortie du full screen
     */
    FULL_SCREEN_CHANGE:"FULL_SCREEN_CHANGE",
    /**
     * Entrée en mode full screen
     */
    FULL_SCREEN_ENTER:"FULL_SCREEN_ENTER",
    /**
     * Sortie du full screen
     */
    FULL_SCREEN_CANCEL:"FULL_SCREEN_CANCEL",

    CLOSE:"CLOSE",
    OPEN:"OPEN",

    SAVED:"SAVED",
    /**
     * Pour désigner un évênement de sélection
     */
    SELECT:"SELECT",
    /**
     * History étape 1 Quand l'url change
     */
    HISTORY_CHANGE_URL:"HISTORY_CHANGE_URL",
    /**
     * History étape 2 Quand l'url a changé et qu'on a commencé à charger la page
     */
    HISTORY_CHANGE_URL_LOADING:"HISTORY_CHANGE_URL_LOADING",
    /**
     * History étape 3 Quand l'url a changé et que la page est chargée (mais pas injectée)
     */
    HISTORY_CHANGE_URL_LOADED:"HISTORY_CHANGE_URL_LOADED",
    /**
     * History étape 4 Quand l'url a changé, que la page est chargée ET injectée dans le DOM
     */
    HISTORY_CHANGE_URL_LOADED_INJECTED:"HISTORY_CHANGE_URL_LOADED_INJECTED",
    /**
     * l'upload de fichier est terminé
     */
    UPLOAD_COMPLETE:"UPLOAD_COMPLETE",

    /**
     * Emis quand un nouvel objet xdebug est instancié, le paramètre est l'objet xdebug
     */
    XDEBUG_DETECTED:"XDEBUG_DETECTED",

    /**
     * Evènement server qui dit si l'utilisateur est loggué en wysiwyg ou non (voir dans vars)
     * @type {string}
     */
    SSE_USER_IS_WYSIWYG:"SSE_USER_IS_WYSIWYG",
    /**
     * Evènement server qui dit que l'utilisateur vient de se logger
     * @type {string}
     */
    SSE_USER_LOGIN:"SSE_USER_LOGIN",
    /**
     * Evènement server qui dit que l'utilisateur vient de se dé-logger
     * @type {string}
     */
    SSE_USER_LOGOUT:"SSE_USER_LOGOUT",
    /**
     * Evènement server qui envoie une log
     * @type {string}
     */
    SSE_DEBUG_LOG:"debug.log",
    /**
     * Quand le serveur nous dit que le nombre de records a changé
     */
    SSE_DB_COUNT_CHANGE:"SSE_DB_COUNT_CHANGE",
    /**
     * Quand le serveur nous dit qu'un record a été effacé
     */
    SSE_DB_TRASH:"SSE_DB_TRASH",
    /**
     * Quand le serveur nous dit qu'un record a été modifié
     */
    SSE_DB_CHANGE:"SSE_DB_CHANGE",
    /**
     * Evènement server qui dit qu'il y a eu une modification sur les utilisateurs
     */
    SSE_USER_CHANGE:"SSE_USER_CHANGE",
    /**
     * Evènement server qui dit d'afficher une info
     * @type {string}
     */
    SSE_INFO:"info",
};

window.EVENTS=EVENTS;