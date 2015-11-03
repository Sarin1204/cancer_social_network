/**
 * Created by sarin on 11/2/15.
 */
angular.module('profileSettings').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider){
        $routeProvider.
            when('/profileSettings',{
                templateUrl: 'profileSettings/views/profileSettings.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            });
    }
]);