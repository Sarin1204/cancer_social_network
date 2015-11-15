/**
 * Created by sarin on 11/12/15.
 */
angular.module('interests').controller('interestsController',['$scope','Interests',
    function($scope, Interests){

        return $scope.getInterests = function(val) {
            var interestsReturned = Interests.typeAheadInterests.get({"val":val});

            return interestsReturned.$promise.then(function(response){
                console.log('Response for typeAheadCancer is '+JSON.stringify(response.types));
                return response.types.map(function(item){
                    console.log('Returned value is'+item.tag);
                    return item.tag;
                });
            })
        }

    }
]);