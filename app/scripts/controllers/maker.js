'use strict';

angular.module('untitledApp')
	.controller('MakerCtrl', [
		'$scope',
		'CheckpointsWrapper',
		'MakerState',
		'UndoService',
		function ($scope, CheckpointsWrapper, MakerState, UndoService) {
			$scope.map = {
				center: {
					latitude: 45,
					longitude: -73
				},
				zoom: 8
			};

			$scope.checkpoints = CheckpointsWrapper.getCheckpoints();
			$scope.currentCheckpoint = $scope.checkpoints[0];

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
			};

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
							.undoWithActionAs(CheckpointsWrapper.undoAddCheckpoint, CheckpointsWrapper)
							.withActionResultAsArgument();

						$scope.$apply();
					}
				}
			};

		}]
);
