/**
 * Created by sarin on 10/31/15.
 */

angular.module('showFriendRequests').factory('ShowFriendRequests',['$resource',
    function($resource) {
        return {
            pendingFriendRequests:  $resource('api/pendingFriendRequests')
        };
    }
]);