app.controller("loginController", ["$scope", "surveyFactory", '$location', function ($scope, surveyFactory, $location) {
    surveyFactory.user = null;
    $scope.callLoginUser = function(name){
        surveyFactory.login(name, function(user) {
            $location.url('/home');
        });
    }
}]);

app.controller("homeController", ["$scope", "surveyFactory", '$location', function ($scope, surveyFactory, $location) {
    $scope.polls = [];
    $scope.user;
    surveyFactory.pollIndex(function (polls, user) {
        $scope.user = user;
        console.log("THIS IS USER", user);
        if(!user){
            $location.url('/');
        }
        $scope.polls = polls;
    });
    $scope.callDeletePoll = function (poll) {
        console.log("DELETE CALL: ", poll);
        surveyFactory.deletePoll(poll, function(data) {
            surveyFactory.pollIndex(function (polls, user) {
                $scope.user = user;
                $scope.polls = polls;
            });
        });
    }
}]);

app.controller("createController", ["$scope", "surveyFactory", '$location', function ($scope, surveyFactory, $location) {
    $scope.messages = [];
    $scope.callCreatePoll = function(newPoll) {
        $scope.messages = [];
        if(!newPoll){
            $scope.messages.push("Please fill out all fields");
            return;
        }
        if(!newPoll.question || !newPoll.option1 || !newPoll.option2 || !newPoll.option3 || !newPoll.option4){
            $scope.messages.push("Please fill out all fields");
            return;
        }
        if(newPoll.option1.length<3 || newPoll.option2.length<3 || newPoll.option3.length<3 || newPoll.option4.length<3 || newPoll.question.length < 8 ){
            $scope.messages.push("Question must be at least 8 characters and all options must be at least 3");
            return;
        }
        surveyFactory.createPoll(newPoll, function(poll) {
            $location.url('/poll/'+poll._id);
        })
    }
}]);

app.controller("pollController", ["$scope", "surveyFactory", "$routeParams", function ($scope, surveyFactory, $routeParams) {
    $scope.poll;
    surveyFactory.getPoll($routeParams, function(poll) {
        $scope.poll = poll;
    })
    $scope.callVote = function(index) {
        surveyFactory.vote($routeParams, index, function(data) {
            surveyFactory.getPoll($routeParams, function(poll) {
                $scope.poll = poll;
            })
        })
    }
}]);
