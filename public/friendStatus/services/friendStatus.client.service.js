/**
 * Created by sarin on 11/1/15.
 */
angular.module('friendStatus').factory('FriendStatus',['$resource',
    function($resource) {
        return {
            getRelationship: $resource('/api/profileCheckRelationship/:profileEmailForRelationship',{
                profileEmailForRelationship: '@profileEmailForRelationship'
            }),
            addFriend: $resource('/api/addPendingFriendRequest/'),

            confirmFriend: $resource('/api/confirmPendingFriendRequest/'),

            deleteFriend: $resource('/api/deletePendingFriendRequest')

        };
    }
]);