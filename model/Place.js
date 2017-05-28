var db = require('../model/config-db');
var mongoose = require('mongoose');
var Place = new mongoose.Schema({
    nameplace:{type:String},
    address:String,
    location:{
      lat:Number,
      long:Number
    },
    type:Number,         //0:eat, 1:drink
    star:{type:Number, default:0},
    founder_id_fb:String,
    create:Date,
    avatar:{type:String, default:''},
    description:{type:String},
    menu:{type:[], default:[]},
    images:[],
    opentime:{type:String, default:"8AM - 10PM"},
    phone:String
});
Place.index({'$**': 'text'})
var exPlace = db.model('Place', Place);
module.exports = exPlace;
