var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');

var currentOptions;

module.exports = {
  index: function(req, res) {
      Poll.find({}).populate('_user').exec( function (err, polls) {
          res.json({ polls: polls });
      })
  },
  create: function(req, res) {
      var poll = new Poll({
          question: req.body.newPoll.question,
          options: [{option: req.body.newPoll.option1, votes: 0},
                    {option: req.body.newPoll.option2, votes: 0},
                    {option: req.body.newPoll.option3, votes: 0},
                    {option: req.body.newPoll.option4, votes: 0}],
          _user: req.body.user
      });
      poll.save(function (err){
          if(err){
              console.log(err);
          } else {
              console.log("Successfully Saved:", poll);
          }
          res.json({ poll: poll })
      })
  },
  getOneById: function(req, res) {
      Poll.findOne({_id: req.params.id}, function(err, poll) {
          currentOptions = poll.options;
          res.json({ poll: poll });
      })
  },
  vote: function(req, res) {
      var votes = currentOptions[req.body.index].votes
      currentOptions[req.body.index].votes = votes + 1;
      Poll.update({_id: req.params.id}, {$set: {options: currentOptions}}, function(err, poll) {
        //   console.log("VOTES:", poll.options[req.body.index].votes);
        //   poll.options[req.body.index].votes = poll.options[req.body.index].votes + 1;
          if(err){
              console.log(err);
          } else {
              console.log("Successfully Saved:", poll);
          }
          res.json({ poll: poll });
    })
    },
    destroy: function(req, res) {
        console.log("REQ PARAMS:", req.params);
        Poll.remove({_id: req.params.id}, function(err, poll) {
            if(err){
                console.log(err);
            } else {
                console.log("Successfully Saved:", poll);
            }
            res.json({update: "deleted"});
        })
    }
}
