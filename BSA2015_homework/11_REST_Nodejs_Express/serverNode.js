// server.js

var http = require('http');

var countries = require('./countries'); 

var port = 8081;

// format http://localhost:8081/restapi/country and so on

http.createServer(function (request, response) {
    
    var output = '';
    
    response.writeHead(200, {"Content-Type": "application/json"});
    
    //console.log(request.url)

    // get country list 
    if (request.url.search(/\/restapi\/country\/?$/) != '-1' && request.method == 'GET' ) {
        
        output = JSON.stringify(Object.keys(countries.countries));
        writeResponseAndEnd(output);

    } else if (request.url.search(/\/restapi\/country\/[a-z]+\_?\-?[a-z]*\/?$/i) != '-1' && request.method == 'GET' ) {
        // get hotel list in specific country
        
        // /country/CountrynameParameter format
        
        // in current REST API there wasn't any requirements for slugs, so it will be simplified a bit
        
        // extract from request.url part with countryName
        var countryNameFromSlug = request.url.replace(/(\/restapi\/country\/)([a-z]+\_?\-?[a-z]*)\/?$/i, '$2');
        
        //console.log(countryNameFromSlug)
        output = countries.getCountryBySlug(countryNameFromSlug);
        writeResponseAndEnd(output);
        
        
    } else if (request.url.search(/\/restapi\/hotel\/[0-9]+\/?$/i) != '-1' && request.method == 'GET' ) {

        //console.log(request.url)
        var requestedHotelId = request.url.replace(/(\/restapi\/hotel\/)([0-9]+)\/?$/i, '$2');
        output = countries.getHotelByID(requestedHotelId);
        writeResponseAndEnd(output);
    };

    // add country to country list
    // add country in format ?name=parameter&
    if (request.url.search(/\/restapi\/country\/?$/) != '-1'  && request.method == 'POST') {

        request.on('data', function (query){
            output = countries.appendCountry(query)
            writeResponseAndEnd(output);
        });
        request.on('end', function (){
            response.end();
        });
       
    }
   
    // add hotel to specific country
    // add hotel in format ?name=parameter
    // or ?name=parameter&description=parameter2
    
    if (request.url.search(/\/restapi\/country\/[a-z]+\_?\-?[a-z]*$/i) != '-1'  && request.method == 'POST') {

        // get country name from the url
        var requestedCountryName = request.url.replace(/(\/restapi\/country\/)([a-z]+\_?\-?[a-z]*)\/?$/i, '$2');
        
        request.on('data', function (query){
            output = countries.addHotelToCountry(requestedCountryName, query);
            writeResponseAndEnd(output)
        });

        request.on('end', function (){
            response.end();
        })
       
    }
    
    // delete specific hotel by id
    
    if (request.url.search(/\/restapi\/hotel\/[0-9]+$/) != '-1' && request.method == 'DELETE'){

        var requestedHotelId = request.url.replace(/(\/restapi\/hotel\/)([0-9]+)\/?$/i, '$2');
        output = countries.removeHotel(requestedHotelId);
        writeResponseAndEnd(output);
    }

    // method is patch or put for updating information about specific hotel
    
    if (request.url.search(/\/restapi\/hotel\/[0-9]+$/) != '-1' && request.method == 'PATCH' || 
        request.url.search(/\/restapi\/hotel\/[0-9]+$/) != '-1' && request.method == 'PUT'){
        
        var requestedHotelId = request.url.replace(/(\/restapi\/hotel\/)([0-9]+)\/?$/i, '$2');
        
        //console.log(requestedHotelId);
        
        request.on('data', function (query){
            output = countries.updateHotel(requestedHotelId, query);
            writeResponseAndEnd(output)
        });

        request.on('end', function (){
            response.end();
        });
        
    }

    function writeResponseAndEnd(result){
        response.write(result);
        response.end();
    };
}).listen(port);
