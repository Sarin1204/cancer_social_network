/**
 * Created by sarin on 10/31/15.
 */
angular.module('showFriendRequests').controller('ModalDemoCtrl',['$scope','$uibModal','$log','ShowFriendRequests',
    function ($scope, $uibModal, $log, ShowFriendRequests) {

        $scope.items = ['item1', 'item2', 'item3'];

        ShowFriendRequests.pendingFriendRequests.query(function (response) {
            console.log('Pending Friend Requests are '+JSON.stringify(response));
            $scope.friendRequests = response;
        }, function (error) {
            console.log('Oops, something unexpected occured!' + error);
            $scope.errorMsg = 'Oops, something unexpected occured!'
        });

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    friendRequests: function () {
                        return $scope.friendRequests;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }
]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('showFriendRequests').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, friendRequests) {

    $scope.friendRequests = friendRequests;
    $scope.selected = {
        friend: $scope.friendRequests[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.friend);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});