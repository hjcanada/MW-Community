'use strict';

angular.module('mwCommunity.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/about', {
		controller: 'aboutCtrl',
		templateUrl: 'about/about.html'
	})
}])

.controller('aboutCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	
	$scope.opiSubmit = function() {
		if ($scope.name == null || $scope.email == null || $scope.message == null) {
			alert('Not enough information')
		} else {
			var opinion = {
				name: $scope.name,
				email: $scope.email,
				message: $scope.message
			}

			$http.post('/opinion', opinion).then(function(res) {
				alert('Thanks for your suggestion!')
			}, function(err) {
				alert('Submit Error!')
			})
		}

		$scope.name = ''
		$scope.email = ''
		$scope.message = ''
	}
	
}])
