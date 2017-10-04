angular.module('mwCommunity.signup', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/signup', {
		controler: 'signupCtrl',
		templateUrl: 'signup/signup.html'
	})
}])

.controller('signupCtrl', ['$scope', '$rootScope', '$window', '$http', '$cookies', function($scope, $rootScope, $window, $http, $cookies) {

	$scope.signup = function() {

		$scope.switchBool = function(value) {
			$scope[value] = !$scope[value]
		}
		
		if (typeof($scope.username) == 'undefined' || typeof($scope.password) == 'undefined' || typeof($scope.password_cf) == 'undefined') {
			$scope.failTextAlert = 'Not enough information!'
			$scope.showFailAlert = true
		} else if ($scope.password !== $scope.password_cf) {
			$scope.failTextAlert = 'Passwords are not the same!'
			$scope.showFailAlert = true
		} else {
			var newUser = {
					username: $scope.username,
					password: $scope.password,
					posts: 0,
					comments: 0,
					points: 0,
					gender: null,
					email: null,
					facebook: null,
					twitter: null,
					joinDate: null,
					joinTime: null,
					lastDate: null,
					lastTime: null
			}

			$http.post('/user', newUser).then(function(res) {

				$rootScope.token = res.data.token
				$rootScope.currentUser = newUser
				$rootScope.isLogin = true

				$cookies.put('token', $rootScope.token);
				$cookies.put('currentUser', JSON.stringify($rootScope.currentUser));

				$scope.showFailAlert = false
				$window.location.href = '#/home'
			}, function(err) {
				$scope.failTextAlert = 'Username already exists!'
				$scope.showFailAlert = true
			})
		}

		$scope.username = ''
		$scope.password = ''
		$scope.password_cf = ''
	}
}])
