angular.module('myApp', [])
    .controller('MyController', function($scope, $timeout) {
        $scope.clock = {};
        var updateClock = function() {
            $scope.clock.now = new Date();
            $timeout(function() {
                updateClock();
            }, 1000);
        };
        updateClock();
    });