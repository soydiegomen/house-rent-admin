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
		generalCtrl.clickBedrooms = clickBedrooms;
		generalCtrl.clickBathrooms = clickBathrooms;
		generalCtrl.clickParking = clickParking;

		//model
		generalCtrl.generalData = { 
			propertyType: '', 
			operationType: '', 
			noBedrooms: 1, 
			noBathrooms: 0, 
			noParking: 0,
			services: []
		};

		//Servicios
		generalCtrl.availableServ = [
				{ service: 'Internet', label: 'Internet', isSelected: false},
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
			var savedGeneralData = houseStorageService.getGeneralData();
			//Si  hay información guardada en el localstorage la mostramos
			if(savedGeneralData){
				generalCtrl.generalData = savedGeneralData;	
				selectServices(savedGeneralData.services);
			}
		}

		//Events
		function clickNext($event){
			$event.preventDefault();
			//Validate data before change to the next step	
			var selectedServices = getSelectedServices();
			generalCtrl.generalData.services = selectedServices;

			houseStorageService.setGeneralData(generalCtrl.generalData);
			$location.path('/details-form');
		}

		function clickBack($event){
			$event.preventDefault();
			$location.path('/contact-form');
		}

		function clickBedrooms($event, action){
			if (action === 'add'){
				generalCtrl.generalData.noBedrooms++;
			}else if(generalCtrl.generalData.noBedrooms > 0){
				generalCtrl.generalData.noBedrooms--;
			}
		}

		function clickBathrooms($event, action){
			if (action === 'add'){
				generalCtrl.generalData.noBathrooms++;
			}else if(generalCtrl.generalData.noBathrooms > 0){
				generalCtrl.generalData.noBathrooms--;
			}
		}

		function clickParking($event, action){
			if (action === 'add'){
				generalCtrl.generalData.noParking++;
			}else if(generalCtrl.generalData.noParking > 0){
				generalCtrl.generalData.noParking--;
			}
		}

		//Helpers
		function getSelectedServices(){
			var selectedServices = [];
			angular.forEach(generalCtrl.availableServ, function(value, key){
		    	if(value.isSelected){
		    		selectedServices.push(value);
		    		
		    	}
			});

			return selectedServices;
		}

		function selectServices(selectedServices){
			//Active selected services. Must iterate the seved serices and then update the services array with
			//the selected services
			angular.forEach(selectedServices, function(firstValue, firstKey){
				angular.forEach(generalCtrl.availableServ, function(secondValue, secondKey){
			    	if(firstValue.service === secondValue.service){
			    		secondValue.isSelected = true;
			    	}
		    	});
			});
		}
		
	}
})();