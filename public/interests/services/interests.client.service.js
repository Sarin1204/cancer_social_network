/**
 * Created by sarin on 11/12/15.
 */
angular.module('interests').factory('Interests',['$resource',
    function($resource){
        return{
            typeAheadInterests: $resource('api/typeAheadInterests/:val',{
                val: '@val'

            })
        }
    }
]);