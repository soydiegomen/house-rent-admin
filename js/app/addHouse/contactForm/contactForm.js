( function() {
	'use strict';

	angular.module('chaiApp.contactForm').controller('ContactFormCtrl', ContactFormCtrl);

	ContactFormCtrl.$inject = ['$window', 'houseStorageService', '$location'];

	/**@ngInject*/
	function ContactFormCtrl($window, houseStorageService, $location){
		var homeCtrl = this;

		homeCtrl.contactData = { name: '', 
			phone: '', 
			email: '', 
			facebook: '', 
			website: ''
		};

		//attributes
		var counter = 0;
		//events
		homeCtrl.clickNext = clickNext;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated ContactFormCtrl');	
			var savedContData = houseStorageService.getContactData();
			if(savedContData){
				homeCtrl.contactData = savedContData;
			}
		}

		function clickNext($event){
			$event.preventDefault();

			//Validate data before change to the next step
			if(true){
				houseStorageService.setContactData( homeCtrl.contactData);
				$location.path('/general-form');
			}
		}
	}
})();