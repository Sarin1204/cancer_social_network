/**
 * Created by sarin on 10/30/15.
 */

angular.module('profile').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider){
        $routeProvider.
            when('/profile/:profileHref',{
                templateUrl: 'profile/views/profile.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            });
    }
]);