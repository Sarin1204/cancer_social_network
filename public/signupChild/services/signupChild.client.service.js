/**
 * Created by sarin on 10/24/15.
 */

/*angular.module('signupChild').provider('Auth', [
    function(){
        this.checkSignedin = function($q, $timeout, $http, $location, $rootScope){
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            $http.get('/signedin').success(function(user){
                // Authenticated
                if (user !== '0') deferred.resolve();
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
]);*/

/*angular.module('signupChild').provider('helloWorld', function() {
    // In the provider function, you cannot inject any
    // service or factory. This can only be done at the
    // "$get" method.

    this.name = 'Default';

    this.$get = function() {
        var name = this.name;
        return {
            sayHello: function() {
                return "Hello, " + name + "!"
            }
        }
    };

    this.setName = function(name) {
        this.name = name;
    };
});*/

angular.module('signupChild').factory('SignupChild',['$resource',
    function($resource){
        return $resource('api/signupChild');
    }
]);