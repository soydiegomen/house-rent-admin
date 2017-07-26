( function() {
	'use strict';

	angular.module('chaiApp.generalForm').controller('GeneralFormCtrl', GeneralFormCtrl);

	GeneralFormCtrl.$inject = ['localStorageService', '$location', 'houseStorageService'];

	/**@ngInject*/
	function GeneralFormCtrl(localStorageService, $location, houseStorageService){
		var generalCtrl = this;
		generalCtrl.clickNext = clickNext;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated GeneralFormCtrl');	
			var savedContData = houseStorageService.getContactData();
			console.log('general-form', savedContData);
		}

		function clickNext($event){
			$event.preventDefault();

			//Validate data before change to the next step
			
			$location.path('/details-form');
		}
	}
})();