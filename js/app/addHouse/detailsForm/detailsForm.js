( function() {
	'use strict';

	angular.module('chaiApp.detailsForm').controller('DetailsFormCtrl', DetailsFormCtrl);

	DetailsFormCtrl.$inject = ['houseStorageService', '$location'];
	
	/**@ngInject*/
	function DetailsFormCtrl(houseStorageService, $location){
		var detailsCtrl = this;

		//Events
		detailsCtrl.clickBack = clickBack;
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

		function clickBack($event){
			$event.preventDefault();
			$location.path('/general-form');
		}
	}
})();