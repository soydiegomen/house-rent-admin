( function() {
	'use strict';

	angular.module('chaiApp.photosForm').controller('PhotosFormCtrl', PhotosFormCtrl);

	PhotosFormCtrl.$inject = ['$location','dataservice'];

	/**@ngInject*/
	function PhotosFormCtrl($location, dataservice){
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
			dataservice.saveHouse();
		}
	}
})();