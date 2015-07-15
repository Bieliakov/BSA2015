//(function() {
//    angular
//        .module('app')
//        .service('Photos', Photos);
//
//    function Photos($resource){
//        this.getPhotos = function () {
//            var firstSeveralPhotos = [];
//
//            $resource('http://jsonplaceholder.typicode.com/photos').query(function (response) {
//                for (var prop in response) {
//                    firstSeveralPhotos.push(response[prop]);
//                    if (response[prop].id === 5) {
//                        break;
//                    }
//                }
//            });
//            return firstSeveralPhotos;
//        }; // end getPhotos function
//    } // end 'Photos' service
//})();
