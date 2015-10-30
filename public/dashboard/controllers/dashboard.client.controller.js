/**
 * Created by sarin on 10/29/15.
 */
angular.module('dashboard').controller('ShowStatusesController',['$scope',
    '$routeParams','Dashboard', function($scope, $routeParams, Dashboard){

        $scope.statuses = Dashboard.showStatuses.query();
        var statuses = $scope.statuses;
        console.log("statuses are "+statuses);
    }
]);

angular.module('dashboard').controller('FriendRecommendController',['$scope',
    '$routeParams','Dashboard', function($scope, $routeParams, Dashboard){

        $scope.friends = Dashboard.friendRecommend.query();
        var friends = $scope.friends;
        console.log("friends are "+friends);
    }
]);