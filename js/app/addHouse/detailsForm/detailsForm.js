( function() {
	'use strict';

	angular.module('chaiApp.detailsForm').controller('DetailsFormCtrl', DetailsFormCtrl);

	DetailsFormCtrl.$inject = ['houseStorageService', '$location', 'utilityService'];
	
	/**@ngInject*/
	function DetailsFormCtrl(houseStorageService, $location, utilityService){
		var detailsCtrl = this;

		//Properties
		detailsCtrl.showMap = false;		

		//Events
		detailsCtrl.clickBack = clickBack;
		detailsCtrl.clickNext = clickNext;

		//model
		detailsCtrl.detailsData = { 
			title: '', 
			summary: '', 
			price: '', 
			priceType: '', 
			address: '',
			state: 'México',
			town: '',
			longitude: 0,
			latitude: 0
		};

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated DetailsFormCtrl');	

			var savedData = houseStorageService.getDetailsData('details-data');
			if(savedData){
				detailsCtrl.detailsData = savedData;
			}
		}

		function clickNext($event){
			$event.preventDefault();

			//Validate data before change to the next step
			houseStorageService.setDetailsData(detailsCtrl.detailsData);
			utilityService.navigateToNextStep('/photos-form/');
		}

		function clickBack($event){
			$event.preventDefault();
			$location.path('/general-form');
		}
	}
})();