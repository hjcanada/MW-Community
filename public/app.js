'use strict';

angular.module('mwCommunity', [
		'ngRoute',
		'ngCookies',
		'mwCommunity.home',
		'mwCommunity.login',
		'mwCommunity.signup',
		'mwCommunity.profile',
		'mwCommunity.about',
		'mwCommunity.channel',
		'mwCommunity.download'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('')
		$routeProvider
		.otherwise ({
			redirectTo: '/home'
		})
}])

.run(['$rootScope', '$cookies', function($rootScope, $cookies) {
        if ($cookies.get('token') && $cookies.get('currentUser')) {
                $rootScope.token = $cookies.get('token');
                $rootScope.currentUser = JSON.parse($cookies.get('currentUser'));
        }
}])

.controller('mwCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
}])
