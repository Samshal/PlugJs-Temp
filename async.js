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