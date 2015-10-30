/**
 * Created by sarin on 10/26/15.
 */
angular.module('signinParent').factory('SigninParent',['$resource',
    function($resource) {
        return {
            signinParent:  $resource('api/signinParent'),
            checkChild: $resource('api/angular/checkChild')
        };
    }
]);