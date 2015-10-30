/**
 * Created by sarin on 10/26/15.
 */

angular.module('signinParent').controller('SigninParentController',['$scope',
    '$routeParams', '$location','SigninParent','$timeout',
    function($scope, $routeParams, $location, SigninParent,$timeout){

        $scope.signin_error = '';
        $scope.showMessage = false;

        $scope.signin_parent = function(){
            console.log('Inside signin_parent');
            var signin = new SigninParent.signinParent({
                email: this.email,
                password: this.password
            });

            signin.$save(function(response){
                console.log("response is" + JSON.stringify(response));
                if(response['status'] == 'failed'){

                    $scope.signin_error = {type: 'alert alert-danger',msg: 'Incorrect sign in details.'};
                    $scope.showMessage = true;
                    $timeout(function() {
                        $scope.showMessage = false;
                    }, 3000);
                }
                else{
                    var status = SigninParent.checkChild.get({
                    }, function(){
                        if (status['status'] == 'child'){
                            $location.path('/dashboard')
                        }
                        else{
                            $location.path('/signupChild')
                        }
                    });
                }

            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));

            });
        };

    }
]);