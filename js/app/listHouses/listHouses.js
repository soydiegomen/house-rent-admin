( function() {
	'use strict';

	angular.module('chaiApp.listHouses').controller('ListHousesCtrl', ListHousesCtrl);

	ListHousesCtrl.$inject = ['dataservice', 'houseStorageService'];

	/**@ngInject*/
	function ListHousesCtrl(dataservice, houseStorageService){
		var listCtrl = this;

		//Properties
		listCtrl.houses = null;
		listCtrl.currentStatus = null;
		listCtrl.getListByStatus = getListByStatus;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated ListHousesCtrl');	
			fillHouseList();
			//Clear local storage data. Avoid when navigate to the house form, show information loaded in other time
			houseStorageService.clear();
		}

		function fillHouseList(){
			//Publicado is the default status
			getListByStatus('Publicado');
		}

		//Events
		function getListByStatus(status){
			listCtrl.currentStatus = status;
			dataservice.getHouseByStatus(status)
			.then(function(data){
				listCtrl.houses = data;
			});
		}
	}
})();