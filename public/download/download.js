'use strict'

angular.module('mwCommunity.download', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/download', {
		controller: 'downloadCtrl',
		templateUrl: 'download/download.html'
	})
	.when('/download/:pageID', {
		controller: 'detailCtrl',
		templateUrl: 'download/downloadDetail.html'
	})
	.otherwise({
		redirectTo: '/download'
	})
}])

.controller('downloadCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {

	$http.get('download/download.json').then(function(res) {
		$rootScope.imgs = res.data;
	});

}])

.controller('detailCtrl', ['$scope', '$location', '$http', '$rootScope', '$window', function($scope, $location, $http, $rootScope, $window) {

	$http.get('download/details.json').then(function(res) {
		$rootScope.imgs_thumb = res.data;
	});

	$scope.zoom = function(src) {
		$window.open(src);
	}

	$scope.showDetails = function(id) {
		for (var index in $rootScope.imgs) {
			if (id == $rootScope.imgs[index].id) {
				$rootScope.img = $rootScope.imgs[index];
			}
		}

		for (index in $rootScope.imgs_thumb) {
			if (id == $rootScope.imgs_thumb[index].id) {
				$rootScope.urls = $rootScope.imgs_thumb[index].urls;
				break;
			} else {
				$rootScope.urls = '';
			}
		}
		$location.path('/download/' + id);
	};

	$scope.goback = function() {
		$location.path('/download');
	};

	$scope.download = function() {
		$window.open('https://www.mediafire.com/');
	};

}])
