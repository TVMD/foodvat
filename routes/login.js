var express = require('express');
var router = express.Router();
var User = require('../model/User');

router.post('/login', function(req, res) {
  var userObject = req.body;
  console.log(req.body);
  User.findOne({id_fb: userObject.id_fb }, function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
          res.json({login_status:false});
        }
        if (!err && user !== null) {
          console.log("no");
          console.log(user);
          res.json({login_status:true});
        } else {
          user = new User({
            id_fb: userObject.id_fb,
            name: userObject.name,
            birthday: userObject.birthday,
            gender: userObject.gender,
            avatar: userObject.avatar,
            email: userObject.email,
            created: Date.now()
          });
          user.save(function(err, user) {
            if(err) {
              res.json({login_status:false});
            } else {
              console.log("yes");
              res.json({login_status:true});
            }
          });
        }
        
      });
});

module.exports = router;
