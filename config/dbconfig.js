var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://aishwary:chanakya123@ds113169.mlab.com:13169/mydb"

function dbconnection() {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("keywords", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}
module.exports = {
    dbconnection
}