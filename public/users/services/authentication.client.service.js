/**
 * Created by sarin on 10/21/15.
 */
angular.module('users').factory('Authentication', [
    function(){
        this.user = window.user;

        return{
            user: this.user
        };
    }
]);