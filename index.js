var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var imageSearch = require('node-google-image-search');
const GoogleImages = require('google-images');
const scraper = require('./scraper');
const http = require('http')
const path = require('path')
const Jimp = require("jimp");

// "mongodb://localhost:27017/mydb"
var url = "mongodb://aishwary:chanakya123@ds113169.mlab.com:13169/mydb"
var fs = require('fs')
const dbconnection = require('./config/dbconfig');
// configuration =================
var route = require('./route')
// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu'); // connect to mongoDB database on modulus.io
var MongoClient = require('mongodb').MongoClient;

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use('/images', express.static(path.resolve('./images/')));

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/get', function (req, res) {

    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//routes\
// require('./route');

app.get('/itemget',
    function (req, res) {
        //
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("keywords").find({}).toArray(function (err, result) {

                console.log("result ", result);
                if (err) throw err;
                db.close();

                res.json({
                    "data": result
                });
            });
        });
        app.get('/getpost', function (req, res) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.collection("post").find({}).toArray(function (err, result) {

                    console.log("result ", result)
                    if (err) throw err;
                    db.close();
                    var a = result[result.length - 1].post
                    var b = []
                    // debugger
                    // for (var ii = 0; ii < 15; ii++) {

                    //     Jimp.read(`./images/${ii}${a}`, function (err, image) {
                    //         // do stuff with the image (if no exception)

                    //         console.log("`${ii}${a}.jpg` ", `${ii}${a}.jpg`);
                    //         b[ii] = image
                    //         debugger
                    //         console.log(b)
                    //     })
                    // }
                    // debugger
                    res.json({
                        "data": a
                    });

                })

            });
        })

        app.post('/getimages', function (req, res) {

            post = req.body.name
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.createCollection("post", function (err, res) {
                    if (err) throw err;
                    console.log("post Collection created!");
                    db.close();
                });
            });
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var myobj = {
                    post: post
                };
                dbo.collection("post").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("1 post inserted");
                    db.close();
                });
            });
        })
    })
app.post('/search', function (req, res) {
    keyword = req.body.text
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = {
            keyword: req.body.text
        };
        dbo.collection("keywords").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 keyword inserted");
            scraper.start(keyword)
            db.close();
        });
    });
});

// create a todo, information comes from AJAX request from Angular
// Todo.create({
//     text: req.body.text,
//     done: false
// }, function (err, todo) {
//     if (err)
//         res.send(err);

//     // get and return all the todos after you create another
//     Todo.find(function (err, todos) {
//         if (err)
//             res.send(err)
//         res.json(todos);
//     });
// });


// scraper.start();
dbconnection.dbconnection();
// listen (start app with node server.js) ======================================
app.listen(4000);
console.log("App listening on port 3000");