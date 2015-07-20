var fs = require('fs');

var countries = {
    "Ukraine": {
        "description": "Ukraine country description",
        "hotels": [
            {
                "id": "1",
                "name": "Tourist",
                "description": "Tourist hotel description" 
            },
            {
                "id": "2",
                "name": "Slavutych",
                "description": "Slavutych hotel description"
            },
            {
                "id": "3",
                "name": "Karavella",
                "description": "Karavella hotel description"
            }
        ]
    },
    
    "UK" : {
        "description": "United Kingdom country description",
        "hotels": [
            {
                "id": "4",
                "name": "Great Palace",
                "description": "Great Palace hotel description" 
            },
            {
                "id": "5",
                "name": "Riviera",
                "description": "Riviera hotel description"
            },
            {
                "id": "6",
                "name": "Long river",
                "description": "Long river hotel description"
            }
        ]
    }
}

function getCountryBySlug(countryNameFromSlug){
    
    var countryNames = Object.keys(countries);
    var result = 'Sorry, there are no hotels in ' + countryNameFromSlug + ' country in our database.';
    
    for (var i = 0; i < countryNames.length; i++) {
        //console.log(countryNameFromSlug)
        //console.log(countryNames[i])  
        if (countryNames[i].toLowerCase() == countryNameFromSlug.toLowerCase() ) {
            // hotels in current country
            //console.log(countryNames[i])
            result = getHotelsByCountry(countryNames[i]);
            break;
        }
    }
    return result;
}

function getHotelsByCountry(country) {
    var hotelsInCounty = countries[country].hotels;
    
    return JSON.stringify(hotelsInCounty);
}

function getHotelByID(hotelID){
    var countriesARR = Object.keys(countries);
    var output = 'Sorry, there is no hotel with id ' + hotelID + ' in our database.';

    for (var i = 0; i < countriesARR.length; i++) {
            
            var currentHotelsArray = countries[countriesARR[i]].hotels;
            //console.log(currentHotelsArray);
            
            if (!currentHotelsArray) {
                // if there are no hotel in some countries then skip them
                continue;
            };
            for (var j = 0; j < currentHotelsArray.length; j++) {
                
                if (currentHotelsArray[j].id == hotelID ) {
                    output = JSON.stringify(currentHotelsArray[j]);
                    break;
                }
            }
    };
    return output;
};


