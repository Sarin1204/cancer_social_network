/**
 * Created by sarin on 10/29/15.
 */
angular.module('dashboard').factory('Dashboard',['$resource',
    function($resource) {
        return {
            showStatuses:  $resource('api/showStatuses'),
            friendRecommend: $resource('api/friendRecommend')
        };
    }
]);