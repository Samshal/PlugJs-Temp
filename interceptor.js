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