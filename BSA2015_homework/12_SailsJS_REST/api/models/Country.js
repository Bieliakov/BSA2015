/**
* Country.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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

module.exports = {
  countries: countries
  /*
  connection: 'someMysqlServer',
  tableName: "country",
  attributes: {
    name: {
      type: 'string',
      primaryKey: true
    },
    description: {
      type: 'string'
    },
    hotels: {
      collection: 'hotel',
      via: 'owner'
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false
*/
};


countries["Newcountry"] = {};
countries["Newcountry"].hotels = [];
countries["Newcountry"].description = "some description";
countries["NewNEwcountry"] = {};
countries["NewNEwcountry"].hotels = [];
countries["NewNEwcountry"].description = "some description";
countries["Ukraine"].hotels.push({ "id": "72681871009990580", "name" : "bestHotel","description": "some description"});
countries["ukraine1"] = {};
countries["ukraine1"].hotels = [];
countries["ukraine1"].description = "some description";
countries["ukraine&name=newHOtel"] = {};
countries["ukraine&name=newHOtel"].hotels = [];
countries["ukraine&name=newHOtel"].description = "some description";
countries["Ukraine"].hotels.push({ "id": "53871794743463400", "name" : "NewHotelInUkr","description": "some description"});
countries["Ukraine"].hotels.push({ "id": "92645542812533680", "name" : "NewHotelInUkr","description": "some description"});
countries["Ukraine"].hotels.splice(0, 1);
countries["Ukraine"].hotels.splice(0, 1);
countries["Ukraine"].hotels.splice(0, 1);
countries["Ukraine"].hotels.splice(0, 1);
countries["UK"].hotels[1].name = "newName";
countries["UK"].hotels[1].name = "newName";
