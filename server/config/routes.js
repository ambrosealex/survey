// here we load the Poll and User model
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var polls = require('../controllers/polls.js');
var User = mongoose.model('User');
var users = require('../controllers/users.js');

module.exports = function(app) {
    app.get('/polls', polls.index);
    app.post('/login', users.create);
    app.post('/createPoll', polls.create);
    app.get('/poll/:id', polls.getOneById);
    app.post('/vote/:id', polls.vote);
    app.post('/destroy/:id', polls.destroy);
}
