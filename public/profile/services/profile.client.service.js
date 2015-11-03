/**
 * Created by sarin on 10/30/15.
 */
angular.module('profile').factory('Profile', ['$resource',
    function($resource) {
        return{
            currentProfile:  $resource('api/profile/:profileEmail', {
                profileEmail: '@profileEmail'
                }, {
                    update: {
                    method: 'PUT'
                    }
                }),
            currentChild: $resource('api/profileChild/:parentEmail', {
                parentEmail: '@parentEmail'
                }),
            profileStatuses: $resource('/api/profileStatus/:profileEmailForStatus', {
                profileEmailForStatus: '@profileEmailForStatus'
            }),
            getFriends: $resource('/api/profile/getFriendsForProfile/:profileEmail/:limit',{
                profileEmail: '@profileEmail',
                limit: '@limit'
            })
        };
    }]);

