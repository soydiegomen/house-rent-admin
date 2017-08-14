( function() {
	'use strict';

	angular.module('chaiApp.contactForm').controller('ContactFormCtrl', ContactFormCtrl);

	ContactFormCtrl.$inject = ['$window', 'houseStorageService','$location','$routeParams', 'dataservice'];

	/**@ngInject*/
	function ContactFormCtrl($window, houseStorageService, $location, $routeParams, dataservice){
		var homeCtrl = this;

		homeCtrl.contactData = { 
			name: '', 
			phone: '', 
			email: '', 
			facebook: '', 
			website: ''
		};

		//attributes
		var counter = 0;
		//events
		homeCtrl.clickNext = clickNext;
		homeCtrl.cancel = cancel;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated ContactFormCtrl');	
			console.log('id',$routeParams.id);
			if($routeParams.id){
				dataservice.getHouse($routeParams.id).then( function (data) {
					houseStorageService.setAllTempData(data);

					var savedContData = houseStorageService.getContactData();
					if(savedContData){
						homeCtrl.contactData = savedContData;
					}
				});
			}else{
				var savedContData = houseStorageService.getContactData();
				if(savedContData){
					homeCtrl.contactData = savedContData;
				}	
			}

			
		}

		//Events implementation
		function clickNext($event){
			$event.preventDefault();

			//Validate data before change to the next step
			if(true){
				houseStorageService.setContactData( homeCtrl.contactData);
				$location.path('/general-form');
			}
		}

		function cancel($event){
			$event.preventDefault();

			//Clear local storage data
			houseStorageService.clear();
			//TODO: Redirect to the houses list page
			$location.path('/list-houses');
		}
	}
})();