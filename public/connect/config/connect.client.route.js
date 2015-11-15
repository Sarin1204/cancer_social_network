/**
 * Created by sarin on 11/11/15.
 */
angular.module('connect').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider){
        $routeProvider.
            when('/connect',{
                templateUrl: 'connect/views/connect.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            }).
            when('/connect/main',{
                templateUrl: 'connect/views/connectMain.client.view.html'
            }).
            when('/connect/type',{
                templateUrl: 'connect/views/connecType.client.view.html'
            });
    }
]);