( function() {
	'use strict';

	angular.module('chaiApp.generalForm').controller('GeneralFormCtrl', GeneralFormCtrl);

	GeneralFormCtrl.$inject = ['localStorageService', '$location', 'houseStorageService'];

	/**@ngInject*/
	function GeneralFormCtrl(localStorageService, $location, houseStorageService){
		var generalCtrl = this;

		//Events
		generalCtrl.clickNext = clickNext;
		generalCtrl.clickBack = clickBack;

		//model
		generalCtrl.generalData = { 
			propertyType: '', 
			operationType: '', 
			noBedrooms: '1', 
			noBathrooms: '0', 
			noParking: '0',
			services: []
		};

		//Servicios
		generalCtrl.availableServ = [
				{ service: 'Internet', label: 'Internet', isSelected: true},
				{ service: 'Telefono', label: 'Línea telefónica', isSelected: false},
				{ service: 'Cocina', label: 'Cocina', isSelected: false},
				{ service: 'Jardin', label: 'Jardin', isSelected: false},
				{ service: 'Mascotas', label: 'Admite mascotas', isSelected: false},
				{ service: 'SeguridadPrivada', label: 'Seguridad privada', isSelected: false}
			];

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated GeneralFormCtrl');	
			var savedContData = houseStorageService.getContactData();
			console.log('general-form', savedContData);
		}

		function clickNext($event){
			$event.preventDefault();
			//Validate data before change to the next step	
			console.log(generalCtrl.availableServ);
			//$location.path('/details-form');
		}

		function clickBack($event){
			$event.preventDefault();
			$location.path('/contact-form');
		}
	}
})();