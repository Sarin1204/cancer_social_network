/**
 * Created by sarin on 10/22/15.
 */

angular.module('signupParent').controller('SignupParentController',['$scope',
'$routeParams', '$location','SignupParent',
    function($scope, $routeParams, $location, SignupParent){

        $scope.create_parent = function(){
            console.log('Inside create_parent');
           var signup = new SignupParent.signupParent({
               email: this.email,
               password: this.password,
               firstname: this.firstname,
               lastname: this.lastname,
               gender: this.gender,
               phone: parseInt(this.phone)
           });

            console.log('parent created is'+JSON.stringify(signup));

            signup.$save(function(response){
                /*$window.location.href='http://localhost:3000/api/checkchild';*/
                var status = SignupParent.checkChild.get({
                }, function(){
                    if (status['status'] == 'child'){
                        $location.path('/dashboard')
                    }
                    else{
                        $location.path('/signupChild')
                    }
                });
            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);