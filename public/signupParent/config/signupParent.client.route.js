/**
 * Created by sarin on 10/22/15.
 */
angular.module('signupParent').config(['$routeProvider',
function($routeProvider){
    $routeProvider.
        when('/signupParent',{
            templateUrl: 'signupParent/views/signupParent.client.view.html'
        });
    }
]);