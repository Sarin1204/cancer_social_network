/**
 * Created by sarin on 10/28/15.
 */
angular.module('postStatus').factory('Status',['$resource',
    function($resource){
        return{
            PostStatus: $resource('api/postStatus'),
            statusPostedVar: false
        }
    }
]);