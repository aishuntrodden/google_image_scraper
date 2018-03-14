const scraper = require('./scraper')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://aishwary:chanakya123@ds113169.mlab.com:13169/mydb"
var request = require('request')
var fs = require('fs');
var Jimp = require("jimp");

function start(req) {
    keyword = req
    array = []
    // const GoogleImages = require('google-images');
    // const client = new GoogleImages('xcfpsrkuwrm', 'AIzaSyB2UEQDsPbagOinc8KSfdZD0qUfb2ZKyzM');

    // client.search('Steve Angello')
    //     .then(images => {
    //
    //     })
    var Scraper = require('images-scraper'),
        google = new Scraper.Google();

    google.list({
            keyword: keyword,
            num: 15,
            detail: true,
            nightmare: {
                show: true
            }
        })
        .then(function (res) {
            console.log('first 10 results from google', res);
            // keywordinsert();
            //
            imagesaver(res, keyword);
            return (res)
        }).catch(function (err) {
            console.log('err', err);
        });

    // you can also watch on events
    google.on('result', function (item) {
        // console.log('out', item);

    });
}

function wait(add, keyword) {
    return new Promise((resolve) => {
        Jimp.read(add, function (err, lenna) {
            debugger
            if (err) throw err;
            lenna
                .greyscale() // set greyscale
                .write(`./images/${i}${keyword}.jpg`); // save
            resolve();
        });
    })
};
async function imagesaver(res, keyword) {

    for (i = 0; i < res.length; i++) {


        add = res[i].url;
        await wait(add, keyword);



    }


}



module.exports = {
    start
}