var express = require('express');
var router = express.Router();
var Place = require('../model/Place');


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
  Place.find({}, {nameplace:1, address:1, location:1, type:1, menu:1}, function(err, place){
      if (err) 
        throw err;
    res.json(place);
  });
});
router.get('/get_list/:location', function(req, res, next) {
  
});
router.get('/get_list_search/:search_key', function(req, res, next) {
  //Place.index({nameplace:1, description:1});
  //Place.index({'$**': 'text'});
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
router.get('/get_random_food', function(req, res, next) {
  var count = Place.count({type:0});
  var skip = Math.random(0,count-1);
  var result = Place.findOne({type:0}, function(err, place){
      if (err)
      {
        console.log(err);
      }
        
        res.json(place);
  }).skip(skip);
});

// router.post('/login', function(req, res) {
//   var userObject = req.body;
//   console.log(req.body);
//   User.findOne({id_fb: userObject.id_fb }, function(err, user) {
//         if(err) {
//           console.log(err);  // handle errors!
//           res.json({login_status:false});
//         }
//         if (!err && user !== null) {
//           console.log("no");
//           console.log(user);
//           res.json({login_status:true});
//         } else {
//           user = new User({
//             id_fb: userObject.id_fb,
//             name: userObject.name,
//             birthday: userObject.birthday,
//             gender: userObject.gender,
//             avatar: userObject.avatar,
//             email: userObject.email,
//             created: Date.now()
//           });
//           user.save(function(err, user) {
//             if(err) {
//               res.json({login_status:false});
//             } else {
//               console.log("yes");
//               res.json({login_status:true});
//             }
//           });
//         }
        
//       });
// });

module.exports = router;
