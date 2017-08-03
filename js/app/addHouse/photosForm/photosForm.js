( function() {
	'use strict';

	angular.module('chaiApp.photosForm').controller('PhotosFormCtrl', PhotosFormCtrl);

	PhotosFormCtrl.$inject = ['$location','dataservice', 'houseStorageService', '$scope', 'FileUploader'];

	/**@ngInject*/
	function PhotosFormCtrl($location, dataservice, houseStorageService, $scope, FileUploader){
		var homeCtrl = this;

		//Events
		homeCtrl.clickBack = clickBack;
		homeCtrl.saveHouse = saveHouse;
		homeCtrl.myFile = null;

		//Setup FileUploader
		var uploader = $scope.uploader = new FileUploader({
            url: 'http://localhost:3000/api/upload-files',
            alias: 'userPhoto'
        });

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
			/*var houseData = houseStorageService.getHouseData();
			dataservice.saveHouse(houseData);*/
		}

		// CALLBACKS

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', response);
            //response._id (fileId)
        };

	}
})();