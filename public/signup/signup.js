angular.module('mwCommunity.signup', ['ngRoute', 'ngCookies', 'ngMessages'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/signup', {
		controler: 'signupCtrl',
		templateUrl: 'signup/signup.html'
	})
}])

.controller('signupCtrl', ['$scope', '$rootScope', '$window', '$http', '$cookies', function($scope, $rootScope, $window, $http, $cookies) {

	$scope.switchBool = function(value) {
		$scope[value] = !$scope[value]
	}
		
	$scope.signup = function() {
		if ($scope.sgForm.$valid) {
			if ($scope.user.password !== $scope.user.password_cf) {
				$scope.failText = 'Passwords are not the same!'
				$scope.showFail = true
			} else {
				var newUser = {
						username: $scope.user.username,
						password: $scope.user.password,
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

					$cookies.put('token', $rootScope.token);
					$cookies.put('currentUser', JSON.stringify($rootScope.currentUser));

					$scope.showFail = false
					$window.location.href = '#/home'
				}, function(err) {
					$scope.failText = 'Username already exists!'
					$scope.showFail = true
				})
			}

			$scope.user = null
			$scope.sgForm.$setPristine()
			$scope.sgForm.$setUntouched()
		} else {
			$scope.showFail = false;
		}
	}
}])
