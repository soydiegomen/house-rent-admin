( function() {
	'use strict';

	angular.module('chaiApp.contactForm').controller('ContactFormCtrl', ContactFormCtrl);

	/**@ngInject*/
	function ContactFormCtrl(){
		var homeCtrl = this;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated ContactFormCtrl');	
		}
	}
})();