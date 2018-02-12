/**
 * Javascript utilisé dans l'interface de debuggage /dev
 */
require("uikit/dist/css/uikit.min.css");
require("uikit/dist/js/uikit.min");

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
window.UIkit = UIkit;
// loads the Icon plugin
UIkit.use(Icons);

require("./pov.boot");
