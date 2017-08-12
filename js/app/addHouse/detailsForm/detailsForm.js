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
				console.log('summary', savedData);
				detailsCtrl.detailsData = savedData;
			}
		}

		function clickNext($event){
			$event.preventDefault();

			//Validate data before change to the next step
			houseStorageService.setDetailsData(detailsCtrl.detailsData);
			$location.path('/photos-form');
		}

		function clickBack($event){
			$event.preventDefault();
			$location.path('/general-form');
		}
	}
})();