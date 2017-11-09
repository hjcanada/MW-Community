'use strict';

angular.module('mwCommunity.about', ['ngRoute', 'ngMessages'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/about', {
		controller: 'aboutCtrl',
		templateUrl: 'about/about.html'
	})
}])

.controller('aboutCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.switchBool = function(value) {
		$scope[value] = !$scope[value];
	}
	
	$scope.submit = function() {
		if ($scope.opForm.$valid) {
			$http.post('/opinion', $scope.opinion).then(function(res) {
				$scope.showSuccess = true;
			}, function(err) {
				$scope.showError = true;
			})

			$scope.opinion = null;
			$scope.opForm.$setPristine();
			$scope.opForm.$setUntouched();
		} else {
			$scope.showSuccess = false;
			$scope.showError = false;
		}
	}
	
}])
