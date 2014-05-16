'use strict';

angular
	.module('untitledApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ui.bootstrap',
		'google-maps'
	]
)
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			}
		)
			.when('/maker', {
				templateUrl: 'views/maker.html',
				controller: 'MakerCtrl'
			}
		)
			.otherwise({
				redirectTo: '/'
			}
		);
	}
);
