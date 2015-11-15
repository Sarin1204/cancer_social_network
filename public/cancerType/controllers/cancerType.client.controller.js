/**
 * Created by sarin on 11/11/15.
 */
angular.module('cancerType').controller('cancerTypeController',['$scope','CancerType',
    function($scope, CancerType){

        return $scope.getCancerType = function(val) {
            var types = CancerType.typeAheadCancer.get({"val":val});

            return types.$promise.then(function(response){
                console.log('Response for typeAheadCancer is '+JSON.stringify(response.types));
                return response.types.map(function(item){
                    console.log('Returned value is'+item.tag);
                    return item.tag;
                });
            })

        }

    }
]);