'use strict';

/* defining the app */
var app = angular
	.module("demo", ['ngRoute', 'ngResource'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/markdown.html',
				controller: 'markdownCtrl'
			}).when('/markdowns/:id', {
				templateUrl: 'app/markdownDetail.html',
				controller: 'markdownCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	});