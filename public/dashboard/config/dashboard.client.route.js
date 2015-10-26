/**
 * Created by sarin on 10/26/15.
 */
angular.module('dashboard').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider){
        $routeProvider.
            when('/dashboard',{
                templateUrl: 'dashboard/views/dashboard.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            });
    }
]);