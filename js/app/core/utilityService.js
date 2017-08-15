(function () {
	'use strict';

	
	angular.module('chaiApp.core').factory('utilityService', utilityService);

	utilityService.$inject = ['$location','$routeParams'];

	function utilityService($location, $routeParams){
		var service = {
			navigateToNextStep : navigateToNextStep
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
	}
})();