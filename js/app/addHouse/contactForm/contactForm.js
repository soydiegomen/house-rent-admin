( function() {
	'use strict';

	angular.module('chaiApp.contactForm').controller('ContactFormCtrl', ContactFormCtrl);

	ContactFormCtrl.$inject = ['$window', 'houseStorageService','$location','$routeParams', 
		'dataservice', 'utilityService'];

	/**@ngInject*/
	function ContactFormCtrl($window, houseStorageService, $location, $routeParams, 
		dataservice, utilityService){
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
			if($routeParams.id){
				//Edit mode
				var houseId = $routeParams.id;
				dataservice.getHouse(houseId).then( function (data) {
					houseStorageService.setAllTempData(data);

					var savedContData = houseStorageService.getContactData();
					if(savedContData){
						homeCtrl.contactData = savedContData;
					}
				});

				dataservice.getHouseFiles(houseId).then( function (data){
					houseStorageService.setHoseFilesJSON(data);
				});
			}else{
				//Inser mode
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
			houseStorageService.setContactData( homeCtrl.contactData );
			utilityService.navigateToNextStep('/general-form/');
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