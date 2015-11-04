/**
 * Created by sarin on 11/3/15.
 */
angular.module('search').factory('Search',['$resource',
    function($resource){
        return{
            typeAheadParents: $resource('api/typeAheadParents/:val',{
                val: '@val'

            })
        }
    }
]);