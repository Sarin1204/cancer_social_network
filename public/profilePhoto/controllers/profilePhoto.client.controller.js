/**
 * Created by sarin on 10/26/15.
 */
angular.module('profilePhoto').controller('profilePhotoController',['$scope','Authentication',
function($scope,Authentication){
    if(Authentication.user.profile_photo != undefined)
        $scope.profile_photo = Authentication.user.profile_photo;

    $scope.profileHref = Authentication.user.email;
    $scope.firstName = Authentication.user.firstname;

    }
]);
