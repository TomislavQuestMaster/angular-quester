'use strict';

angular.module('untitledApp')
	.service('ConnectionsWrapper',
	function ConnectionsWrapper() {

		//each connection is array of length 2
		//connection[0] is starting point aka parent
		//connection[1] is ending point aka child
		//hence, connections array below is an array of 2-dim arrays
		var connections = [];

		var indexOfConnection = function (connection) {
			for (var index = 0; index < connections.length; ++index) {
				//connections are the same if their starting and ending points correspond,
				//where equality is determined by the .equals method!
				if (connections[index][0].equals(connection[0])
					&& connections[index][1].equals(connection[1])) {
					return index;
				}
			}
			return -1;
		};

		this.getConnections = function () {
			return connections;
		};

		this.addConnection = function (startingCheckpoint, endingCheckpoint) {
			var connection = [
				startingCheckpoint,
				endingCheckpoint
			];
			if (indexOfConnection(connection) < 0) {
				//add only if not already present:
				connections.push(connection);
			}
			//enable chaining:
			return this;
		};

		this.removeConnection = function (connection) {
			var index = indexOfConnection(connection);
			if (index > -1) {
				//returns the deleted checkpoint:
				return connections.splice(index, 1)[0];
			}
		};

		this.clearConnectionsFor = function (checkpoint) {
			for (var index = connections.length - 1; index > -1; --index) {
				//check if connection has checkpoint as either start or end
				if (connections[index][0].equals(checkpoint)
					|| connections[index][1].equals(checkpoint)) {
					connections.splice(index, 1);
				}
			}
		};

	}
);
