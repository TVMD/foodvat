var db = require('../model/config-db');
var mongoose = require('mongoose');
var Place = new mongoose.Schema({
    id_place: String,
    nameplace:{type:String},
    address:String,
    location:{
      lat:Number,
      long:Number
    },
    type:Number,         //0:eat, 1:drink
    number_online:{
      type:Number,
      default:0
    },
    star:Number,
    founder_id_fb:String,
    create:Date,
    members:{ type : [] , default : [] },
    description:{type:String},
    menu:{type:[], default:[]},
    images:[]
});
Place.index({'$**': 'text'})
var exPlace = db.model('Place', Place);
module.exports = exPlace;
