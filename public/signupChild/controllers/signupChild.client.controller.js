/**
 * Created by sarin on 10/24/15.
 */
angular.module('signupChild').controller('SignupChildController',['$scope',
    '$routeParams', '$location','Authentication','SignupChild','$resource','$http',
    function($scope, $routeParams, $location, Authentication, SignupChild,$resource,$http){

        var interests=$resource('/signupChild/services/interests.json');
        $scope.interests = [];

        $scope.loadInterests = function(query) {
            return interests.query().$promise;
        };

        var addressGoogle = {},
            cancerType = "";

        $scope.onSelectCancerType = function ($item, $model, $label) {
            $scope.$item = $item;
            $scope.$model = "";
            $scope.$label = "";
            cancerType = $scope.$item;
            /* alert($scope.$item + '1', $scope.$model + '2', $scope.$label + '3')*/
        };

        $scope.getLocation = function(val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function(response){
                console.log('response in address is '+JSON.stringify(response));
                return response.data.results.map(function(item){
                    addressGoogle = response;
                    return item.formatted_address;
                });
            });
        };

        $scope.create_child = function(){
            /*console.log('Inside create_child ' + JSON.stringify(addressGoogle));*/
            var location = retrieveLocation(addressGoogle);
            var interestsSelected = [];
            for(var i=0;i<this.interests.length;i++)
            {
                interestsSelected.push(this.interests[i]['text']);
            }
            console.log("Authentication is "+JSON.stringify(Authentication));
            var signup = new SignupChild({
                parent_email: Authentication.user.email,
                firstname: this.firstname,
                lastname: this.lastname,
                cancer_type: cancerType,
                age: parseInt(this.age),
                gender: this.gender,
                interests: interestsSelected,
                hospital: this.hospital,
                address: this.address,
                location: location,
                school: this.school
            });

            console.log('child created is'+JSON.stringify(signup));

            signup.$save(function(response){
                if (response['status'] == 'fail'){
                    $location.path('/')
                }
                else{
                    $location.path('/dashboard')
                }
            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);

function retrieveLocation(address){
    var components = address.data.results[0].address_components;
    var location = [];
    var location_components = {
        'locality' : true,
        'administrative_area_level_2' : true,
        'administrative_area_level_1' : true,
        'country' : true
    };
    for (var i=0;i<components.length;i++){
        var types = components[i].types;
        for(var j=0;j < types.length;j++){
            if(types[j] in location_components){
                location.push(components[i].long_name);
            }
        }
    }
    return location
}