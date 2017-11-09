'use strict';

angular.module('mwCommunity.login', ['ngRoute', 'ngCookies', 'ngMessages'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/login', {
		controller: 'loginCtrl',
		templateUrl: 'login/login.html'
	})
}])

.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$location', '$cookies', function($scope, $rootScope, $http, $location, $cookies) {
	
	$scope.switchBool = function(value) {
		$scope[value] = !$scope[value]
	}

	$scope.login = function() {
		if ($scope.lgForm.$valid) {
			$http.put('/user/login', {username: $scope.user.username, password: $scope.user.password})
			.then(function(res) {
				$rootScope.token = res.data.token
				$rootScope.currentUser = {
					username: res.data.username,
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
				$scope.showFail = true
			})

			$scope.user = null
			$scope.lgForm.$setPristine()
			$scope.lgForm.$setUntouched()
		} else {
			$scope.showFail = false
		}
	}

	$scope.logout = function() {
		
                $cookies.remove('token');
                $cookies.remove('currentUser');

		$scope.user = null
		$rootScope.token = null
		$rootScope.currentUser = null
		$scope.showFail = false

		$location.path('/login')
	}

}])
