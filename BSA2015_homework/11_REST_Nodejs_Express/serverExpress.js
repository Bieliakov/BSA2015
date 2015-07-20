// server.js
// curl http://localhost:

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var countries = require('./countries'); 

var port =  8081 || process.env.PORT;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// format http://localhost:8081/restapi/country and so on

var countryRouter = express.Router();

countryRouter.route('/country')
    .get(function(request, response){
        response.json(countries.countries);
    })
    .post(function(request, response){
        
        // a bit of scary code for translating json in format ?name=parameter&description=parameter2
        
        var query = transformQuery(request.body)

        //console.log(request.body);
        response.json(countries.appendCountry(query));
        
    });


countryRouter.route('/country/:countryName')
    .get(function(request, response){
        response.send(countries.getCountryBySlug(request.params.countryName));
    })
    .post(function(request, response){
        
        // a bit of scary code for translating json in format ?name=parameter&description=parameter2
        
        var query = transformQuery(request.body)

        //console.log(request.body);
        response.json(countries.addHotelToCountry(request.params.countryName, query));
    });
    
    
countryRouter.route('/hotel/:hotelID')
    .get(function(request, response){
        response.send(countries.getHotelByID(request.params.hotelID));
    })
	.delete(function(request, response){
        response.send(countries.removeHotel(request.params.hotelID));
		
	})
    .put(function(request, response){
        
        var query = transformQuery(request.body);
        
        response.send(countries.updateHotel(request.params.hotelID, query));

	})
    .patch(function(request, response){
        
        var query = transformQuery(request.body);
        
        response.send(countries.updateHotel(request.params.hotelID, query));

	});

    
    

function transformQuery(requestBody){
    var query = '';
    var requestBodyKeys = Object.keys(requestBody);
    
    for (var i = 0; i < requestBodyKeys.length; i ++){
        query += requestBodyKeys[i] + '=' + requestBody[requestBodyKeys[i]];
        if (i == 0 && requestBodyKeys.length > 1) {
            query += '&';
        }
    };
    console.log(query);
    return query;
}


app.use('/restapi', countryRouter);

app.listen(port, function(){
   console.log("Listening on port " + port + "...");
});
    