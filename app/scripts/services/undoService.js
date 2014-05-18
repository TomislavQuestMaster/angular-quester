'use strict';

angular.module('untitledApp')
	.service('UndoService', function UndoService() {

		var undoStack = [];
		var current = -1;
		var response;

		this.canUndo = function () {
			return (current > -1);
		};

		this.undo = function () {
			if (this.canUndo()) {
				var desc = undoStack[current];
				current--;
				return desc.undoAction[desc.undoArgs ? 'apply' : 'call'](desc.undoContext,
					desc.undoArgs);
			}
		};

		this.canRedo = function () {
			return (current <= undoStack.length - 2);
		};

		this.redo = function () {
			if (this.canRedo()) {
				current++;
				var desc = undoStack[current];
				var response = desc.action[desc.args ? 'apply' : 'call'](desc.context, desc.args);
				if (desc.actionResultAsArgument) {
					desc.undoArgs = [response];
				}
				return response;
			}
		};

		//undo description builder:

		/**
		 * @param action
		 * @returns {{withArguments: withArguments, withoutArguments: withoutArguments}}
		 */
		this.performUserAction = function (action) {
			if (typeof action === 'function') {
				return argumentsConfigurator(action, null);
			}
		};

		/**
		 * @param action
		 * @param context
		 * @returns {{withArguments: withArguments, withoutArguments: withoutArguments}}
		 */
		this.performUserActionAs = function (action, context) {
			if (typeof action === 'function') {
				return argumentsConfigurator(action, context);
			}
		};

		/**
		 * @param action
		 * @param context
		 * @returns {{withArguments: withArguments, withoutArguments: withoutArguments}}
		 */
		var argumentsConfigurator = function (action, context) {
			return {
				/**
				 * @returns {{undoWithAction: undoWithAction, undoWithActionAs: undoWithActionAs}}
				 */
				withArguments: function () {

					response = action.apply(context, arguments);

					return undoActionConfigurator(action, context, arguments, response);
				},
				/**
				 * @returns {{undoWithAction: undoWithAction, undoWithActionAs: undoWithActionAs}}
				 */
				withoutArguments: function () {
					response = action.call(context, null);
					return undoActionConfigurator(action, context, null, response);
				}
			};
		};

		/**
		 * @param action
		 * @param context
		 * @param args
		 * @param response
		 * @returns {{undoWithAction: undoWithAction, undoWithActionAs: undoWithActionAs}}
		 */
		var undoActionConfigurator = function (action, context, args, response) {
			return {
				/**
				 * @param undoAction
				 * @returns {{withArguments: withArguments, withoutArguments: withoutArguments}}
				 */
				undoWithAction: function (undoAction) {
					if (typeof undoAction === 'function') {
						return undoActionArgumentConfigurator(action, context, args, response,
							undoAction, null);
					}
				},
				/**
				 * @param undoAction
				 * @param undoContext
				 * @returns {{withArguments: withArguments, withoutArguments: withoutArguments}}
				 */
				undoWithActionAs: function (undoAction, undoContext) {
					if (typeof undoAction === 'function') {
						return undoActionArgumentConfigurator(action, context, args, response,
							undoAction, undoContext);
					}
				}
			};
		};

		/**
		 * @param action
		 * @param context
		 * @param args
		 * @param response
		 * @param undoAction
		 * @param undoContext
		 * @returns {{withArguments: withArguments, withoutArguments: withoutArguments}}
		 */
		var undoActionArgumentConfigurator = function (action, context, args, response, undoAction,
		                                               undoContext) {
			return {
				/**
				 * @returns {*}
				 */
				withArguments: function () {
					insertToUndoStack(action, context, args, response, undoAction,
						undoContext, arguments, false);

					return response;
				},
				/**
				 * @returns {*}
				 */
				withoutArguments: function () {
					insertToUndoStack(action, context, args, response, undoAction,
						undoContext, null, false);

					return response;
				},
				/**
				 * @returns {*}
				 */
				withActionResultAsArgument: function () {
					insertToUndoStack(action, context, args, response, undoAction,
						undoContext, [response], true);

					return response;
				}
			}

		};

		var insertToUndoStack = function (action, context, args, response, undoAction, undoContext,
		                                  undoArgs, actionResultAsArgument) {
			//remove redo part of the stack:
			undoStack.splice(current + 1, undoStack.length);

			undoStack.push({
				action: action,
				context: context,
				args: args,
				undoAction: undoAction,
				undoContext: undoContext,
				undoArgs: undoArgs,
				actionResultAsArgument: actionResultAsArgument
			});

			current++;
		};


	});
