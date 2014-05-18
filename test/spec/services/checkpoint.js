'use strict';

describe('Service: Checkpoint', function () {

		// load the service's module
		beforeEach(module('untitledApp'));

		// instantiate service
		var Checkpoint;
		beforeEach(inject(function (_Checkpoint_) {
			Checkpoint = _Checkpoint_;
		}));

		it('should be instantiatable', function () {
				var checkpoint = new Checkpoint();
				expect(checkpoint).toBeDefined();
			}
		);

		it('should expose equals method form comparison based on id property', function() {
			var checkpoint1 = new Checkpoint();
			checkpoint1.setTitle('1st');
			var checkpoint2 = new Checkpoint();
			checkpoint2.setTitle('2nd');

			expect(checkpoint1.equals(checkpoint2)).toBeFalsy();
			expect(checkpoint1.equals({id: checkpoint1.id})).toBeFalsy();
			checkpoint2.setTitle('1st');
			expect(checkpoint1.equals(checkpoint2)).toBeFalsy();

			expect(checkpoint1.equals(checkpoint1)).toBeTruthy();
			var checkpoint3 = new Checkpoint();
			checkpoint3.id = checkpoint1.id;
			checkpoint3.setTitle('1st');
			expect(checkpoint1.equals(checkpoint3)).toBeTruthy();
			checkpoint3.setTitle('3rd');
			expect(checkpoint1.equals(checkpoint3)).toBeTruthy();
		});

		it('should expose coordinates', function () {
				var checkpoint1 = new Checkpoint();

				var coordinates = checkpoint1.coordinates();
				expect(coordinates).toBeDefined();
				expect(coordinates.latitude).toBe(0);
				expect(coordinates.longitude).toBe(0);

				coordinates = checkpoint1.coordinates(10, 15).coordinates();
				expect(coordinates.latitude).toBe(10);
				expect(coordinates.longitude).toBe(15);

				var checkpoint2 = Checkpoint.fromCoordinates(2, 3);
				expect(checkpoint2).toBeDefined();

				coordinates = checkpoint2.coordinates();
				expect(coordinates.latitude).toBe(2);
				expect(coordinates.longitude).toBe(3);
			}
		);

		it('should construct checkpoint from partial data', function () {
			var partial = {
				title: 'actual',
				description: 'described',
				dummyProperty: 3.14159
			};

			var actual = Checkpoint.formPartialData(partial);

			expect(actual).toBeDefined();
			expect(actual.title).toBe(partial.title);
			expect(actual.description).toBe(partial.description);
			expect(actual.coordinates()).toEqual(
				{
					latitude: 0,
					longitude: 0
				});
			expect(actual.dummyProperty).toBeUndefined();

		});

	}
);
