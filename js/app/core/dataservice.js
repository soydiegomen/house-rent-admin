(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			saveHouse : saveHouse,
			uploadFile : uploadFile,
			getHouseByStatus : getHouseByStatus,
			getHouse : getHouse,
			updateHouse : updateHouse
		};

		return service;

		function saveHouse(houseData){
			
			var house = buildHouseJson(houseData);

			var serviceUrl = appConfig.apiBaseUrl + 'api/houses';

			return $http.post(serviceUrl, house)
				.then(function successCallback(response) {
			    	return response.data;
			  	}, function errorCallback(response) {
			    	return response.data;
			  	});
		}

		function updateHouse(houseData){
			var house = buildHouseJson(houseData);
			var id = houseData.general._id;
			var serviceUrl = appConfig.apiBaseUrl + 'api/house/' + id;

			return $http.put(serviceUrl, house)
				.then(function successCallback(response) {
			    	return response.data;
			  	}, function errorCallback(response) {
			    	return response.data;
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
			var serviceUrl = appConfig.apiBaseUrl + 'api/house-with-files/' + id;

			return $http.get(serviceUrl)
				.then(function successCallback(response) {
			    	return response.data;
			  	}, function errorCallback(response) {
			    	return response;
			  	});
		}		

		function uploadFile($scope){

			var formData = new FormData();
			formData.append('userPhoto', $scope.file);

			var serviceUrl = appConfig.apiBaseUrl + 'api/upload-files';

			return $http({
	            method: 'POST',
	            url: serviceUrl,
	            headers: {
	                'Content-Type': 'multipart/form-data'
	            },
	            data: formdata ,
	            transformRequest: angular.identity
	        }).
	        then(function(result) {
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

		function buildHouseJson(houseData){
			var contact = houseData.contact;
			var general = houseData.general;
			var details = houseData.details;
			var arrayFiles = houseData.files ? houseData.files : [];

			var servArray = getServicesArray(general.services);

			var house = {
				userId: appConfig.userId,
				title: details.title,
				summary: details.summary,
				price: details.price,
				priceType: details.priceType,
				propertyType: general.propertyType,
				operationType: general.operationType,
				services: servArray,
				status: details.status,
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
					website: contact.website
				},
				files: arrayFiles
			};

			return house;
		}
	}
})();