'use strict';

describe('Service: UndoService', function () {

	// load the service's module
	beforeEach(module('untitledApp'));

	// instantiate service
	var UndoService;
	beforeEach(inject(function (_UndoService_) {
		UndoService = _UndoService_;
	}));

	it('should register, execute and undo simple fluent built action', function () {

		var actual = false;
		var affirmative = function (arg) {
			actual = arg;
		};
		var negative = function (arg) {
			actual = arg;
		};

		UndoService.performUserAction(affirmative)
			.withArguments(true)
			.undoWithAction(negative)
			.withArguments(false);
		expect(actual).toBeTruthy();

		UndoService.undo();
		expect(actual).toBeFalsy();

	});

	it('should register, execute and undo complex fluent built action using', function () {

		var actual = {
			value: 'banana'
		};
		var affirmative = function (arg1, arg2) {
			this.value += ' ' + arg1 + ' with ' + arg2;
			return 'fruit ';
		};
		var negative = function (arg) {
			this.value = arg + 'salad';
		};

		UndoService.performUserActionAs(affirmative, actual)
			.withArguments('shake', 'an umbrella')
			.undoWithActionAs(negative, actual)
			.withActionResultAsArgument();
		expect(actual.value).toEqual('banana shake with an umbrella');

		UndoService.undo();
		expect(actual.value).toEqual('fruit salad');

	});

	it('should redo an action', function () {

		var actual = 'Hello World';
		var clearText = function () {
			var old = actual;
			actual = '';
			return old;
		};
		var setText = function (string) {
			return actual = string;
		};

		UndoService.performUserAction(clearText)
			.withoutArguments()
			.undoWithAction(setText)
			.withActionResultAsArgument();
		expect(actual).toEqual('');

		UndoService.undo();
		expect(actual).toEqual('Hello World');

		UndoService.redo();
		expect(actual).toEqual('');
	});

	it('should handle undoStack and current action', function () {

		var actual = [];
		var add = function (element) {
			actual.push(element);
		};
		var remove = function (element) {
			var index = actual.indexOf(element);
			if (index > -1) {
				actual.splice(index, 1);
			}
		};

		expect(UndoService.canUndo()).toBeFalsy();
		expect(UndoService.canRedo()).toBeFalsy();

		UndoService.performUserAction(add)
			.withArguments('1st')
			.undoWithAction(remove)
			.withArguments('1st');
		expect(UndoService.canUndo()).toBeTruthy();
		expect(UndoService.canRedo()).toBeFalsy();
		expect(actual.length).toEqual(1);

		UndoService.performUserAction(add)
			.withArguments('2nd')
			.undoWithAction(remove)
			.withArguments('2nd');
		expect(UndoService.canUndo()).toBeTruthy();
		expect(UndoService.canRedo()).toBeFalsy();
		expect(actual.length).toEqual(2);

		UndoService.undo();
		expect(UndoService.canUndo()).toBeTruthy();
		expect(UndoService.canRedo()).toBeTruthy();
		expect(actual.length).toEqual(1);

		UndoService.redo();
		expect(UndoService.canUndo()).toBeTruthy();
		expect(UndoService.canRedo()).toBeFalsy();
		expect(actual.length).toEqual(2);

		UndoService.undo();
		expect(UndoService.canUndo()).toBeTruthy();
		expect(UndoService.canRedo()).toBeTruthy();
		expect(actual.length).toEqual(1);

		UndoService.undo();
		expect(UndoService.canUndo()).toBeFalsy();
		expect(UndoService.canRedo()).toBeTruthy();
		expect(actual.length).toEqual(0);

		UndoService.performUserAction(add)
			.withArguments('3rd')
			.undoWithAction(remove)
			.withArguments('3rd');
		expect(UndoService.canUndo()).toBeTruthy();
		expect(UndoService.canRedo()).toBeFalsy();
		expect(actual.length).toEqual(1);

	});
});
