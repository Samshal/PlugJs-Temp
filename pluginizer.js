/**
* Pluginizer.js
* Contains abstract event handler functions for module handling
* Requires the jQuery library
*
* @author Samuel Adeshina
* @copyright
* @license
* @since
*/

var interceptor = require("./interceptor.js");
var dom = require("./dom.js");

interceptor.registerModuleStarterEvents(dom.getModuleStarters());