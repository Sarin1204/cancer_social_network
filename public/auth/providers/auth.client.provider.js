/**
 * Created by sarin on 10/25/15.
 */
angular.module('auth').provider('Auth', [
    function(){
        this.checkSignedin = function($q, $timeout, $http, $location, $rootScope,$window){
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            $http.get('/signedin').success(function(user){
                // Authenticated
                if (user !== '0') {
                    if ($window.user === undefined) {
                        $window.user = user;
                    }
                    deferred.resolve();
                }
                // Not Authenticated
                else { $rootScope.message = 'You need to log in.';
                    deferred.reject(); $location.url('/');
                }
            });
            return deferred.promise;
        };

        this.$get = function() {
            var checkSignedin = this.checkSignedin;
            return {
                checkSignedin: checkSignedin
            }
        };
    }
]);