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

.service('imgService', ['$http', '$q', function($http, $q) {

	this.getImgs = function() {
		var defer = $q.defer();
		
		$http.get('download/download.json').then(function(res) {
			defer.resolve(res);
		}, function(err) {
			defer.reject(err);
		})
		
		return defer.promise;
	};

	this.getThumbs = function() {
		var defer = $q.defer();

		$http.get('download/details.json').then(function(res) {
			defer.resolve(res);
		}, function(err) {
			defer.reject(err);
		})

		return defer.promise;
	}
}])

.controller('downloadCtrl', ['$scope', '$location', '$http', '$rootScope', '$window', 'imgService', function($scope, $location, $http, $rootScope, $window, imgService) {

	imgService.getImgs().then(function(res) {
		$scope.imgs = res.data;
		imgService.getThumbs().then(function(res) {
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
