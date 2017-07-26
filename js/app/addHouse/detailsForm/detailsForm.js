( function() {
	'use strict';

	angular.module('chaiApp.detailsForm').controller('DetailsFormCtrl', DetailsFormCtrl);

	/**@ngInject*/
	function DetailsFormCtrl($location){
		var detailsCtrl = this;
		detailsCtrl.clickNext = clickNext;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated DetailsFormCtrl');	
		}

		function clickNext($event){
			$event.preventDefault();

			//Validate data before change to the next step
			$location.path('/photos-form');
		}
	}
})();