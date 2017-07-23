(function () {
	'use strict';
	angular.module('chaiApp.detailsForm').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/detailsForm',
				config: {
					templateUrl: 'js/app/addHouse/detailsForm/details-form.html',
			        controller: 'DetailsFormCtrl',
			        controllerAs: 'detailsFormCtrl'
				}
			}
		];
	}

})();