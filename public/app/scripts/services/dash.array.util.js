angular
	.module('app')
	.factory('arrayUtil', arrayUtil);

function arrayUtil() {
	return {
		findEqual: findEqual,
		findEqualObjByKey: findEqualObjByKey,
		remove: remove,
		removeByObj: removeByObj
	};

	function findEqual(_array, _value){
		const result = {
			index: [],
			founded: false,
			results: null
		};

		result.results = _array.filter(function(obj, i) {
			if (obj === _value) {
				result.index.push(i);
				result.founded = true;
				
				return true;
			}
		});

		return result;
	}

	function findEqualObjByKey(_array, _key, _value){
		if (!_array || !_key) {
			return null;
		}

		var result = {
			index: [],
			founded: false,
			results: null
		};

		result.results = _array.filter(function(obj, i) {
			if (obj[_key] === _value) {
				result.index.push(i);
				result.founded = true;
				return true;
			}
		});

		return result;
	}

	function remove(_array, value) {
		var index = _array.indexOf(value);

		if (index === -1) {
			return null;
		
		} else {
			_array.splice(index, 1);
		}
	}

	function removeByObj(_array, _key, _value) {
		var index = findEqualObjByKey(_array, _key, _value).index[0];

		return _array.splice(index, 1);
	}
}