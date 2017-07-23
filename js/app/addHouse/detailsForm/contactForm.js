( function() {
	'use strict';

	angular.module('chaiApp.detailsForm').controller('DetailsFormCtrl', DetailsFormCtrl);

	/**@ngInject*/
	function DetailsFormCtrl(){
		var homeCtrl = this;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated DetailsFormCtrl');	
		}
	}
})();