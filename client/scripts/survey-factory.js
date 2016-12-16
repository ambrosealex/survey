app.factory("surveyFactory", ["$http", function ($http) {

    var factory = {};
    factory.user;
    factory.pollIndex = function (gotPolls) {
        $http.get("/polls").then(function (response) {
            gotPolls(response.data.polls, factory.user);
        });
    };
    factory.createPoll = function (newPoll, createdPoll) {
        $http.post('/createPoll', {newPoll: newPoll, user: factory.user}).then(function (response) {
            createdPoll(response.data.poll)
        });
    }
    factory.login = function(user, loggedInUser) {
        $http.post('/login', {name:user}).then(function (response) {
            factory.user = response.data.user;
            loggedInUser(response.data);
        });
    }
    factory.getPoll = function(pollId, gotPoll) {
        $http.get('/poll/'+pollId.id).then(function (response) {
            gotPoll(response.data.poll);
        })
    }
    factory.vote = function(pollId, optionId, updatedVoteCount) {
        $http.post('/vote/'+pollId.id, {index:optionId}).then(function (response) {
            updatedVoteCount(response.data.poll);
        })
    }
    factory.deletePoll = function(poll, pollGotDeleted) {
        console.log("THIS IS THE POLL", poll);
        $http.post('/destroy/'+poll._id).then(function (response) {
            pollGotDeleted(response.data.poll);
        })
    }
    return factory;

}]);
