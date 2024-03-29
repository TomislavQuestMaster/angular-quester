'use strict';

angular.module('untitledApp')
	.controller('MakerCtrl', [
		'$scope',
		'CheckpointsWrapper',
		'ConnectionsWrapper',
		'MakerState',
		'UndoService',
		function ($scope, CheckpointsWrapper, ConnectionsWrapper, MakerState, UndoService) {
			$scope.map = {
				center: {
					latitude: 45,
					longitude: -73
				},
				zoom: 8
			};

			$scope.checkpoints = CheckpointsWrapper.getCheckpoints();
			$scope.currentCheckpoint = $scope.checkpoints[0];

			$scope.connections = ConnectionsWrapper.getConnections();

			//called on marker click
			$scope.selectCheckpoint = function (checkpoint) {
				if (MakerState.canSelectMarker()) {
					//selecting a checkpoint:
					$scope.currentCheckpoint = checkpoint;
				}
				if (MakerState.canRemoveMarker()) {
					//deleting a checkpoint:
					UndoService.performUserAction(CheckpointsWrapper.removeCheckpoint)
						.withArguments(checkpoint)
						.undoWithAction(CheckpointsWrapper.addCheckpoint)
						.withArguments(checkpoint);
					$scope.currentCheckpoint = null;
				}
				if (MakerState.canAddPath(checkpoint)) {
					if ($scope.currentCheckpoint == null) {
						//selecting first checkpoint, then waiting for another to be selected
						$scope.currentCheckpoint = checkpoint;
					} else {
						//one checkpoint is already selected, this is another -> adding connection
						ConnectionsWrapper.addConnection($scope.currentCheckpoint, checkpoint);
						$scope.currentCheckpoint = null;
					}
				}
			};

			//events for whole google map
			$scope.mapEvents = {
				click: function (mapModel, eventName, originalEventArgs) {
					if (MakerState.canAddMarker()) {
						var partialCheckpoint = {
							latitude: originalEventArgs[0].latLng.lat(),
							longitude: originalEventArgs[0].latLng.lng()
						};

						$scope.currentCheckpoint = UndoService.performUserAction(function (arg) {
							return CheckpointsWrapper.addCheckpoint(arg).getLastCheckpoint();
						})
							.withArguments(partialCheckpoint)
							.undoWithActionAs(CheckpointsWrapper.undoAddCheckpoint,
							CheckpointsWrapper)
							.withActionResultAsArgument();

						$scope.$apply();
					}
				}
			};

			//watch for change of current tool and deselect marker when it happens!
			$scope.$watch(MakerState.getCurrentToolName, function(newValue, oldValue) {
				if (newValue && newValue != oldValue) {
					$scope.currentCheckpoint = null;
				}
			});

		}]
);
