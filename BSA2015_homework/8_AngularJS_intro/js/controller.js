
angular.module('app', [])
    .controller('usersController', function($scope) {



        $scope.people = [{name: 'John', home_city: 'New York', age: '20', avatar: 'jimKerry.gif'},
                        {name: 'Mark', home_city: 'Kyiv', age: '23', avatar: 'cat.jpg'}];
        $scope.addPerson = function (){
            $scope.people.push({name: 'name',
                                home_city: 'New York',
                                age: Math.floor(Math.random()*100),
                                avatar: 'raduga.jpeg' });

            // don't look into commented code :)
            /*
            if ($scope.people[$scope.people.length - 2].name === $scope.people[$scope.people.length - 1].name) {
                $scope.people.pop()
            }
            */
            /*for (var i = 0; i< $scope.people.length - 1; i++) {
                if ($scope.people[i].name === $scope.people[$scope.people.length - 1].name) {
                    $scope.people.pop()
                }
            }*/
        };
        $scope.removePerson = function (index){
            $scope.people.splice(index,1);
        };

        $scope.showPeopleList = true;

        $scope.toggleViewPeople = function(){
            $scope.showPeopleList = !$scope.showPeopleList;
        };
    })
    .controller('productsController', function($scope){
        $scope.products = [{ title: 'Teddy bear', price: '50$'},{title: 'Cat', price: '80$'}]

        $scope.addProduct = function (){
            $scope.products.push({title: 'Dog', price: Math.floor(Math.random()*50) + '$' });

        };
        $scope.removeProduct = function (index){
            $scope.products.splice(index,1);
        };

        $scope.showProductsList = true;

        $scope.toggleViewProducts = function(){
            $scope.showProductsList = !$scope.showProductsList;
        };
    });



