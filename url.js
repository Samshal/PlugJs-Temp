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