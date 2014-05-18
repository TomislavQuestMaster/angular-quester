'use strict';

angular.module('untitledApp')
	.service('MakerState', function MakerState() {

		var currentTool = {};

		//currentTool functionality:
		this.setCurrentTool = function (tool) {
			currentTool = tool;
		};

		this.canAddMarker = function () {
			return currentTool.canAddMarker ? true : false;
		};

		this.canSelectMarker = function () {
			return currentTool.canSelectMarker ? true : false;
		};

		this.canAddPath = function () {
			return currentTool.canAddPath ? true : false;
		};

		this.canRemoveMarker = function () {
			return currentTool.canRemoveMarker ? true : false;
		};

		this.canAddPath = function() {
			return currentTool.canAddPath ? true : false;
		};

		this.getCurrentToolName = function() {
			return currentTool.name;
		};
	});