(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('houseStorageService', houseStorageService);

	houseStorageService.$inject = ['localStorageService'];

	function houseStorageService(localStorageService){
		var service = {
			getContactData : getContactData,
			setContactData : setContactData,
			getGeneralData : getGeneralData,
			setGeneralData : setGeneralData
		};

		return service;

		function setContactData(contactJSON){
			localStorageService.setJSONItem('contact', contactJSON);
		}

		function getContactData(){
			return localStorageService.getJSONItem('contact');
		}

		function setGeneralData(contactJSON){
			localStorageService.setJSONItem('general-data', contactJSON);
		}

		function getGeneralData(){
			return localStorageService.getJSONItem('general-data');
		}
	}
})();