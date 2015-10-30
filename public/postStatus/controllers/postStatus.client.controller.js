/**
 * Created by sarin on 10/28/15.
 */

angular.module('postStatus').controller('StatusController',['$scope',
    '$routeParams', '$location','Status','Authentication', '$timeout',
    function($scope, $routeParams, $location, Status, Authentication, $timeout){
        $scope.postStatusResult = "";
        $scope.showMessage = false;
        $scope.post_status = function(){
            console.log('Inside create_parent');
            var postStatus = new Status({
                status: this.status,
                email: Authentication.user.email
            });

            console.log('body sent is '+ JSON.stringify(postStatus));

            postStatus.$save(function(response){
                /*$window.location.href='http://localhost:3000/api/checkchild';*/
                    if (response['status'] == 'pass'){
                        $scope.postStatusResult = {type:"alert alert-success", msg: "Status Posted!"}
                    }
                    else{
                        $scope.postStatusResult =  {type:"alert alert-danger", msg: "Status Post Failed... :("}
                    }
                $scope.showMessage = true;
                $timeout(function() {
                    $scope.showMessage = false;
                }, 3000);

            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);