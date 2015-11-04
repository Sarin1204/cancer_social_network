/**
 * Created by sarin on 11/2/15.
 */

angular.module('profileSettings').controller('ProfileSettingsController',['$scope','Authentication','ProfileSettings',
    function($scope,Authentication, ProfileSettings){

        console.log(JSON.stringify(Authentication.user));

        $scope.parent = {
            email : Authentication.user.email,
            firstname: Authentication.user.firstname,
            lastname : Authentication.user.lastname,
            gender: Authentication.user.gender,
            phone: Authentication.user.phone,
            address: Authentication.user.address,
            zipcode: Authentication.user.zipcode
        };

        ProfileSettings.getChildDetails.get({parentEmail: Authentication.user.email},function(response){
            console.log('Response to getChildDetails is '+JSON.stringify(response));
            $scope.child = response;
        }, function(error){
            console.log('Error in getChildDetails '+ error)
        });

        $scope.saveParent = function(){
            for(var i in $scope.parent){
                if(i == 'phone' || i=='zipcode'){
                    $scope.parent[i]=parseInt($scope.parent[i]);
                }
                if ($scope.parent[i] == null)
                delete $scope.parent[i]
            }
            var updateParent = new ProfileSettings.updateParent($scope.parent);
                updateParent.$save(function(response){
                console.log('inside response saveParent'+response);
            }, function(error){
                console.log('updateParent error'+error);
            })
        };

        $scope.saveChild = function(){
            for(var i in $scope.child){
                if(i == 'age' || i=='zipcode'){
                    $scope.parent[i]=parseInt($scope.parent[i]);
                }
                if ($scope.parent[i] == null)
                    delete $scope.parent[i]
            }
            var updateChild = new ProfileSettings.updateChild($scope.child);
            updateChild.$save(function(response){
                console.log('inside response saveChild'+JSON.stringify(response));
            }, function(error){
                console.log('updateChild error'+error);
            })
        };

    }
]);