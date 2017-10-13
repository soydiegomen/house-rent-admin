(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('houseStorageService', houseStorageService);

	houseStorageService.$inject = ['localStorageService'];

	function houseStorageService(localStorageService){
		var service = {
			getContactData: getContactData,
			setContactData: setContactData,
			getGeneralData: getGeneralData,
			setGeneralData: setGeneralData,
			setDetailsData: setDetailsData,
			getDetailsData: getDetailsData,
			getHouseData: getHouseData,
			clear: clear,
			setAllTempData: setAllTempData,
			setHouseFiles: setHouseFiles,
			getHouseFiles: getHouseFiles
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

		function setDetailsData(contactJSON){
			localStorageService.setJSONItem('details-data', contactJSON);
		}

		function getDetailsData(){
			return localStorageService.getJSONItem('details-data');
		}

		function getHouseData(){
			var house = {
				contact: null,
				general: null,
				details: null
			};

			house.contact = getContactData();
			house.general = getGeneralData();
			house.details = getDetailsData();

			return house;
		}

		function clear(){
			localStorageService.clear();
		}

		function setAllTempData(houseData){
			setContactUsingJson(houseData);
			setGeneralUsingJson(houseData);
			setDetailsUsingJson(houseData);	
		}

		/*Helpers*/
		function setContactUsingJson(json){
			var contactData = { 
				name: json.contact.name, 
				phone: json.contact.phone, 
				email: json.contact.mail, 
				facebook: json.contact.facebook, 
				website: json.contact.website
			};

			setContactData(contactData);
		}

		function setGeneralUsingJson(json){
			var generalData = { 
				_id: json._id,
				propertyType: json.propertyType, 
				operationType: json.operationType, 
				noBedrooms: json.noBedrooms, 
				noBathrooms: json.noBathrooms, 
				noParking: json.noParking,
				services: []
			};

			angular.forEach(json.services, function(value, Key){
				var jsonService = { service: value, label: null, isSelected: false };
				//Add service with object format required for GeneralForm.js
				generalData.services.push(jsonService);
			});

			setGeneralData(generalData);
		}

		function setDetailsUsingJson(json){
			var detailsData = { 
				title: json.title, 
				summary: json.summary, 
				price: json.price, 
				status: json.status,
				priceType: json.priceType, 
				address: json.address.address,
				state: json.address.state,
				town: json.address.town,
				longitude: json.address.longitude,
				latitude: json.address.latitude
			};

			setDetailsData(detailsData);
		}

		/*
		*Files of house methods
		*/
		function setHouseFiles(houseFiles){
			localStorageService.setJSONItem('house-files', houseFiles);
		}

		function getHouseFiles(){
			return localStorageService.getJSONItem('house-files');
		}
	}
})();