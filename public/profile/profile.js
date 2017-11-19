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

	$scope.switchBool = function(value) {
		$scope[value] = !$scope[value];
	}

	$scope.editGender = function(op) {
		var data = {
			gender: $scope.gender,
			op: op
		};

		sendData('gender', data);
	};

	$scope.editEmail = function(op) {
		var data = {
			email: $scope.email,
			op: op
		};

		sendData('email', data);
	};

	$scope.editFacebook = function(op) {
		var data = {
			facebook: $scope.facebook,
			op: op
		};
		
		sendData('facebook', data);
	};

	$scope.editTwitter = function(op) {
		var data = {
			twitter: $scope.twitter,
			op: op
		};

		sendData('twitter', data);
	};

	function sendData(str, data) {
		if (!str) {
			console.log("Err: string pattern is invaild");
		} else {
			let boolValue = 'show' + (str.charAt(0).toUpperCase() + str.slice(1));
			$http.put('/user/'+str,
				data,
				{headers: {'authorization': $rootScope.token}}
			).then(function() {
				$scope[boolValue] = false;
				getUser();
			});
		}
	};

	function getUser() {
		$http.get('/user').then(function(res) {
			$scope.profileUser = res.data;
		});
	};

	getUser();

}])
