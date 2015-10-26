/**
 * Created by sarin on 10/24/15.
 */
angular.module('signupChild').controller('SignupChildController',['$scope',
    '$routeParams', '$location','Authentication','SignupChild','$resource',
    function($scope, $routeParams, $location, Authentication, SignupChild,$resource){

        var interests=$resource('/signupChild/services/interests.json');
        $scope.interests = [];

        $scope.loadInterests = function(query) {
            return interests.query().$promise;
        };

        $scope.create_child = function(){
            console.log('Inside create_child');
            var interestsSelected = [];
            for(var i=0;i<this.interests.length;i++)
            {
                interestsSelected.push(this.interests[i]['text']);
            }
            console.log("Authentication is "+JSON.stringify(Authentication));
            var signup = new SignupChild({
                parent_email: Authentication.user.email,
                firstname: this.firstname,
                lastname: this.lastname,
                cancer_type: this.cancer_type,
                age: parseInt(this.age),
                gender: this.gender,
                interests: interestsSelected,
                hospital: this.hospital
            });

            console.log('child created is'+JSON.stringify(signup));

            signup.$save(function(response){
                console.log('created'+response);
                $location.path('/dashboard')
            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);