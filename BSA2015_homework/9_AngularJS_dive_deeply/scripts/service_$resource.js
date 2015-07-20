(function() {
    angular
        .module('app')
        .service('Photos', Photos);

    function Photos($resource){
        this.getPhotos = function () {
            var firstSeveralPhotos = [];

            $resource('http://jsonplaceholder.typicode.com/photos').query(function (response) {
                var length = response.length;
                for (var i = 0; i < length; i++) {
                    firstSeveralPhotos.push(response[i]);
                    if (response[i].id === 5) {
                        break;
                    }
                }
            });
            return firstSeveralPhotos;
        }; // end getPhotos function

    } // end 'Photos' service
})();