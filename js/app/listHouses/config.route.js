(function () {
	'use strict';
	angular.module('chaiApp.listHouses').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/list-houses',
				config: {
					templateUrl: 'js/app/listHouses/list-houses.html',
			        controller: 'ListHousesCtrl',
			        controllerAs: 'listHousesCtrl'
				}
			}
		];
	}

})();