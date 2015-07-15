(function() {
    angular.module('app', ['ngResource'])
        .controller('testController', testController)
        .directive('customDirective', customDirective);

    function testController(Photos) {

        var vm = this;

        // via factory/$http or via or service/$resource
        vm.photos = Photos.getPhotos();

    }

    function customDirective(){
        return {
            template: "<img ng-src='{{photo.thumbnailUrl}}' />",
            replace: true,
            restrict: 'A',

            link: function(scope,iElement,attrs){
                iElement[0].addEventListener('click', function (event) {

                    var background = document.createElement('div');
                    var fullPicture = document.createElement('img');

                    background.className = 'background';
                    fullPicture.className = 'fullPicture';
                    fullPicture.src = scope.photo.url;
                    background.appendChild(fullPicture);

                    document.body.appendChild(background);

                    background.addEventListener('click', removeBackground);

                    function removeBackground(){
                        document.body.removeChild(background);
                    }
                });
            }
        }
    }
})();