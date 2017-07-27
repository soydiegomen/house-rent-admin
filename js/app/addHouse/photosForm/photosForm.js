( function() {
	'use strict';

	angular.module('chaiApp.photosForm').controller('PhotosFormCtrl', PhotosFormCtrl);

	PhotosFormCtrl.$inject = ['$location'];

	/**@ngInject*/
	function PhotosFormCtrl($location){
		var homeCtrl = this;

		//Events
		homeCtrl.clickBack = clickBack;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated PhotosFormCtrl');	
		}

		function clickBack($event){
			$event.preventDefault();
			$location.path('/details-form');
		}
	}
})();