(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('localStorageService', localStorageService);

	localStorageService.$inject = ['$window'];

	function localStorageService($window){
		var service = {
			setItem : setItem,
			getItem : getItem,
			getJSON : getJSON
		};

		return service;

		function setItem(key, value){
			$window.localStorage.setItem(key, value);
		}

		function getItem(key){
			return JSON.parse($window.localStorage.getItem(key));
		}

		function getJSON(key){
			return JSON.parse($window.localStorage.getItem(key));
		}
	}
})();