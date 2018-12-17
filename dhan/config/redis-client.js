var redis = require('redis');
var redisClient = redis.createClient(config["REDIS"].REDIS_PORT , config["REDIS"].REDIS_HOST);

redisClient.on('connect',function(err,reply){
    if(err){
        log.error("Couldn't connect to redis");
    }
    else{
        log.info("connected to redis host :" + config["REDIS"].REDIS_HOST);
    }
});

redisClient.on("error", function (err) {
    log.error("Error " + err);
});

module.exports = redisClient;
