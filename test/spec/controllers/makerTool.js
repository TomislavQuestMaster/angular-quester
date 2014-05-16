'use strict';

describe('Controller: MakerToolCtrl', function () {

	// load the controller's module
	beforeEach(module('untitledApp'));

	var MakerToolCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		MakerToolCtrl = $controller('MakerToolCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of tools to the scope', function () {
			expect(scope.tools.length).toBeGreaterThan(0);

			for (var i = 0; i < scope.tools.length; ++i) {
				expect(scope.tools[i].hasOwnProperty('name')).toBeTruthy();
				expect(scope.tools[i].hasOwnProperty('icon')).toBeTruthy();
				expect(scope.tools[i].hasOwnProperty('hoverText')).toBeTruthy();
			}
		}
	);

	it('should attach 1st tool to scope as currentTool', function () {
			expect(scope.currentTool).toBe(scope.tools[0]);
		}
	);

	it('should switch current tool when other tool is selected', function() {
			expect(scope.currentTool).toBe(scope.tools[0]);
			scope.selectTool(scope.tools[3]);
			expect(scope.currentTool).toBe(scope.tools[3]);
		}
	);

});
