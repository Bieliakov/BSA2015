//(function() {
//    angular
//        .module('app')
//        .factory('Photos', Photos);
//
//    function Photos($http){
//        return {
//            getPhotos: function () {
//                var firstSeveralPhotos = [];
//                $http.get('http://jsonplaceholder.typicode.com/photos')
//                    .then(function (response) {
//                        var length = response.data.length;
//                        for (var i = 0; i < length; i++) {
//                            firstSeveralPhotos.push(response.data[i]);
//                            //console.log(response.data[i])
//                            if (response.data[i].id === 5)
//                                break;
//                        }
//                        //console.log(firstSeveralPhotos)
//                    }).catch(function (err) {
//                        console.log(err);
//                    });
//                return firstSeveralPhotos;
//            }
//        }
//    }
//})();
