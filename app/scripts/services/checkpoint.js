'use strict';

angular.module('untitledApp')
	.factory('Checkpoint', function () {

		//constructor function:
		var Checkpoint = function () {

			//local properties:
			this.latitude = 0;
			this.longitude = 0;

			this.title = '';
			this.description = '';

		};

		//"instance" methods
		//can use this
		Checkpoint.prototype = {
			coordinates: function (lat, lng) {
				if (!isNaN(lat) && !isNaN(lng)) {
					//acting like a setter:
					this.latitude = lat;
					this.longitude = lng;

					//enables chaining:
					return this;
				} else {
					//acting like a getter:
					return  {
						latitude: this.latitude,
						longitude: this.longitude
					};
				}
			},

			setTitle: function (title) {
				if (typeof title === 'string') {
					this.title = title;

					//enables chaining:
					return this;
				}
			}
		};

		//"static" methods
		//don't have access to this
		Checkpoint.fromCoordinates = function (lat, lng) {
			var checkpoint = new Checkpoint();
			checkpoint.coordinates(lat, lng);

			return checkpoint;
		};

		Checkpoint.formPartialData = function (partialData) {
			var checkpoint = new Checkpoint();

			for (var property in checkpoint) {
				//copy non-null property of the partial to corresponding property of checkpoint
				if (checkpoint.hasOwnProperty(property) &&
					partialData.hasOwnProperty(property) &&
					partialData[property] != null) {
					checkpoint[property] = angular.copy(partialData[property]);
				}
			}

			return checkpoint;
		};

		return ( Checkpoint );

	}
);
