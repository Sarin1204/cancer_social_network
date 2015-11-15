/**
 * Created by sarin on 10/29/15.
 */
angular.module('dashboard').controller('ShowStatusesController',['$scope',
    '$routeParams','Dashboard','Status','Comment', function($scope, $routeParams, Dashboard, Status, Comment){

        $scope.Status = Status;
        $scope.statusPostedVar = Status.statusPostedVar;
        $scope.Comment = Comment;
        $scope.commentPostedVar = Comment.commentPostedVar;

        $scope.$watch('Status.statusPostedVar', function(newVal, oldVal, scope){
            if(newVal){
                console.log('New Value in PostStatus');
                Dashboard.showStatuses.query(function(response){
                    $scope.statuses = response;
                    console.log('dashboard Status List ' + JSON.stringify(response));
                    Status.statusPostedVar = false;

                }, function(error){
                    console.log('Inside error');
                    $scope.errorMsg = 'Oops! Something unexpected occurred!';
                    Status.statusPostedVar = false;
                });
            }
        });

        $scope.$watch('Comment.commentPostedVar', function(newVal, oldVal, scope){
            if(newVal){
                console.log('New Value in PostStatus');
                Dashboard.showStatuses.query(function(response){
                    $scope.statuses = response;
                    console.log('dashboard Status List ' + JSON.stringify(response));
                    Comment.commentPostedVar = false;

                }, function(error){
                    console.log('Inside error');
                    $scope.errorMsg = 'Oops! Something unexpected occurred!';
                    Comment.commentPostedVar = false;
                });
            }
        });

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