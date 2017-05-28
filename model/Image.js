var db = require('../model/config-db');
var mongoose = require('mongoose');
var Image = new mongoose.Schema({
    id_place:{type:String},
    id_user:String,
    name_user:String,
    image:String,
    review:String,
    create:Date
});
Image.index({'$**': 'text'})
var exImage = db.model('Image', Image);
module.exports = exImage;
