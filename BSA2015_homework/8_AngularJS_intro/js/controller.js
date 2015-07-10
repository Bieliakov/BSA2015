
angular.module('app', [])
    .controller('firstController', function($scope) {
        $scope.people = [{name: 'John', 'home city': 'New York', age: '20'},
                        {name: 'Mark', 'home city': 'Kyiv', age: '23'}];
        $scope.addPerson = function (){
            $scope.people.push({name: 'name', 'home city': 'New York', age: '20'});

        };
        $scope.removePerson = function (){
            $scope.people.pop();

        };
    });



