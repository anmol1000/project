var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = config["MONGO"].URL;

var mongoPool = {
    start: function() {
        MongoClient.connect(url, {
            poolSize: config["MONGO"].POOL_SIZE
        },function(err, mongoDb) {
            assert.equal(null, err);
            var self = this;
            self.mongoDb = mongoDb;
            console.log("Successfully connected to mongo");
        });
    }
};

module.exports = mongoPool;