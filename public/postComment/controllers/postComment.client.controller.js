/**
 * Created by sarin on 11/9/15.
 */

angular.module('postComment').controller('CommentController',['$scope',
    '$routeParams', '$location','Comment','Authentication', '$timeout',
    function($scope, $routeParams, $location, Comment, Authentication, $timeout){
        $scope.postCommentResult = "";
        $scope.showMessage = false;
        $scope.post_comment = function(){
            var postComment = new Comment.PostComment({
                comment: this.comment,
                author_email: Authentication.user.email,
                profile_email: $scope.status.status_update_email,
                status_id: $scope.status.status_update_id
            });

            console.log('body sent is '+ JSON.stringify(postComment));
            postComment.$save(function(response){
                    $scope.postCommentResult = {type:"alert alert-success", msg: "Comment Posted!"};
                $scope.showMessage = true;
                $timeout(function() {
                    $scope.showMessage = false;
                }, 3000);
                Comment.commentPostedVar = true;
            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
                $scope.error = errorResponse.data.message;
                $scope.postCommentResult =  {type:"alert alert-danger", msg: "Status Post Failed... :("}
            });
        };

    }
]);