'use strict';

angular.module('mwCommunity.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/profile/:pageID', {
		controller: 'profileCtrl',
		templateUrl: 'profile/profile.html'
	})
}])

.controller('profileCtrl', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {

	$scope.profileUser = $rootScope.currentUser
	$scope.showGender = false;	
	$scope.showEmail = false;
	$scope.showFacebook = false;
	$scope.showTwitter = false;

	$scope.getMyProfile = function() {
		$location.path('/profile/' + Math.ceil(Math.random()*10000))
	}

	$scope.switchBoolGender = function() {
		$scope.showGender = !$scope.showGender;
	}

	$scope.switchBoolEmail = function() {
		$scope.showEmail = !$scope.showEmail;
	}

	$scope.switchBoolFacebook = function() {
		$scope.showFacebook = !$scope.showFacebook;
	}

	$scope.switchBoolTwitter = function() {
		$scope.showTwitter = !$scope.showTwitter;
	}

	$scope.editGender = function(op) {
		var data = {
			gender: $scope.gender,
			op: op
		};

		$http.put('/user/gender', 
			data,
			{headers: {'authorization': $rootScope.token}}
		).then(function() {
			$scope.showGender = false;
			getUser();
		});
	};

	$scope.editEmail = function(op) {
		var data = {
			email: $scope.email,
			op: op
		};

		$http.put('/user/email', 
			data,
			{headers: {'authorization': $rootScope.token}}
		).then(function() {
			$scope.showEmail = false;
			getUser();
		});
	};

	$scope.editFacebook = function(op) {
		var data = {
			facebook: $scope.facebook,
			op: op
		};

		$http.put('/user/facebook', 
			data,
			{headers: {'authorization': $rootScope.token}}
		).then(function() {
			$scope.showFacebook = false;
			getUser();
		});
	};

	$scope.editTwitter = function(op) {
		var data = {
			twitter: $scope.twitter,
			op: op
		};

		$http.put('/user/twitter', 
			data,
			{headers: {'authorization': $rootScope.token}}
		).then(function() {
			$scope.showTwitter = false;
			getUser();
		});
	};

	function getUser() {
		$http.get('/user').then(function(res) {
			$scope.profileUser = res.data;
		});
	};

	getUser();

}])
