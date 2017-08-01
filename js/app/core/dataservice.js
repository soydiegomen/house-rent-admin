(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			saveHouse : saveHouse
		};

		return service;

		function saveHouse(houseData){
			
			var contact = houseData.contact;
			var general = houseData.general;
			var details = houseData.details;

			var servArray = getServicesArray(general.services);

			var house = {
			  userId: appConfig.userId,
			  title: details.title,
			  price: details.price,
			  priceType: details.priceType,
			  propertyType: general.propertyType,
			  operationType: general.operationType,
			  services: servArray,
			  status: appConfig.defaultHouseStatus,
			  address: {
			  	address: details.address,
			  	state: details.state,
			  	town: details.town,
			  	longitude: details.longitude,
			  	latitude: details.latitude
			  },
			  contact: {
			  	name: contact.name,
			  	phone: contact.phone,
			  	mail: contact.email,
			  	facebook: contact.facebook,
			  	webSite: contact.website
			  }
			};

			return $http.post('http://localhost:3000/api/houses', house)
				.then(function successCallback(response) {
			    	return response;
			  	}, function errorCallback(response) {
			    	return response;
			  	});
		}

		/*Helpers*/
		function getServicesArray(services){
			var servArray = [];

			angular.forEach(services, function(value, key){
				//The object stored on local storage has many properties and 
				//just need the service name for save in DB
		    	servArray.push(value.service);
			});

			return servArray;
		}
	}
})();