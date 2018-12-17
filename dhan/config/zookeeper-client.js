var ZooKeeper = require('node-zookeeper-client');

var client = ZooKeeper.createClient(config["ZOOKEEPER"].URL);

client.connect();

module.exports = client;