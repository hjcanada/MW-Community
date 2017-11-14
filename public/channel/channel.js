'use strict';

angular.module('mwCommunity.channel', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/channel', {
		controller: 'channelCtrl',
		templateUrl: 'channel/channel.html'
	})
}])

.controller('channelCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

	$scope.showComments = null;

        $scope.postMw = function() {
		if ($scope.newMw == null) {
			alert('Please write something before posting!');
		} else {
			$http.post('/mw',
				{newMw: $scope.newMw},
				{headers: {'authorization': $rootScope.token}}
			).then(function() {
				$scope.showComments = null;
				$scope.newMw = '';
				getMw();
				getUser();
			});
		}		
        };

        $scope.deleteMw = function(mw) {
                $http.put('/mw/delete',
                        {mw: mw},
                        {headers: {'authorization': $rootScope.token}}
                ).then(function() {
                        getMw();
			getUser();
                });
        };

	$scope.likeMw = function(mw) {
		$http.put('/mw/like', 
			{mw: mw},
                        {headers: {'authorization': $rootScope.token}}
                ).then(function() {
                        getMw();
			getUser();
                });
        };
			
	$scope.dislikeMw = function(mw) {
		$http.put('/mw/dislike', 
			{mw: mw},
                        {headers: {'authorization': $rootScope.token}}
                ).then(function() {
                        getMw();
			getUser();
                });
        };

	$scope.commentMw = function(mw) {
		if ($scope.showComments == null) {
			$scope.showComments = mw._id;
		} else {
			$scope.showComments = null;
		}
	};

	$scope.postComment = function(mw) {
		if ($scope.replyBody == null) {
			alert('please write your comments before submit!');
		} else {
			var newComment = {
					mw: mw,
					replyTitle: $rootScope.currentUser.username,
					replyBody: $scope.replyBody
			};

			$http.put('/reply', 
				newComment,
				{headers: {'authorization': $rootScope.token}}
			).then(function() {
				$scope.showComments = null;
				$scope.replyBody = '';
				getMw();
				getUser();
			});
		}
	};

        $scope.deleteComment = function(mw, reply) {
	
		var delComment = {
			mw: mw,
			replyTitle: reply.replyTitle,
			replyBody: reply.replyBody
		};

                $http.put('/reply/delete',
			delComment,
                        {headers: {'authorization': $rootScope.token}}
                ).then(function() {
                        getMw();
			getUser();
                });
        };

	$scope.inLike = function(mw) {
		if (!$rootScope.currentUser) {
			return false;
		} else if (mw.likeUsers.indexOf($rootScope.currentUser.username) != -1 &&
				mw.dislikeUsers.indexOf($rootScope.currentUser.username) == -1) {
			return true;
		}
		return false;
	}

	$scope.inDislike = function(mw) {
		if (!$rootScope.currentUser) {
			return false;
		} else if (mw.dislikeUsers.indexOf($rootScope.currentUser.username) != -1 &&
				mw.likeUsers.indexOf($rootScope.currentUser.username) == -1) {
			return true;
		}
		return false;
	}

        function getMw() {
                $http.get('/mw').then(function(res) {
                        $scope.mw = res.data;
                });
        };

	function getUser() {
		$http.get('/user').then(function(res) {
			$rootScope.currentUser = res.data;
		});
	};

        getMw();

	getUser();
}])
