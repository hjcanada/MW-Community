'use strict';

angular.module('mwCommunity.login', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/login', {
		controller: 'loginCtrl',
		templateUrl: 'login/login.html'
	})
}])

.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$location', '$cookies', function($scope, $rootScope, $http, $location, $cookies) {
	
	$scope.login = function() {
		$http.put('/user/login', {username: $scope.username, password: $scope.password})
		.then(function(res) {

			$rootScope.token = res.data.token
			$rootScope.currentUser = {
					username: $scope.username,
					password: $scope.password,
					posts: res.data.posts,
					comments: res.data.comments,
					points: res.data.points,
					email: res.data.email,
					joinDate: res.data.joinDate,
					joinTime: res.data.joinTime,
					lastDate: res.data.lastDate,
					lastTime: res.data.lastTime
			}

                        $cookies.put('token', $rootScope.token);
                        $cookies.put('currentUser', JSON.stringify($rootScope.currentUser));

			$location.path('/home')
		}, function(err) {
			$scope.failTextAlert = 'Invalid username or password!'
			$scope.showFailAlert = true
			$scope.switchBool = function(value) {
				$scope[value] = !$scope[value]
			}

			$scope.username = ''
			$scope.password = ''
		})
	}

	$scope.logout = function() {
		
                $cookies.remove('token');
                $cookies.remove('currentUser');

		$scope.username = ''
		$scope.password = ''
		$rootScope.token = null
		$rootScope.currentUser = null
		$scope.showFailAlert = false

		$location.path('/login')
	}

}])
