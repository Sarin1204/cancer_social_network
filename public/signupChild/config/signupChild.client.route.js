/**
 * Created by sarin on 10/24/15.
 */

angular.module('signupChild').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider){
        $routeProvider.
            when('/signupChild',{
                templateUrl: 'signupChild/views/signupChild.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            });
    }
]);
