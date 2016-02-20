/**
* Dom.js
* Lightweight library for parsing dom.json, Pluginizer's configuration file.
*
* @author Samuel Adeshina
* @copyright
* @license
* @since
*/

/**
 * Make functions public
*/
module.exports.getDom = getDom;
module.exports.getModuleStarters = getModuleStarters;
module.exports.getProtocols = getProtocols;

var configInJsonFormat = require("../../configs/dom.json");

function getDom() {
	var dom_from_config = configInJsonFormat.doms;

	return dom_from_config;
}

function getModuleStarters() {
	var module_starters = configInJsonFormat.module_starters;

	for (index in module_starters) {
		module_starters[index] = $(module_starters[index]);
	}

	return module_starters;
}

function getProtocols() {
	var protocol = configInJsonFormat.protocols;
	return protocol;
}