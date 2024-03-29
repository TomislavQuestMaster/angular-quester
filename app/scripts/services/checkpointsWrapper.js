'use strict';

angular.module('untitledApp')
	.service('CheckpointsWrapper', [
		'Checkpoint',
		'ConnectionsWrapper',
		function CheckpointsWrapper(Checkpoint, ConnectionsWrapper) {

			var checkpoints = [];
			var checkpointIdsStack = [];

			//searches for checkpoint in array based on checkpoint.equals method
			var indexOfCheckpoint = function (comparable) {
				for (var index = 0; index < checkpoints.length; ++index) {
					if (checkpoints[index].equals(comparable)) {
						return index;
					}
				}
				return -1;
			};

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
				if (checkpointData instanceof Checkpoint) {
					//add checkpointData into checkpoints array AS IS!
					checkpoints.push(checkpointData);
				} else {
					//asks Checkpoint for valid model constructed from partial checkpoint data
					var checkpoint = Checkpoint.formPartialData(checkpointData);
					var recycledId = checkpointIdsStack.pop();
					if (recycledId != undefined) {
						checkpoint.id = recycledId;
					}
					checkpoints.push(checkpoint);
				}

				//enables chaining:
				return this;
			};

			this.undoAddCheckpoint = function(checkpoint) {
				checkpointIdsStack.push(checkpoint.id);
				this.removeCheckpoint(checkpoint);
			};

			this.removeCheckpoint = function (checkpoint) {
				var index = indexOfCheckpoint(checkpoint);
				var removedCheckpoint;
				//check if checkpoint is present in checkpoints array:
				if (index > -1) {
					removedCheckpoint =  checkpoints.splice(index, 1)[0];
					//remove all connections of said checkpoint
					ConnectionsWrapper.clearConnectionsFor(removedCheckpoint);
					//return removed checkpoint
					return removedCheckpoint;
				}
			};

		}
	]);
