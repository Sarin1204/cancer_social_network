/**
 * Created by sarin on 11/3/15.
 */
angular.module('profileSettings').factory('ProfileSettings',['$resource',
    function($resource) {
        return {
            getChildDetails:  $resource('api/getChildDetails/:parentEmail',{
                parentEmail: '@parentEmail'
            }),
            updateParent: $resource('api/updateParent'),
            updateChild: $resource('api/updateChild')
        };
    }
]);