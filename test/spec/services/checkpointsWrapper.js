'use strict';

describe('Service: CheckpointsWrapper', function () {

	// load the service's module
	beforeEach(module('untitledApp'));

	// instantiate service
	var CheckpointsWrapper;
	beforeEach(inject(function (_CheckpointsWrapper_) {
		CheckpointsWrapper = _CheckpointsWrapper_;
	}));

	it('should expose checkpoints array', function () {
		expect(CheckpointsWrapper.getCheckpoints()).toBeDefined();
		expect(CheckpointsWrapper.addCheckpoint).toBeDefined();
		expect(CheckpointsWrapper.removeCheckpoint).toBeDefined();
		expect(CheckpointsWrapper.numberOfCheckpoints()).toBe(0);
	});

	it('should enable addition and deletion of checkpoints', function () {
		var checkpoints, actual;
		var partialCheckpoint = {
			latitude: 10,
			longitude: 15
		};
		var expected = {
			latitude: 10,
			longitude: 15,
			title: '',
			description: '',
			id: 0
		};

		CheckpointsWrapper.addCheckpoint(partialCheckpoint);
		checkpoints = CheckpointsWrapper.getCheckpoints();
		expect(checkpoints.length).toBe(1);

		actual = checkpoints[0];
		expect(actual).toEqual(expected);

		actual = CheckpointsWrapper.getLastCheckpoint();
		expect(actual).toBe(checkpoints[0]);

		actual =  CheckpointsWrapper.removeCheckpoint(actual);
		expect(checkpoints.length).toBe(0);
		expect(actual).toEqual(expected);

	});

});
