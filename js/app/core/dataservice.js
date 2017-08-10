(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			saveHouse : saveHouse,
			uploadFile : uploadFile,
			saveHouseFile : saveHouseFile,
			getHouseByStatus : getHouseByStatus,
			getHouse : getHouse
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
			  noBedrooms: general.noBedrooms,
			  noBathrooms: general.noBathrooms,
			  noParking: general.noParking,
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
			    	return response.data;
			  	}, function errorCallback(response) {
			    	return response.data;
			  	});
		}

		function saveHouseFile(houseFile){

			return $http.post('http://localhost:3000/api/house-files', houseFile)
				.then(function successCallback(response) {
			    	return response.data;
			  	}, function errorCallback(response) {
			    	return response;
			  	});
		}

		function getHouseByStatus(status){
			var serviceUrl = appConfig.apiBaseUrl + 'api/houses/byStatus/' + status;
			return $http.get(serviceUrl)
				.then(function successCallback(response) {
			    	return response.data;
			  	}, function errorCallback(response) {
			    	return response;
			  	});
		}

		function getHouse(id){
			var serviceUrl = appConfig.apiBaseUrl + 'api/house/' + id;
			return $http.get(serviceUrl)
				.then(function successCallback(response) {
			    	return response.data;
			  	}, function errorCallback(response) {
			    	return response;
			  	});
		}

		function uploadFile($scope){
			console.log($scope.file);

			var formData = new FormData();
			formData.append('userPhoto', $scope.file);

			return $http({
	            method: 'POST',
	            url: 'http://localhost:3000/api/upload-files',
	            headers: {
	                'Content-Type': 'multipart/form-data'
	            },
	            data: formdata ,
	            transformRequest: angular.identity
	        }).
	        then(function(result) {
	            console.log(result);
	            return result.data;
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