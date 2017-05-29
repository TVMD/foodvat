var express = require('express');
var router = express.Router();
var Place = require('../model/Place');
var Image = require('../model/Image');

var path = require('path');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('run',file);
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
}) 
var upload = multer({ storage: storage })


//geo https://github.com/manuelbieh/geolib

router.get('/get_list', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // var pl = new Place({
  //   nameplace:"Sonata Coffee Acoustic",
  //   address:"Gần ngã 3 trường Khoa học Tự nhiên",
  //   //10.873711, 106.801049
  //   location:{lat:10.874986, long:106.799488},
  //   type:0,
  //   description:"Cà phê , Sữa chua mít"
  // });
  // pl.save((err, pla)=>{
  //   if (err)
  //   console.log(err);
  //   res.json(pla);
  // })
  Place.find({}, {nameplace:1, address:1, location:1, type:1, menu:1, avatar:1, opentime:1}, function(err, place){
      if (err) 
        throw err;
    res.json(place);
  });
});
router.get('/get_list/:location', function(req, res, next) {
  
});
router.get('/get_list_search/:search_key', function(req, res, next) {
  Place.find({$text: { $search: req.params.search_key }}, function(err, list_place){
    if (err)
    console.log(err);
    res.json(list_place);
  });

});
router.get('/get_detail_place/:_id', function(req, res, next) {
  Place.findById(req.params._id, function(err, place){
      if (err)
      {
        console.log(err);
      }
        
        res.json(place);
  })
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
router.get('/get_random_food', function(req, res, next) {
  Place.find({type:0}).count({},function( err, count_food){
        //console.log( "Number of users:", count );
        var skip = getRandomInt(0,count_food - 1);
        console.log(count_food + " " + skip);
        var result = Place.findOne()
        .sort({type:1})
        .skip(skip)
        .limit(1)
        .exec(function(err, place){
            if (err)
            {
              console.log(err);
            }        
              res.json(place);
        });
    
  });
});
router.get('/get_random_drink', function(req, res, next) {
    Place.find({type:0}).count({},function( err, count_food){
        //console.log( "Number of users:", count );
        var count = Place.find({type:1}).count({},function( err, count){
            var skip = getRandomInt(count_food,count_food + count-1);
            console.log(count_food + " " + count + " " + skip);
            var result = Place.findOne()
            .sort({type:1})
            .skip(skip)
            .limit(1)
            .exec(function(err, place){
                if (err)
                {
                  console.log(err);
                }        
                  res.json(place);
            });
        });
    
  });
  
});

router.post('/create', function(req, res) {
  var placeObject = req.body;
  console.log(req.body);
  var newplace = new Place({
    nameplace:placeObject.nameplace,
    address:placeObject.address,
    location:{
      lat:placeObject.lat,
      long:placeObject.long
    },
    type:placeObject.type,         //0:eat, 1:drink
    founder_id_fb:placeObject.founder_id_fb,
    description:placeObject.menu,
    phone:placeObject.phone
  });
  newplace.save(function(err, place) {
    if(err) {
      res.json({status:fail});
    } else {
      console.log("yes");
      res.json({status:success});
    }
  });
  
});

router.get('/list_image/:id_place', function(req, res, next) {

  var result = Image
    .find({id_place:req.params.id_place})
    .sort({create: -1 })
    .exec(function(err, list_image){
      if (err)
      {
        console.log(err);
      }        
        res.json(list_image);
  });
});

router.post('/post_image', upload.single('avatar'), function (req, res,next) {
  console.log(req.file);
  var imageObject = req.body;
  var newImage = new Image({
    id_place:imageObject.id_place,
    id_user:imageObject.id_user,
    name_user:imageObject.name_user,
    review:imageObject.review,
    image: req.file.filename,   //"foodvat.herokuapp.com/uploads/" +
    create: Date.now()
  });
  newImage.save(function(err, image){
    if (err)
          {
            console.log(err);
          }        
            res.json({login_status:true});
      });

});

module.exports = router;


