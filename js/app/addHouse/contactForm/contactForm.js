( function() {
	'use strict';

	angular.module('chaiApp.contactForm').controller('ContactFormCtrl', ContactFormCtrl);

	ContactFormCtrl.$inject = ['$window','localStorageService'];

	/**@ngInject*/
	function ContactFormCtrl($window, localStorageService){
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
			console.log(localStorageService);
		}

		function clickNext($event){
			$event.preventDefault();
			console.log(homeCtrl.contactData);

			if(true){
				var contact = JSON.stringify(homeCtrl.contactData);
				console.log(contact);
				localStorageService.setItem('test',contact);
				var final = localStorageService.getJSON('test');
				console.log(final);
			}

			counter++;
		}
	}
})();