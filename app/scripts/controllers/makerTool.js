'use strict';

angular.module('untitledApp')
	.controller('MakerToolCtrl', [
		'$scope',
		'MakerState',
		'UndoService',
		function ($scope, MakerState, UndoService) {

			$scope.tools = [
				{
					name: 'select',
					icon: 'glyphicon-hand-up',
					hoverText: 'Select',
					canSelectMarker: true,
					canAddMarker: false,
					canRemoveMarker: false,
					canAddPath: false
				},
				{
					name: 'checkpoint',
					icon: 'glyphicon-pushpin',
					hoverText: 'Add checkpoint',
					canSelectMarker: true,
					canAddMarker: true,
					canRemoveMarker: false,
					canAddPath: false

				},
				{
					name: 'path',
					icon: 'glyphicon-road',
					hoverText: 'Add path',
					canSelectMarker: false,
					canAddMarker: false,
					canRemoveMarker: false,
					canAddPath: true

				},
				{
					name: 'delete',
					icon: 'glyphicon-remove',
					hoverText: 'Delete checkpoint or path',
					canSelectMarker: false,
					canAddMarker: false,
					canRemoveMarker: true,
					canAddPath: false
				},
				{
					name: 'undo',
					icon: 'glyphicon-chevron-left',
					hoverText: 'Undo last action',
					canSelectMarker: false,
					canAddMarker: false,
					canRemoveMarker: false,
					canAddPath: false
				},
				{
					name: 'redo',
					icon: 'glyphicon-chevron-right',
					hoverText: 'Redo next action',
					canSelectMarker: false,
					canAddMarker: false,
					canRemoveMarker: false,
					canAddPath: false
				},
				{
					name: 'upload',
					icon: 'glyphicon-floppy-open',
					hoverText: 'Upload quest',
					canSelectMarker: false,
					canAddMarker: false,
					canRemoveMarker: false,
					canAddPath: false

				}
			];

			$scope.currentTool = $scope.tools[0];
			MakerState.setCurrentTool(angular.copy($scope.currentTool));

			$scope.selectTool = function (tool) {
				$scope.currentTool = tool;
				MakerState.setCurrentTool(angular.copy(tool));

				if (tool.name == 'undo') {
					UndoService.undo();
				}

				if (tool.name == 'redo') {
					UndoService.redo();
				}
			};

		}]);
