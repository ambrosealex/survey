var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/create", {
        templateUrl: "partials/create.html"
    });
    $routeProvider.when("/home", {
        templateUrl: "partials/home.html"
    });
    $routeProvider.when("/poll/:id", {
        templateUrl: "partials/poll.html"
    });
    $routeProvider.otherwise({
        templateUrl: "partials/login.html"
    });
});
