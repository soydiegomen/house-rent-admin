(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('dataservice', dataservice);

	dataservice.$inject = ['$http','appConfig'];

	function dataservice($http, appConfig){
		var service = {
			getWorkGallery : getWorkGallery,
			getPortfolio : getPortfolio,
			saveHouse : saveHouse,
			getWebDetails : getWebDetails
		};

		return service;

		function getPortfolio(type){
			var serviceUrl = getPortfolioService(type);
			return $http.get(serviceUrl).then(getDesignGallComplete).catch(function (message){
				console.log('Error in getDesignGallery. Message:' + message);
			});

			function getDesignGallComplete(data, status, headers, config){
				return data.data;
			}
		}

		function getWorkGallery(){
			return $http.get('jsons/work-gallery.json').then(getWorkGallComplete).catch(function (message){
				console.log('Error in getDesignGallery. Message:' + message);
			});

			function getWorkGallComplete(data, status, headers, config){
				return data.data;
			}
		}

		function getWebDetails(id){
			return $http.get('jsons/portfolio-webdev.json').then(getSelectedItem).catch(function (message){
				console.log('Error in getSelectedItem. Message:' + message);
			});

			function getSelectedItem(result, status, headers, config){
				var selected = {};
				var items = result.data;
				//Parese id string to number
				id =  Number(id);
				for(var i = 0; i < items.length; i++){
					if(items[i].id === id){
						selected = items[i];
					}
				}
				return selected;
			}
		}

		function saveHouse(){
			
			var house = {
			  userId: '595c5e901e83dc1e06000001',
			  title: 'Casa a 5 min del centro',
			  price: '2800',
			  priceType: 'Mensual',
			  propertyType: 'Casa',
			  operationType: 'Renta',
			  services: ['Telefono', 'Cocina'],
			  status: 'Publicado',
			  address: {
			  	address: 'Alcatraz, Col Javier Barrios',
			  	state: 'Mexico',
			  	town: 'Jilotepec',
			  	longitude: '100',
			  	latitude: '100'
			  },
			  contact: {
			  	name: 'Diego Mendoza',
			  	phone: '55 23 22 03 85',
			  	mail: 'diego@mail.com',
			  	facebook: 'www.facebook.com',
			  	webSite: 'www.misitio.com'
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
		function getPortfolioService(type){
			var serviceUrl = '';
			switch(type){
				case 'design':
					serviceUrl = 'jsons/portfolio-diseno.json';
					break;
				case 'photos':
					serviceUrl = 'jsons/portfolio-photos.json';
					break;
				case 'webdev':
					serviceUrl = 'jsons/portfolio-webdev.json';
					break;
			}
			return serviceUrl;
		}
	}
})();