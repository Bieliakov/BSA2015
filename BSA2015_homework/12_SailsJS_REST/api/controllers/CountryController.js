/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');

module.exports = {
  find: getAllCountries,

  getAllCountries: getAllCountries,
  getCountryBySlug: getCountryBySlug,
  getHotelByID: getHotelByID,
  appendCountry: appendCountry,
  addHotelToCountry: addHotelToCountry,
  removeHotel: removeHotel,
  updateHotel: updateHotel,

  _config : {
    blueprints: {
      actions: true,
      rest: true,
      shortcuts: true
    }
  },

  badRequest: function(req, res){
    res.badRequest('Sorry, bad request!');
  },

  customMessage: function(req, res){

    res.view('customMsg.ejs', {message: 'The best custom message ever :)'});
  }
  /*
  // I've played a bit with MySQL DB :)

  getAllCountries: function(req, res){
    Country.find().populate('hotels').exec(function(err,result){
      return res.send(result);
    });

  },
  getCountry: function(req,res){
    Country.findOne({name: req.param('name')}).populate('hotels').exec(function(err,result){
      return res.send(result);
    });

  },*/
   /*
  addCountry: function(req,res){
    Country.create({name: req.param('name')}).exec(function(err, country){
      return res.send(country);
    });

  },

  addHotel: function(req, res){
    Hotel.create({country: req.param('name')}).exec(function(err, hotel){
      return res.send(hotel);
    });
  },

  getHotelById: function(req,res){

    var idFromSlug = parseInt(req.param('id'));

    Hotel.findOne({id: idFromSlug}).exec(function(err, hotel){
      return res.send(hotel);
    });

  },
  deleteHotelById: function(req, res){
    Hotel.findOne({id: req.param('id')}).destroy().exec(function(err,result){
      return res.send(result);
    });

  },
  */


};


function getAllCountries(req, res){

  res.send(Object.keys(Country.countries));
}

function getCountryBySlug(req,res){

  var countryNameFromSlug = req.param('name');

  var countryNames = Object.keys(Country.countries);
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
  res.send(result);
}

function getHotelsByCountry(country) {
  var hotelsInCounty = Country.countries[country].hotels;

  return JSON.stringify(hotelsInCounty);
}

function getHotelByID(req, res){
  var hotelID = req.param('id');

  var countriesARR = Object.keys(Country.countries);
  var output = 'Sorry, there is no hotel with id ' + hotelID + ' in our database.';

  for (var i = 0; i < countriesARR.length; i++) {

    var currentHotelsArray = Country.countries[countriesARR[i]].hotels;
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
  res.send(output);
};


function appendCountry(req,res) {
  var query = '?name=' + req.param('name');// + '&' + req.param('description');

  var output = '';
  var countryName = '';
  var countryNames = Object.keys(Country.countries);
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

        fs.appendFile('./api/models/Country.js',
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
  res.send(output);
}

function addHotelToCountry(req, res){
  //console.log(req.param('name'));
  //console.log(req.param('hotelName'));
  var requestedCountryName = req.param('name');
  var query = '?name=' + req.param('hotelName');
  var output = '';
  var hotelName = '';
  var countryNames = Object.keys(Country.countries);
  var countryLowerCased = requestedCountryName.toLowerCase();
  var fullQueryString = query.toString();
  var positionName = fullQueryString.search(/^\?name=/);
  var positionDescription = fullQueryString.search(/&description=/);
  var hotelDescription = 'some description';

  for (var i = 0; i < countryNames.length; i++){
    //console.log(countryNames[i].toLowerCase())
    //console.log(Country.countries[countryNames[i]])
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

        var currentHotelsArray = Country.countries[countryNames[i]].hotels;
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
            './api/models/Country.js',
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
  res.send(output);
}

function removeHotel(req, res) {

  var requestedHotelId = req.param('id');

  var output = 'Sorry, there is no hotel with id ' + requestedHotelId + ' in our database.';
  var countryNames = Object.keys(Country.countries);

  for (var i = 0; i < countryNames.length; i++) {

    var currentHotelsArray = Country.countries[countryNames[i]].hotels;
    //console.log(currentHotelsArray);

    if (!currentHotelsArray) {
      // if there are no hotel in some countries then skip them
      continue;
    };
    for (var j = 0; j < currentHotelsArray.length; j++) {

      if (currentHotelsArray[j].id == requestedHotelId ) {
        fs.appendFile(
          './api/models/Country.js',
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
  res.send(output);
}

function updateHotel(req, res){

  var hotelID = req.param('id');
  var query = '?name=' + req.param('name');

  var countriesARR = Object.keys(Country.countries);
  var output = 'Sorry, there is no hotel with id ' + hotelID + ' in our database.';
  var fullQueryString = query.toString();
  var positionName = fullQueryString.search(/^\?name=/);
  var positionDescription = fullQueryString.search(/&description=/);
  var hotelName = '';
  var hotelDescription = '';


  for (var i = 0; i < countriesARR.length; i++) {

    var currentHotelsArray = Country.countries[countriesARR[i]].hotels;
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
            './api/models/Country.js',
            'countries["' + countriesARR[i] + '"].hotels[' + j + '].name = "' + hotelName + '";\n' +
            'countries["' + countriesARR[i] + '"].hotels[' + j + '].description = "' + hotelDescription + '";\n',
            function (err){
              if (err) throw err;
            });

          output = 'The ' + hotelName + ' is updated at the ' + countriesARR[i] + ' country';
          break;
        } else if (hotelName){
          fs.appendFile(
            './api/models/Country.js',
            'countries["' + countriesARR[i] + '"].hotels[' + j + '].name = "' + hotelName + '";\n',
            function (err){
              if (err) throw err;
            });

          output = 'The ' + hotelName + ' is updated at the ' + countriesARR[i] + ' country';
          break;
        } else if (hotelDescription){
          fs.appendFile(
            './api/models/Country.js',
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
  res.send(output);
}
