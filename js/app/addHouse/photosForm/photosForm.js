( function() {
	'use strict';

	angular.module('chaiApp.photosForm').controller('PhotosFormCtrl', PhotosFormCtrl);

	PhotosFormCtrl.$inject = ['$location','dataservice', 'houseStorageService', '$scope', 'FileUploader', 
		'appConfig', 'utilityService'];

	/**@ngInject*/
	function PhotosFormCtrl($location, dataservice, houseStorageService, $scope, FileUploader, 
		appConfig, utilityService){
		var homeCtrl = this;
		var uploadedFiles = [];
		var currentMode = 'insert';

		//Properties
		homeCtrl.files = null;

		//Events
		homeCtrl.clickBack = clickBack;
		homeCtrl.saveHouse = saveHouse;
		homeCtrl.myFile = null;
		homeCtrl.errorMessage = '';

		//Setup FileUploader
		var serviceUrl = appConfig.apiBaseUrl + 'api/upload-files';
		var uploader = $scope.uploader = new FileUploader({
            url: serviceUrl,
            alias: 'userPhoto'
        });

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated PhotosFormCtrl');	

			//Define current mode
			var houseData = houseStorageService.getHouseData();
			currentMode = houseData.general._id ? 'update' : 'insert';

			console.log(currentMode);
			if(currentMode === 'update'){
				renderHouseFiles();
			}
		}

		//Events
		function clickBack(){
			utilityService.navigateToNextStep('/details-form/');
		}

		function saveHouse(){
			var houseData = houseStorageService.getHouseData();

			if(currentMode === 'insert'){
				//Insert mode
				createNewHouse(houseData);
			}else{
				//Update mode
				updateHouse(houseData);
			}
		}

		/*
		*Helpers
		*/
		function renderHouseFiles(){
			var filesArray = houseStorageService.getHouseFiles();
			var fileServiceUrl = utilityService.getFilesSite();

			angular.forEach(filesArray, function(value, key){
				console.log(value);
				value.fileUrl = fileServiceUrl + value.fileUrl;
			});

			homeCtrl.files = filesArray;
		}

		function createNewHouse(houseData){
			//Get all the house data saved in the steps of the wizard
			
			dataservice.saveHouse(houseData).then(function(data){

				//If some error happend show the error and cancel the process 
				if(data.errors){
					homeCtrl.errorMessage = JSON.stringify(data);
					return;
				}else if(homeCtrl.errorMessage.length > 0){
					//Clear error message
					homeCtrl.errorMessage = '';
				}

				var houseId = data._id;

				//If there are files must save it
				if(uploadedFiles.length > 0){
					saveHouseFiles(houseId, doAfterSave);
				}else{
					doAfterSave();
				}
			});
		}

		function updateHouse(houseData){
			
			dataservice.updateHouse(houseData).then(function(data){

				//If some error happend show the error and cancel the process 
				if(data.errors){
					homeCtrl.errorMessage = JSON.stringify(data);
					return;
				}else if(homeCtrl.errorMessage.length > 0){
					//Clear error message
					homeCtrl.errorMessage = '';
				}

				var houseId = data._id;

				//If there are files must save it
				if(uploadedFiles.length > 0){
					saveHouseFiles(houseId, doAfterSave);
				}else{
					doAfterSave();
				}
			});
		}

		/*
		*Clear local storage and navigate 
		*/
		function doAfterSave(){
			//Clear local storage data
			houseStorageService.clear();
			alert('La casa fue guardada exitosamente!!');
			$location.path('/');
		}

		function saveHouseFiles(houseId, callback){
			var counter = uploadedFiles.length;
			console.log('files to save: ' + counter);
			angular.forEach(uploadedFiles, function(value, key){
		    	var houseFile = {
				  houseId: houseId,
				  fileId: value,
				  isActive: true
				};

				dataservice.saveHouseFile(houseFile).then(function(){
					counter--;

					//Execute callback after save all files
					if(counter === 0){
						callback();
					}
				});
			});
		}

		// CALLBACKS
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            var newFile = response._id;
            console.log('json aferter save fiel', response);
            uploadedFiles.push(newFile);
            //Clear input file, for upload new files
            document.getElementById('userPhoto').value = null;
            alert('La foto se ha guardado en el servidor');
        };

	}
})();