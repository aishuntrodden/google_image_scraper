var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.service('MyService', function () {

    this.name = '';
    this.storeName = function (Name) {


        this.name = Name;
    };
    this.getName = function () {

        return this.name;
    };
});
scotchTodo.controller('mainController', function ($scope, $http, $window, $rootScope, MyService) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    // $http.get('/api/todos')
    //     .success(function (data) {
    //         $scope.todos = data;
    //         console.log(data);
    //     })
    //     .error(function (data) {
    //         console.log('Error: ' + data);
    //     });

    // when submitting the add form, send the text to the node API
    $scope.search = function () {

        $http.post('/search', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })

            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.init = function () {
        $http.get('/itemget', {}).success(function (data) {
            $scope.list = data.data;
            //
        });
    }
    $scope.getImagePath = function (imageName) {
        debugger
        return "http://http://18.219.228.142:4000/images/" + imageName;
    };

    $scope.initpage3 = function () {
        // $scope.name;
        $http.get('/getpost').success(function (data) {
            debugger
            // path = "../images/"
            $scope.images = [`0${data.data}.jpg`, `1${data.data}.jpg`, `2${data.data}.jpg`, `3${data.data}.jpg`, `4${data.data}.jpg`, `5${data.data}.jpg`, `6${data.data}.jpg`, `7${data.data}.jpg`, `8${data.data}.jpg`, `9${data.data}.jpg`, `10${data.data}.jpg`, `11${data.data}.jpg`, `12${data.data}.jpg`, `13${data.data}.jpg`, `14${data.data}.jpg`];
            console.log("data ", data);
            debugger
        });
    }

    $scope.itemget = function () {
        //
        // $scope.url('./page2.html')
        // a = 'hello'
        $window.location = './page2.html'



    }
    $scope.getimages = function (name) {
        //
        a = {
            name: name
        }
        $http.post('/getimages', a)
            .success(function (data) {})



        $window.location = './page3.html'



    }
})