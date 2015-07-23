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

countries["Ukraine"].hotels.push({ "id": "1074120565317571", "name" : "NEWhot","description": "some description"});
countries["UK"].hotels.push({ "id": "67834714427590370", "name" : "NEWhot","description": "some description"});
countries["Ukraine"].hotels[0].name = "NEWnewHot";
countries["Ukraine"].hotels[0].description = "NewDesc";
countries["Ukraine"].hotels[1].name = "NEWnewHot";
countries["Ukraine"].hotels[1].description = "asdasd";
countries["Ukraine"].hotels[1].description = "asdasdNEWNEWNEW";
countries["Ukraine"].hotels.splice(1, 1);
countries["Ukraine"].hotels.splice(1, 1);
