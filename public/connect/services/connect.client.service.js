/**
 * Created by sarin on 11/11/15.
 */
angular.module('connect').factory('Connect',['$resource',
    function($resource) {
        return {
            getChild:  $resource('api/connectChild/:parentEmail',{
                parentEmail: '@parentEmail'
            }),
            getConnections: $resource('api/getConnections',{
            })
        };
    }
]);