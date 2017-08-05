( function() {
	'use strict';

	angular.module('chaiApp.photosForm').controller('PhotosFormCtrl', PhotosFormCtrl);

	PhotosFormCtrl.$inject = ['$location','dataservice', 'houseStorageService', '$scope', 'FileUploader'];

	/**@ngInject*/
	function PhotosFormCtrl($location, dataservice, houseStorageService, $scope, FileUploader){
		var homeCtrl = this;
		var uploadedFiles = [];

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
			var houseData = houseStorageService.getHouseData();
			dataservice.saveHouse(houseData).then(function(data){
				var houseId = data._id;

				//If there are files must save it
				if(uploadedFiles.length > 0){
					saveHouseFiles(houseId, function(){
						console.log('All the files are saved');
					});
				}
			});
		}

		function saveHouseFiles(houseId, callback){
			var counter = uploadedFiles.length;
			angular.forEach(uploadedFiles, function(value, key){
		    	var houseFile = {
				  houseId: houseId,
				  fileId: value,
				  isActive: true
				};

				dataservice.saveHouseFile(houseFile).then(function(){
					counter--;
					console.log('callback',counter);

					if(counter === 0){
						callback();
					}
				});
			});
		}

		// CALLBACKS
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', response);
            var newFile = response._id;
            uploadedFiles.push(newFile);
            console.log(uploadedFiles);
            //Clear input file, for upload new files
            document.getElementById('userPhoto').value = null;
        };

	}
})();