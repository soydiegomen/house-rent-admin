( function() {
	'use strict';

	angular.module('chaiApp.generalForm').controller('GeneralFormCtrl', GeneralFormCtrl);

	/**@ngInject*/
	function GeneralFormCtrl(){
		var homeCtrl = this;

		//Initialize controller
		activate();

		function activate(){
			console.log('Activated GeneralFormCtrl');	
		}
	}
})();