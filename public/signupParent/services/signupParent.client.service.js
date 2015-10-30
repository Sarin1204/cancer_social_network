/**
 * Created by sarin on 10/22/15.
 */

angular.module('signupParent').factory('SignupParent',['$resource',
    function($resource) {
        return {
            signupParent:  $resource('api/signupParent'),
            checkChild: $resource('api/angular/checkChild')
    };
}
]);