(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('utilityService', utilityService);

	utilityService.$inject = ['$location','$routeParams', 'appConfig'];

	function utilityService($location, $routeParams, appConfig){
		var service = {
			navigateToNextStep: navigateToNextStep,
			getFilesSite: getFilesSite
		};

		return service;

		function navigateToNextStep(nextRoute){
			var houseId = $routeParams.id;
			if( houseId ){
				//For edit mode must send the id to the next view
				nextRoute = nextRoute + houseId;
			}
			$location.path( nextRoute );
		}

		function getFilesSite(){
			return appConfig.filesSite;
		}
	}
})();