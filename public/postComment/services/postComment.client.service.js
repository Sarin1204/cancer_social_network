/**
 * Created by sarin on 11/9/15.
 */

angular.module('postComment').factory('Comment',['$resource',
    function($resource){
        return{
            PostComment: $resource('api/postComment'),
            commentPostedVar: false
        }
    }
]);