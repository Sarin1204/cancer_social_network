/**
 * Created by sarin on 11/11/15.
 */
angular.module('cancerType').factory('CancerType',['$resource',
    function($resource){
        return{
            typeAheadCancer: $resource('api/typeAheadCancer/:val',{
                val: '@val'

            })
        }
    }
]);