( function() {
	'use strict';

	angular.module('chaiApp.photosForm').controller('PhotosFormCtrl', PhotosFormCtrl);

	PhotosFormCtrl.$inject = ['$location','dataservice', 'houseStorageService', '$scope', 'FileUploader', 
		'appConfig', 'utilityService'];

	/**@ngInject*/
	function PhotosFormCtrl($location, dataservice, houseStorageService, $scope, FileUploader, 
		appConfig, utilityService){
		var homeCtrl = this;
		var currentMode = 'insert';

		//Properties
		homeCtrl.files = [];
		homeCtrl.myFile = null;
		homeCtrl.errorMessage = '';

		//Events
		homeCtrl.clickBack = clickBack;
		homeCtrl.saveHouse = saveHouse;
		homeCtrl.deleteFile = deleteFile;
		
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

			//Show images saved in local storage
			showLocalStorageImages();
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

		function deleteFile(itemToRemove){
			if(homeCtrl.files.length > itemToRemove){
				homeCtrl.files.splice(itemToRemove, 1);
			}
		}

		/*
		*Helpers
		*/
		function showLocalStorageImages(){
			var filesArray = houseStorageService.getHouseFiles();
			
			if(filesArray && filesArray.length > 0){

				var fileServiceUrl = utilityService.getFilesSite();

				angular.forEach(filesArray, function(value, key){
					value.finalUrl = fileServiceUrl + value.fileUrl;
				});

				homeCtrl.files = filesArray;
			}
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
				var houseFiles = homeCtrl.files;
				//If there are files must save it
				if(houseFiles.length > 0){
					saveHouseFiles(houseId, doAfterSave, houseFiles);
				}else{
					doAfterSave();
				}
			});
		}

		function updateHouse(houseData){
			var houseFiles = homeCtrl.files;
			var arrayFiles = getFilesForSave(houseFiles);
			houseData.files = arrayFiles;
			console.log('house model', houseData);
			dataservice.updateHouse(houseData).then(function(data){

				//If some error happend show the error and cancel the process 
				if(data.errors){
					homeCtrl.errorMessage = JSON.stringify(data);
					return;
				}else if(homeCtrl.errorMessage.length > 0){
					//Clear error message
					homeCtrl.errorMessage = '';
					return;
				}

				doAfterSave();
				/*
				var houseId = data._id;
				
				//If there are files must save it
				if(houseFiles.length > 0){
					updateHouseFiles(houseId, doAfterSave, houseFiles);
				}else{
					doAfterSave();
				}*/
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

		/*
		*Save files of house
		*/
		function saveHouseFiles(houseId, callback, houseFiles){
			var filesArray = [];
			angular.forEach(houseFiles, function(value, key){
				filesArray.push(value._id);
		    });

		    var jsonFiles = {
		    	houseId: houseId,
		    	files: filesArray
		    };

			dataservice.saveHouseFile(jsonFiles)
			.then(callback);
		}

		/*
		*Update files of house
		*/
		function updateHouseFiles(houseId, callback, houseFiles){
			var filesArray = [];
			angular.forEach(houseFiles, function(value, key){
				filesArray.push(value._id);
		    });

		    var jsonFiles = {
		    	files: filesArray
		    };

			dataservice.updateFilesOfHouse(houseId, jsonFiles)
			.then(callback);
		}

		function getFilesForSave(houseFiles){
			var filesArray = [];
			angular.forEach(houseFiles, function(value, key){
				filesArray.push(value._id);
		    });

		    return filesArray;
		}

		// CALLBACKS
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            var fileServiceUrl = utilityService.getFilesSite();
            //Build url of image using the cdn path plus image relative path
            response.finalUrl = fileServiceUrl + response.fileUrl;

            homeCtrl.files.push(response);
            //Actualizar el arreglo de archivos en el local storage
            houseStorageService.setHouseFiles(homeCtrl.files);
            //Clear input file, for upload new files
            document.getElementById('userPhoto').value = null;
        };

	}
})();