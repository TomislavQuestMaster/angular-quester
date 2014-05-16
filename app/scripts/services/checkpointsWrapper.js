'use strict';

angular.module('untitledApp')
	.service('CheckpointsWrapper', [
		'Checkpoint',
		function CheckpointsWrapper(Checkpoint) {

			var checkpoints = [];

			this.getCheckpoints = function () {
				return checkpoints;
			};

			this.numberOfCheckpoints = function () {
				return checkpoints.length;
			};

			this.getLastCheckpoint = function () {
				return checkpoints[checkpoints.length - 1];
			};

			this.addCheckpoint = function (checkpointData) {
				//asks Checkpoint for valid model constructed from partial checkpoint data
				checkpoints.push(Checkpoint.formPartialData(checkpointData));

				//enables chaining:
				return this;
			};

			this.removeCheckpoint = function (checkpoint) {
				var index = checkpoints.indexOf(checkpoint);
				//check if checkpoint is present in checkpoints array:
				if (index > -1) {
					//returns the deleted checkpoint
					return checkpoints.splice(index, 1)[0];
				}
			};

		}]);
