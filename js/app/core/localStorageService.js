(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('localStorageService', localStorageService);

	localStorageService.$inject = ['$window'];

	function localStorageService($window){
		var service = {
			setItem : setItem,
			setJSONItem : setJSONItem,
			getItem : getItem,
			getJSONItem : getJSONItem
		};

		return service;

		function setItem(key, value){
			$window.localStorage.setItem(key, value);
		}

		function setJSONItem(key, value){
			var jsonStr = JSON.stringify(value);
			$window.localStorage.setItem(key, jsonStr);
		}

		function getItem(key){
			return JSON.parse($window.localStorage.getItem(key));
		}

		function getJSONItem(key){
			return JSON.parse($window.localStorage.getItem(key));
		}
	}
})();