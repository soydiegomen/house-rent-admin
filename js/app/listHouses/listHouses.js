( function() {
	'use strict';

	angular.module('chaiApp.listHouses').controller('ListHousesCtrl', ListHousesCtrl);

	ListHousesCtrl.$inject = ['dataservice'];

	/**@ngInject*/
	function ListHousesCtrl(dataservice){
		var listCtrl = this;

		//Properties
		listCtrl.houses = null;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated ListHousesCtrl');	
			fillHouseList();
		}

		function fillHouseList(){
			dataservice.getHouseByStatus('Publicado')
			.then(function(data){
				listCtrl.houses = data;
			});
		}
	}
})();