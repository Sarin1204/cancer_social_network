/**
 * Created by sarin on 10/22/15.
 */

angular.module('signupParent').factory('SignupParent',['$resource',
    function($resource){
        return $resource('api/signupParent');
    }
]);