'use strict'

angular.module('mwCommunity.download', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/download', {
		controller: 'downloadCtrl',
		templateUrl: 'download/download.html'
	})
	.when('/download/:pageID', {
		controller: 'downloadCtrl',
		templateUrl: 'download/downloadDetail.html'
	})
	.otherwise({
		redirectTo: '/download'
	})
}])

.controller('downloadCtrl', ['$scope', '$location', '$http', '$rootScope', '$window', '$q', function($scope, $location, $http, $rootScope, $window, $q) {


	$http.get('download/download.json').then(function(res) {
		$scope.imgs = res.data;
		$http.get('download/details.json').then(function(res) {
			$scope.imgs_thumb = res.data;
			var path = $location.path().split("/");
			var id = parseInt(path[path.length - 1]);
		
			if (angular.isNumber(id)) {
				for (var index in $scope.imgs) {
					if (id == $scope.imgs[index].id) {
						$scope.img = $scope.imgs[index];
					}
				}

				for (index in $scope.imgs_thumb) {
					if (id == $scope.imgs_thumb[index].id) {
						$scope.urls = $scope.imgs_thumb[index].urls;
						break;
					} else {
						$scope.urls = '';
					}
				}
			} else {
				console.log("Detected invalid page id");
			}
		}, function(err) {
			console.log(err);
		})
	}, function(err) {
		cosloe.log(err);
	});

	$scope.zoom = function(src) {
		$window.open(src);
	}

	$scope.showDetails = function(id) {
		$location.path('/download/' + id);
	};

	$scope.goback = function() {
		$location.path('/download');
	};

	$scope.download = function() {
		$window.open('https://www.mediafire.com/');
	};

}])
