/**
 * Created by sarin on 10/21/15.
 */
angular.module('home').controller('HomeController', ['$scope',
    'Authentication',
    function($scope, Authentication){
        $scope.authentication = Authentication
    }
]);