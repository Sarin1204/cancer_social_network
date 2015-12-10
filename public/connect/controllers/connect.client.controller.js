/**
 * Created by sarin on 11/11/15.
 */
angular.module('connect').controller('connectController',['$scope','Authentication','$timeout','$document','Connect','$http',
    function($scope,Authentication,$timeout,$document,Connect,$http){

        $scope.showCancerTypeAhead = false;
        $scope.showCancerTypeAdd = true;

        $scope.showInterestsTypeAhead = false;
        $scope.showInterestsAdd = true;

        $scope.showLocationTypeAhead = false;
        $scope.showLocationAdd = true;

        /*$scope.locations = [];
        $scope.cancer_types = [];
        $scope.interests = [];*/

        $scope.formData = {};

       /* $scope.formCancerType = {};
        $scope.formInterests = {};
        $scope.formLocations = {};*/

        Connect.getChild.get({parentEmail: Authentication.user.email},function(response){

            var cancerType = response.cancer_type,
                interests = response.interests,
                locations = response.location;

            $scope.cancer_types={};
            $scope.cancer_types[cancerType] = true;
            $scope.interests={};
            for(var i=0;i<interests.length;i++){
                $scope.interests[interests[i]] = true;
            }
            $scope.locations = {};
            for(var i=0;i<locations.length;i++){
                $scope.locations[locations[i]] = true;
            }

            var filters = {
                'cancerType[]' : cancerType,
                'locations[]' : locations,
                'interests[]' : interests
            };

            Connect.getConnections.query(filters, function(response){
                console.log('Success in getConnections '+JSON.stringify(response));
                $scope.parents = response
            },function(error){
                console.log('Error in getConnections '+error);
            });


        }, function error(){
            console.log('error msg in currentChild');
            $scope.errorMsg = {type:"alert alert-danger", msg: "'Oops! Something unexpected occured!"}
        });

        $scope.showCancerTypeAddClicked = function(){
            $scope.showCancerTypeAdd = false;
            $timeout(function(){
                $scope.showCancerTypeAhead = true;
            }, 400);
        };

        $scope.onSelectCancerType = function ($item, $model, $label) {
            $scope.$item = $item;
            $scope.$model = "";
            $scope.$label = "";
            var cancerType = {};
            cancerType[$scope.$item] = true;
           /* alert($scope.$item + '1', $scope.$model + '2', $scope.$label + '3')*/
            $scope.cancer_types[$scope.$item] = true;
            $scope.showCancerTypeAhead = false;
            $timeout(function(){
                $scope.showCancerTypeAdd = true;
            }, 400);
        };

        $scope.showInterestsAddClicked = function(){
            $scope.showInterestsAdd = false;
            $timeout(function(){
                $scope.showInterestsTypeAhead= true;
            }, 400);
        };

        $scope.onSelectInterests = function ($item, $model, $label) {
            $scope.$item = $item;
            $scope.$model = "";
            $scope.$label = "";
            var interestType = $scope.$item;
            /* alert($scope.$item + '1', $scope.$model + '2', $scope.$label + '3')*/
            $scope.interests[interestType] = true;
            $scope.showInterestsTypeAhead = false;
            $timeout(function(){
                $scope.showInterestsAdd = true;
            }, 400);
        };

        $scope.showLocationAddClicked = function(){
            $scope.showLocationAdd = false;
            $timeout(function(){
                $scope.showLocationTypeAhead= true;
            }, 400);
        };

        $scope.onSelectLocation = function ($item, $model, $label) {
            $scope.$item = $item;
            $scope.$model = "";
            $scope.$label = "";
            /* alert($scope.$item + '1', $scope.$model + '2', $scope.$label + '3')*/
            $scope.locations[$scope.$item] = true;
            $scope.showLocationTypeAhead = false;
            $timeout(function(){
                $scope.showLocationAdd = true;
            }, 400);
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
                    return item.formatted_address;
                });
            });
        };

       /* $scope.getInputBoxes = function(cancer_types, locations, interests){
            console.log()
        }*/

        $scope.submit_filter = function(){
            var cancer_types = [];
            Object.keys($scope.cancer_types).forEach(function (key) {
                if($scope.cancer_types[key]){
                    cancer_types.push(key);
                }
            });
            var locations = [];
            Object.keys($scope.locations).forEach(function (key) {
                if($scope.locations[key]){
                    locations.push(key);
                }
            });
            var interests = [];
            Object.keys($scope.interests).forEach(function (key) {
                if($scope.interests[key]){
                    interests.push(key);
                }
            });
            var filters = {
                'cancerType[]' : cancer_types,
                'locations[]' : locations,
                'interests[]' : interests
            };

            Connect.getConnections.query(filters, function(response){
                console.log('Success in getConnections '+JSON.stringify(response));
                $scope.parents = response
            },function(error){
                console.log('Error in getConnections '+error);
            });
        };
    }
]);

/*angular.module('connect').directive("addCancerType", function($compile){
    return{
        restrict: 'A',
        link: function(scope , element){
            element.bind("click", function(e){
                scope.showTypeAhead = true;
                scope.showCancerTypeAdd = false;
                /!*var html ='<input ng-show="showTypeAhead" type="text" ng-model="asyncSelected" typeahead-append-to-body="true" placeholder="Search..." uib-typeahead="cancer for cancer in db_cancer_types | filter:$viewValue | limitTo:8"  typeahead-on-select="onSelect($item, $model, $label)" typeahead-min-length="2" class="form-control">';*!/
               /!* var e =$compile(html)(scope);
                element.parent().append(e);*!/

            });

            scope.doStuff = function(){
                alert('hey');
            }
        }
    }
});*/

/*
angular.module('connect').controller('mainConnectController',['$scope',
    function($scope){

    }
]);*/
