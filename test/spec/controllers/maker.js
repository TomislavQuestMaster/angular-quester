'use strict';

describe('Controller: MakerCtrl', function () {

		// load the controller's module
		beforeEach(module('untitledApp'));

		var MakerCtrl, scope;

		// Initialize the controller and a mock scope
		beforeEach(inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			MakerCtrl = $controller('MakerCtrl', {
					$scope: scope
				}
			);
		}));


	}
);
