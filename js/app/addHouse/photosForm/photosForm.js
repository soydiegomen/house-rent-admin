( function() {
	'use strict';

	angular.module('chaiApp.photosForm').controller('PhotosFormCtrl', PhotosFormCtrl);

	PhotosFormCtrl.$inject = ['$location','dataservice', 'houseStorageService'];

	/**@ngInject*/
	function PhotosFormCtrl($location, dataservice, houseStorageService){
		var homeCtrl = this;

		//Events
		homeCtrl.clickBack = clickBack;
		homeCtrl.saveHouse = saveHouse;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated PhotosFormCtrl');	
		}

		function clickBack($event){
			$event.preventDefault();
			$location.path('/details-form');
		}

		function saveHouse($event){
			$event.preventDefault();
			//Get all the house data saved in the steps of the wizard
			var houseData = houseStorageService.getHouseData();
			dataservice.saveHouse(houseData);
		}
	}
})();