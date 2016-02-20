(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
	"doms" : {
		"TOPDIV" : "#header",
		"H1":".h1",
		"CONTAINER":"#container",
		"RIGHTNAV":"#right-nav"
	},

	"module_starters" : [
		"a", "div"
	],

	"protocols" : {
		"app" : "plug:",
		"module" : "module:",
		"http" : "http:",
		"https" : "https:"
	},

	"custom-attribute" : "plug-"
}
},{}],2:[function(require,module,exports){
module.exports={
	"Authenticator" : {
		"path" : "modules/Authenticator/Authenticator",
		"views" : [
			"content.plugin"
		]
	},

	"Authorization" : {
		"path" : "",
		"views" : [

		]
	}
}
},{}],3:[function(require,module,exports){
/**
* Async.js
*
* @author Samuel Adeshina
* @copyright
* @license
* @since
*/

module.exports.get = get;

function get(url) {
	var result = null;
	$.get(url, function(data) {
		result = data;
	});

	return result;
}
},{}],4:[function(require,module,exports){
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
},{"../../configs/dom.json":1}],5:[function(require,module,exports){
/**
* Interceptor.js
* Contains abstract event handler functions for module handling
* Requires the jQuery library
* Requires Dom.js
*
* @author Samuel Adeshina
* @copyright
* @license
* @since
*/

/*
* @todo
* EVENT DELEGATION.
*
* What happens to the module_starters within modules?
* without delegating this event handler through a parent dom element
* It might be very difficult if not impossible to get the module_starters
* within module views to work as expected.
*/

/**
* Provide a common interface for registering the registerModuleStarterEvents function
* @see registerModuleStarterEvents()
*/

var urlHandler = require("./url.js");
var domHandler = require("./dom.js");
var loader = require("./loader.js");

module.exports.registerModuleStarterEvents = registerModuleStarterEvents;

/**
* Intercepts every event and passes several events such as onclick, onblur, onsubmit and so on
* on dom elements.
*/
function getRequestForModules(module_starters = "undefined"){
	//If module_starters array is not defined, listen to all `a` tags for click events
	if (module_starters === "undefined") {
		var module_starters = [$("a")];
	}

	for (index in module_starters){
		handler = module_starters[index];
		if (handler.each !== "undefined") {
			handler.each(function(handle){
				handleClickEvent($(handler[handle]));
			});
		}
		else {
			handleClickEvent($(handler));
		}
	}
}

/**
* Handler for onClick events
*/
function handleClickEvent(handler) {
	if (isModuleStarter(handler)){	
		handler.on("click", function(e){
			e.preventDefault();
			alert("I've been clicked");
			loader.loadView("Authenticator", "content.plugin");
		});
	}
}

/**
* Boolean method, checks to see if the supplied dom element
* is a valid module starter/loader
*/
function isModuleStarter(element){

	var module_starter_keyword = "module";
	var module_starter_protocol = domHandler.getProtocols().module;
	var ms_attr = element.attr(module_starter_keyword);
	if (typeof ms_attr !== "undefined" && ms_attr !== null) {
		return true;
	}
	else if (typeof element.attr("href") !== "undefined") {
		var href_element = element.attr("href");
		var protocol = urlHandler.getProtocol(href_element);
		return protocol == module_starter_protocol;
	}
	else {
		return false;
	}
}

/**
* Accepts an array of module_starters and registers them to
* assigned events.
*/
function registerModuleStarterEvents(module_starters) {
	getRequestForModules(module_starters);
}
},{"./dom.js":4,"./loader.js":6,"./url.js":8}],6:[function(require,module,exports){
/**
* Loader.js
*
* @author Samuel Adeshina
* @copyright
* @license
* @since
*/

var moduleConfig = require("../../configs/module.json");
var async = require("./async.js");
var utility = require("./utility.js");

module.exports.loadView = loadView;

function moduleExists(mdl) {
	var module_config_array = utility.convertJsonToArray(moduleConfig);

	console.log(module_config_array);
	return moduleConfig.m !== "undefined";
}

function getModulePath(mdl) {
	return moduleConfig.mdl.path;
}

function viewExists(mdl_path, vw) {
	var full_url = mdl_path+vw;

	var result = async.get(full_url);

	console.log(result);

	return false;
}

function getViewPath(mdl_path, vw) {

}

function loadView(mdl, vw) {
	if (moduleExists(mdl) && viewExists(getModulePath(mdl), vw)) {
		return getViewPath(getModulePath(mdl), vw);
	}
	else {
		//log an error or fly to mars or do something
	}
}
},{"../../configs/module.json":2,"./async.js":3,"./utility.js":9}],7:[function(require,module,exports){
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
},{"./dom.js":4,"./interceptor.js":5}],8:[function(require,module,exports){
/**
* Url.js
*
* @author Samuel Adeshina
* @copyright
* @license
* @since
*/

module.exports.getProtocol = getProtocol;

function getProtocol( url ){
	var backslash_location = url.indexOf("//");

	var protocol = url.substr(0, backslash_location);
	return protocol;
}
},{}],9:[function(require,module,exports){

module.exports.convertJsonToArray = convertJsonToArray;

function convertJsonToArray(json) {
	json = {"a":{}, "b":{}}
	var array = $.map($.parseJSON(json), function(data){
		return data;
	});

	return array;
}
},{}]},{},[7]);
