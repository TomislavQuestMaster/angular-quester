'use strict';

describe('Service: ConnectionsWrapper', function () {

	// load the service's module
	beforeEach(module('untitledApp'));

	// instantiate service
	var ConnectionsWrapper, Checkpoint;
	var checkpoint1, checkpoint2, checkpoint3;
	beforeEach(inject(function (_ConnectionsWrapper_, _Checkpoint_) {
		ConnectionsWrapper = _ConnectionsWrapper_;
		Checkpoint = _Checkpoint_;

		checkpoint1 = new Checkpoint();
		checkpoint2 = new Checkpoint();
		checkpoint3 = new Checkpoint();
	}));

	it('should enable addition and deletion of connections', function () {

		expect(ConnectionsWrapper.getConnections().length).toEqual(0);

		ConnectionsWrapper.addConnection(checkpoint1, checkpoint2);
		ConnectionsWrapper.addConnection(checkpoint1, checkpoint3);
		expect(ConnectionsWrapper.getConnections().length).toEqual(2);

		var connection = ConnectionsWrapper.getConnections()[0];
		ConnectionsWrapper.removeConnection(connection);
		expect(ConnectionsWrapper.getConnections().length).toEqual(1);

		ConnectionsWrapper.addConnection(checkpoint1, checkpoint3);
		expect(ConnectionsWrapper.getConnections().length).toEqual(1);

	});

	it('should remove all connections containing given checkpoint', function () {

		ConnectionsWrapper.addConnection(checkpoint1, checkpoint2);
		ConnectionsWrapper.addConnection(checkpoint1, checkpoint3);
		ConnectionsWrapper.addConnection(checkpoint2, checkpoint1);
		ConnectionsWrapper.addConnection(checkpoint3, checkpoint1);
		ConnectionsWrapper.addConnection(checkpoint1, checkpoint1);

		ConnectionsWrapper.addConnection(checkpoint2, checkpoint3);

		ConnectionsWrapper.clearConnectionsFor(checkpoint1);
		expect(ConnectionsWrapper.getConnections().length).toEqual(1);

	});

});
