/**
 * Created by sarin on 10/21/15.
 */
var mainApplicationModuleName = 'cancer_network';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','ngTagsInput','ui.bootstrap','auth','users','home','signupParent','signupChild','dashboard']);

mainApplicationModule.config(['$locationProvider','$httpProvider',
    function($locationProvider,$httpProvider){
        $locationProvider.hashPrefix('!');
        $httpProvider.interceptors.push(function($q, $location)
        {
            return {
                response: function(response) {
                    // do something on success
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401) {
                        console.log("In responseError")
                        $location.url('/');
                    }
                    return $q.reject(response);
                }
            };
        });
    }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});


