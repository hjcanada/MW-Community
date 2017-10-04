'use strict';

angular.module('mwCommunity.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/home', {
		controller: 'homeCtrl',
		templateUrl: 'home/home.html'
	})
}])

.controller('homeCtrl', ['$scope', function($scope) {

}])
