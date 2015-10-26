/**
 * Created by sarin on 10/22/15.
 */

angular.module('signupParent').controller('SignupParentController',['$scope',
'$routeParams', '$location','SignupParent',
    function($scope, $routeParams, $location, SignupParent){

        $scope.create_parent = function(){
            console.log('Inside create_parent');
           var signup = new SignupParent({
               username: this.username,
               password: this.password,
               firstname: this.firstname,
               lastname: this.lastname,
               email: this.email,
               address: this.address,
               zipcode: parseInt(this.zipcode),
               phone: parseInt(this.phone)
           });

            console.log('parent created is'+JSON.stringify(signup));

            signup.$save(function(response){
                console.log('created '+JSON.stringify(response));
               $location.path('signupChild/')
            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);