/**
* Loader.js
* Requires the jQuery library
* Requires Dom.js
* Requires Async.js
* Requires Utility.js
*
* @author Samuel Adeshina
* @copyright
* @license
* @since
*/

/**
* Import dependencies
*/
var moduleConfig = require("../../configs/module.json");
var async = require("./async.js");
var utility = require("./utility.js");

/**
* Make function public
*/
module.exports.loadView = loadView;

/**
* Check if a module exists
* @param mdl Module Name or (id?)
*/
function moduleExists(mdl) {
	var module_config_array = utility.convertJsonToArray(moduleConfig);

	console.log(module_config_array);
	return moduleConfig.m !== "undefined";
}

/**
* Get the full absolute path of a module
* @param mdl Module Name or (module id?)
*/
function getModulePath(mdl) {
	return moduleConfig.mdl.path;
}

/**
* Checks if a view exists. A view is a "Template" that 
* describes how information should be presented.
*
* @mention: Frank, hope you're thinking about JADE already!!!
*/
function viewExists(mdl_path, vw) {
	var full_url = mdl_path+vw;

	var result = async.get(full_url);

	console.log(result);

	return false;
}

/**
* Private method. Get the absolute path of a 
* view element (template or JADE file :) )
*
* @todo: Coming up with a magical algorithm. Please stay tuned!
*/
function getViewPath(mdl_path, vw) {

}

/**
* Return enough information an XHR requests needs to find a view
*
* @todo: Maybe Monolog could help with exceptions and errors over here?
*/
function loadView(mdl, vw) {
	if (moduleExists(mdl) && viewExists(getModulePath(mdl), vw)) {
		return getViewPath(getModulePath(mdl), vw);
	}
	else {
		//log an error or fly to mars or do something
	}
}