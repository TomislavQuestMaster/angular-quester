'use strict';

describe('Service: MakerState', function () {

	// load the service's module
	beforeEach(module('untitledApp'));

	// instantiate service
	var MakerState;
	beforeEach(inject(function (_MakerState_) {
		MakerState = _MakerState_;
	}));

	it('should relay data depending on a currently selected tool', function () {
		var tool = {
			name: 'mock tool',
			canSelectMarker: true,
			canAddMarker: true,
			canRemoveMarker: false,
			canAddPath: true
		};

		expect(typeof MakerState.canAddMarker).toBe("function");
		MakerState.setCurrentTool(tool);

		expect(MakerState.canAddMarker()).toBe(tool.canAddMarker);
		expect(MakerState.canSelectMarker()).toBe(tool.canSelectMarker);
		expect(MakerState.canRemoveMarker()).toBe(tool.canRemoveMarker);
		expect(MakerState.canAddPath()).toBe(tool.canAddPath);
	});

});
