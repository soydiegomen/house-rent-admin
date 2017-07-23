(function () {
	'use strict';
	angular.module('chaiApp.contactForm').run(appRun);

	function appRun(routehelper){
		routehelper.configureRoutes(getRoutes());
	}
	function getRoutes() {
		return [
			{
				url: '/contactForm',
				config: {
					templateUrl: 'js/app/addHouse/contactForm/contact-form.html',
			        controller: 'ContactFormCtrl',
			        controllerAs: 'contactFormCtrl'
				}
			}
		];
	}

})();