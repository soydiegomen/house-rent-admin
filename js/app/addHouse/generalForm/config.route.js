(function () {
	'use strict';
	angular.module('chaiApp.generalForm').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/generalForm',
				config: {
					templateUrl: 'js/app/addHouse/generalForm/general-form.html',
			        controller: 'GeneralFormCtrl',
			        controllerAs: 'generalFormCtrl'
				}
			}
		];
	}

})();