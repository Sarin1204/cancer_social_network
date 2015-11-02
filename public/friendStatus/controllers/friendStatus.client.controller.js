/**
 * Created by sarin on 11/1/15.
 */


angular.module('friendStatus').controller('friendStatusController',['$scope','$routeParams','Authentication','FriendStatus','$window','$timeout',
    function($scope,$routeParams,Authentication,FriendStatus,$window,$timeout){

        console.log('routeParams === '+JSON.stringify($routeParams));

        $scope.currentProfileEmail = $routeParams.profileHref;
        $scope.errorMsg = "";
        $scope.isFriend = "someValue";
        $scope.showMessage = false;

        console.log("isFriend == "+$scope.isFriend);
        if($scope.currentProfileEmail != $window.user.email){
            FriendStatus.getRelationship.get({profileEmailForRelationship: $routeParams.profileHref}, function(response){
                console.log('Relations is '+JSON.stringify(response));
                $scope.RelationshipStatus = response.relationship;
            }, function(error){
                console.log('Inside error for getFriend');
                $scope.errorMsg = 'Oops! Something unexpected occured!'
            });

        }

        $scope.addFriend = function(){
            var newFriend = new FriendStatus.addFriend({
                friendEmail :  $routeParams.profileHref
            });
            newFriend.$save(function(response){
                console.log('response to addFriend'+JSON.stringify(response));
                $scope.friendActionResult = {type:"alert alert-success", msg: "Friend Request Sent!"}
                $scope.showMessage = true;
                $scope.RelationshipStatus = 'pendingFriendRequestSent'
                $timeout(function() {
                    $scope.showMessage = false;
                }, 3000);


            }, function(error){
                console.log('Inside error');
                $scope.friendActionResult = {type:"alert alert-danger", msg: "'Oops! Something unexpected occured!"}
            })
        };

        $scope.confirmFriend = function(){
            var confirmFriend = new FriendStatus.confirmFriend({
                friendEmail :  $routeParams.profileHref
            });
            confirmFriend.$save(function(response){
                console.log('response to confirmFriend'+JSON.stringify(response));
                $scope.friendActionResult = {type:"alert alert-success", msg: "You are now Friends!"};
                $scope.showMessage = true;
                $scope.RelationshipStatus ='Friend';
                $timeout(function() {
                    $scope.showMessage = false;
                }, 3000);


            }, function(error){
                console.log('Inside error');
                $scope.friendActionResult = {type:"alert alert-danger", msg: "'Oops! Something unexpected occured!"}
            })
        };

        $scope.deleteFriend = function(){
            if($scope.RelationshipStatus == 'pendingFriendRequestSent'){
                var parent_sent_email = Authentication.user.email,
                    parent_received_email = $routeParams.profileHref
            }
            else{
                var parent_sent_email = $routeParams.profileHref,
                    parent_received_email = Authentication.user.email
            }
            var deleteFriend = new FriendStatus.deleteFriend({
                parent_sent_email :  parent_sent_email,
                parent_received_email : parent_received_email
            });
            deleteFriend.$save(function(response){
                console.log('response to deleteFriend'+JSON.stringify(response));
                $scope.friendActionResult = {type:"alert alert-success", msg: "Friend Request Deleted.."};
                $scope.showMessage = true;
                $scope.RelationshipStatus ='none';
                $timeout(function() {
                    $scope.showMessage = false;
                }, 3000);


            }, function(error){
                console.log('Inside error');
                $scope.friendActionResult = {type:"alert alert-danger", msg: "'Oops! Something unexpected occured!"}
            })
        };




    }
]);