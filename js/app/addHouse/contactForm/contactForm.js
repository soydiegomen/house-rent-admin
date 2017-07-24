( function() {
	'use strict';

	angular.module('chaiApp.contactForm').controller('ContactFormCtrl', ContactFormCtrl);

	ContactFormCtrl.$inject = ['$window'];

	/**@ngInject*/
	function ContactFormCtrl($window){
		var homeCtrl = this;

		//attributes
		var counter = 0;
		//events
		homeCtrl.clickNext = clickNext;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated ContactFormCtrl');	
		}

		function clickNext($event){
			$event.preventDefault();
			console.log('Next');

			if(counter === 0){
				$window.localStorage.setItem('test','super valor de prueba');
			}else{
				console.log($window.localStorage.getItem('test'));
				$window.localStorage.setItem('test','super valor de prueba 2');
			}

			counter++;
		}
	}
})();