/**
 * Created by sarin on 11/3/15.
 */
angular.module('search').controller('searchController',['$scope','Search',
    function($scope, Search){

        /*return $scope.getParents = function(val) {
            return Search.typeAheadParents.get({"val":val}, function(response){
                console.log('Response for typeAheadParents is '+JSON.stringify(response.parents));
                return response.parents.map(function(item){
                    console.log('Returned value is'+item.tag);
                    return item.tag;
                });
            }, function(error){
                console.log('error for typeAheadParents is '+JSON.stringify(error));
            });

            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function(response){
                return response.data.results.map(function(item){
                    return item.formatted_address;
                });
            });
        };*/

        return $scope.getParents = function(val) {
             var Parents = Search.typeAheadParents.get({"val":val});

            return Parents.$promise.then(function(response){
                console.log('Response for typeAheadParents is '+JSON.stringify(response.parents));
                return response.parents.map(function(item){
                    console.log('Returned value is'+item.tag);
                    return item;
                });
            })

        }

     }



]);