function appendCountry(query) {
    var output = '';
    var countryName = '';
    var countryNames = Object.keys(countries);
    var fullQueryString = query.toString();

    var positionDescription = fullQueryString.search(/&description=/);
    var countryDescription = 'some description';

    // if there is a "?name=" string in query
    var positionName = fullQueryString.search(/^\?name=/);
    if (positionName == -1){

        output = 'Please enter country name in format ?name=parameter';
        
    } else {
    
        // if there is only name property is specified slice till the end of the URL
        countryName = fullQueryString.slice(positionName + 6);
        var countryLowerCased = countryName.toLowerCase();
        
        if (positionDescription != -1) {
            // if there are name and description values specified - slice till the beginning of the description property
            countryName = fullQueryString.slice(positionName + 6, positionDescription);
            countryLowerCased = countryName.toLowerCase();
            
            // slice description value till the end of the URL
            countryDescription = fullQueryString.slice(positionDescription + 13);
            //console.log(positionDescription);
            //console.log(countryDescription);
        }
        
        for (var i = 0; i < countryNames.length; i++){
            //console.log(countryNames[i].toLowerCase())
            //console.log(countryLowerCased)
            if (countryLowerCased == countryNames[i].toLowerCase()){
                output = 'Sorry, there is already ' + countryName + ' country present in our database.';
                break;
            } else if (i == countryNames.length - 1) {
                
                fs.appendFile('countries.js',
                    'countries["' + countryName + '"] = {};\n' + 
                    'countries["' + countryName + '"].hotels = [];\n' +
                    'countries["' + countryName + '"].description = "' + countryDescription + '";\n'
                    , function (err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
                
                output = 'The ' + countryName + ' country is appended to the database';
            }

        } // end for loop
        
    } // end else block where positionName != 1
    return output;
}

function addHotelToCountry(requestedCountryName, query){
    
    var output = '';
    var hotelName = '';
    var countryNames = Object.keys(countries);
    var countryLowerCased = requestedCountryName.toLowerCase();
    var fullQueryString = query.toString();
    var positionName = fullQueryString.search(/^\?name=/);
    var positionDescription = fullQueryString.search(/&description=/);
    var hotelDescription = 'some description';
    
    for (var i = 0; i < countryNames.length; i++){
        //console.log(countryNames[i].toLowerCase())
        //console.log(countries.countries[countryNames[i]])
        if (countryLowerCased == countryNames[i].toLowerCase()){

            // if there is a "?name=" string in query
            if (positionName != -1){
                // if there is only name property is specified slice till the end of the URL
                hotelName = fullQueryString.slice(positionName + 6);
                var hotelLowerCased = hotelName.toLowerCase();

                if (positionDescription != -1) {
                    // if there are name and description values specified - slice till the beginning of the description property
                    hotelName = fullQueryString.slice(positionName + 6, positionDescription);
                    hotelLowerCased = hotelName.toLowerCase();
                    
                    // slice description value till the end of the URL
                    hotelDescription = fullQueryString.slice(positionDescription + 13);
                    //console.log(positionDescription);
                    //console.log(hotelDescription);
                }
                
                var currentHotelsArray = countries[countryNames[i]].hotels;
                //console.log(currentHotelsArray);
                
                if (!currentHotelsArray.length) {
                    // if there is no specified hotel present the country db
                    appendHotel();
                    break;
                } else {
                    // check whether specified hotel is already present in the db
                    for (var j = 0; j < currentHotelsArray.length; j++) {
                        if (currentHotelsArray[j].name.toLowerCase() == hotelLowerCased ) {
                            break;
                        } else if (j == currentHotelsArray.length - 1) {
                            appendHotel();
                        }
                    }
                    
                };
                
                function appendHotel(){
                    fs.appendFile(
                        'countries.js',
                        'countries["' + countryNames[i] + '"].hotels.push(' + 
                        '{ "id": "' + Math.floor(Math.random() * 10e16) + '", ' +
                        '"name" : "' + hotelName + '",' +
                        '"description": "' + hotelDescription + '"'
                        
                        + '});\n',
                        function (err){
                            if (err) throw err;
                    });
                    
                    output = 'The ' + hotelName + ' is appended to ' + countryNames[i];
                    
                };
                //console.log(hotelLowerCased)
                //console.log(requestedCountryName)
            } else {
                output = 'Please, specify a hotel name';
            };
        }
        
    } // end for
    return output;
}        
            
function removeHotel(requestedHotelId) {
    
    var output = 'Sorry, there is no hotel with id ' + requestedHotelId + ' in our database.';
    var countryNames = Object.keys(countries);
    
    for (var i = 0; i < countryNames.length; i++) {
            
        var currentHotelsArray = countries[countryNames[i]].hotels;
        //console.log(currentHotelsArray);
        
        if (!currentHotelsArray) {
            // if there are no hotel in some countries then skip them
            continue;
        };
        for (var j = 0; j < currentHotelsArray.length; j++) {
            
            if (currentHotelsArray[j].id == requestedHotelId ) {
                fs.appendFile(
                            'countries.js',
                            'countries["' + countryNames[i] + '"].hotels.splice(' + 
                            j + ', 1);\n',
                            function (err){
                                if (err) throw err;
                            console.log('The hotel was deleted!');
                });
                output = 'The ' + currentHotelsArray[j].name + ' is deleted from ' + countryNames[i];
            }
        }
    };
    return output;
}

function updateHotel(hotelID, query){
    var countriesARR = Object.keys(countries);
    var output = 'Sorry, there is no hotel with id ' + hotelID + ' in our database.';
    var fullQueryString = query.toString();
    var positionName = fullQueryString.search(/^\?name=/);
    var positionDescription = fullQueryString.search(/&description=/);
    var hotelName = '';
    var hotelDescription = '';

    
    for (var i = 0; i < countriesARR.length; i++) {
        
        var currentHotelsArray = countries[countriesARR[i]].hotels;
        //console.log(currentHotelsArray);
        
        if (!currentHotelsArray) {
            // if there are no hotel in some countries then skip them
            continue;
        };
        for (var j = 0; j < currentHotelsArray.length; j++) {
            
            if (currentHotelsArray[j].id == hotelID ) {
                if (positionName != -1){
                    // if there is only name property is specified slice till the end of the URL
                    hotelName = fullQueryString.slice(positionName + 6);
                }
                if (positionDescription != -1) {
                    // if there are name and description values specified - slice till the beginning of the description property
                    hotelName = fullQueryString.slice(positionName + 6, positionDescription);
                   
                    // slice description value till the end of the URL
                    hotelDescription = fullQueryString.slice(positionDescription + 13);
                    //console.log(positionDescription);
                    //console.log(hotelDescription);
                }
                if (hotelName && hotelDescription) {
                    //console.log(j)
                    fs.appendFile(
                        'countries.js',
                        'countries["' + countriesARR[i] + '"].hotels[' + j + '].name = "' + hotelName + '";\n' + 
                        'countries["' + countriesARR[i] + '"].hotels[' + j + '].description = "' + hotelDescription + '";\n',
                        function (err){
                            if (err) throw err;
                    });
                    
                    output = 'The ' + hotelName + ' is updated at the ' + countriesARR[i] + ' country';
                    break;
                } else if (hotelName){
                    fs.appendFile(
                        'countries.js',
                        'countries["' + countriesARR[i] + '"].hotels[' + j + '].name = "' + hotelName + '";\n',
                        function (err){
                            if (err) throw err;
                    });
                    
                    output = 'The ' + hotelName + ' is updated at the ' + countriesARR[i] + ' country';
                    break;
                } else if (hotelDescription){
                    fs.appendFile(
                        'countries.js',
                        'countries["' + countriesARR[i] + '"].hotels[' + j + '].description = "' + hotelDescription + '";\n',
                        function (err){
                            if (err) throw err;
                    });
                    break;
                }
                break;
            }
        }
    };
    return output;
}

module.exports = {
    countries: countries,
    getCountryBySlug: getCountryBySlug,
    getHotelsByCountry : getHotelsByCountry,
    getHotelByID: getHotelByID,
    appendCountry: appendCountry,
    addHotelToCountry: addHotelToCountry,
    removeHotel: removeHotel,
    updateHotel: updateHotel,
}

