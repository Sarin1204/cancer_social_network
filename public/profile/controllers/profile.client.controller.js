/**
 * Created by sarin on 10/30/15.
 */
angular.module('profile').controller('ProfileController',['$scope',
    '$routeParams','Profile','$q','$window', function($scope, $routeParams, Profile, $q, $window) {

        $scope.currentProfileEmail = $routeParams.profileHref;
        $scope.errorMsg = "";
        $scope.isFriend = "someValue";

        /*Profile.currentProfile.get({
            profileEmail: $routeParams.profileHref
        }).$promise.then(function(result){
                console.log("result is "+JSON.stringify(result));
                $scope.currentProfile = result;
            });*/

        function currentProfile() {
            var d = $q.defer();
            var result = Profile.currentProfile.get({ profileEmail: $routeParams.profileHref }, function() {
                d.resolve(result);
            });
            return d.promise;
        }

        function currentChild() {
            var d = $q.defer();
            var result = Profile.currentChild.get({ parentEmail: $routeParams.profileHref }, function() {
                d.resolve(result);
            });
            return d.promise;
        }

        $q.all([
            currentProfile(),
            currentChild()
        ]).then(function(data) {
            var currentProfile = data[0];
            var currentChild = data[1];
            console.log('currentProfile is '+JSON.stringify(currentProfile));
            console.log('currentChild is '+JSON.stringify(currentChild));
            $scope.currentProfile = currentProfile;
            $scope.currentChild = currentChild;
            //TODO: something...
        });

       Profile.profileStatuses.query({profileEmailForStatus: $routeParams.profileHref}, function(response){
           $scope.profileStatusList = response;
           /*console.log('profile Status List ' + JSON.stringify(response))*/

        }, function(error){
           console.log('Inside error');
           $scope.errorMsg = 'Oops! Something unexpected occured!'
       });
        console.log("isFriend == "+$scope.isFriend)
        if($scope.currentProfileEmail != $window.user.email){
            Profile.getFriend.get({profileEmailForFriend: $routeParams.profileHref}, function(response){
                $scope.isFriend = response.relationship;
            }, function(error){
                console.log('Inside error for getFriend');
                $scope.errorMsg = 'Oops! Something unexpected occured!'
            })
        }



    }
]);

/*angular.module('profile').directive('ngPullDown', function() {
    return {
        restrict: 'A',
        priority: -1000,
        link: function ($scope, iElement, iAttrs) {
            var $parent = iElement.parent();
            var $parentHeight = $parent[0].offsetHeight;
            var height = iElement[0].offsetHeight;

            iElement[0].style.marginTop = $parentHeight - height
        }
    };
});*/
