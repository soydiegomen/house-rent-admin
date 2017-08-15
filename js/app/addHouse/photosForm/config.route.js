(function () {
	'use strict';
	angular.module('chaiApp.photosForm').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/photos-form/:id?',
				config: {
					templateUrl: 'js/app/addHouse/photosForm/photos-form.html',
			        controller: 'PhotosFormCtrl',
			        controllerAs: 'photosFormCtrl'
				}
			}
		];
	}

})();