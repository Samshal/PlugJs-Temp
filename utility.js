
module.exports.convertJsonToArray = convertJsonToArray;

function convertJsonToArray(json) {
	var array = $.map($.parseJSON(json), function(data){
		return data;
	});

	return array;
}

