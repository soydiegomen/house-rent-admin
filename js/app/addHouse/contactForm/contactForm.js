( function() {
	'use strict';

	angular.module('chaiApp.contactForm').controller('ContactFormCtrl', ContactFormCtrl);

	ContactFormCtrl.$inject = ['$window', 'houseStorageService','$location','$routeParams'];

	/**@ngInject*/
	function ContactFormCtrl($window, houseStorageService, $location, $routeParams){
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
			var savedContData = houseStorageService.getContactData();
			if(savedContData){
				homeCtrl.contactData = savedContData;
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

			houseStorageService.clear();
			//TODO: Redirect to the houses list page
			homeCtrl.contactData = {};
		}
	}
})();