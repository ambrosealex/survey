var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res) {
      User.find({}).populate('polls').exec( function (err, users) {
          res.json({ users: users });
      })
  },
  create: function(req, res) {
      var user = new User({
          name: req.body.name
      });
      user.save(function (err){
          if(err){
              console.log(err);
          } else {
              console.log("Successfully Saved:", user);
          }
          res.json({ user: user })
      })
  }
}
