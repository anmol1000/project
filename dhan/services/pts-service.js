var async = require('asyncawait/async');
var await = require('asyncawait/await');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var redisClient = require('../config/redis-client');
var cron = require('node-cron');
var models = require('../models');
var Edition = models.Edition;
var CampaignService = require('../services/campaign-service');
var lock = require("redis-lock")(redisClient);
var Promise = require('bluebird');
var AmsUtils = require('../utils/ams-utils');
var models = require('../config/db');
var User = models.User;
var cmd = require('node-cmd');

var PushToSyncService = (function () {
    function PushToSyncService() {
    }


    PushToSyncService.prototype.schedulePushToSync = function (options, callback) {
        var serviceUid = options.serviceUid;
        var campaignName = options.campaignName;
        var editionId = options.editionId;
        var redisKey = cmsConstants.PTS_KEY;
        Edition.find({
            where:{
                id:editionId
            }
        }).then(function (success) {
            success = JSON.parse(JSON.stringify(success));
            if (!success){
                var message = "Edition not found with given parameters";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
                return callback(err, null);
            }
            redisClient.sadd(redisKey, serviceUid);
            redisClient.set(redisKey + "_" + serviceUid, campaignName);
            log.info("Redis keys set for:" + redisKey + "::" + serviceUid);
            return callback(null, "Key added");
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };
    
    var startConsumer = async(function () {

        var campaignService = new CampaignService();
        var redisKey = cmsConstants.PTS_KEY;
        return new Promise(function(resolve, reject){

            var task = cron.schedule('*/15 * * * *', function() {
                lock(cmsConstants.PTS_LOCK_KEY, function(done) {

                    setTimeout(done, 1000);
                    log.info("Running task every 15 minute");
                    redisClient.smembers(redisKey, function(err, results) {
                        var serviceUids = results;
                        log.info("Members for push to sync is " + results);
                        for (var i in serviceUids ){
                            redisClient.get("PTS_" + serviceUids[i],function (err, reply) {
                                var campaignRequest = {
                                    serviceUid:serviceUids[i],
                                    campaignName:reply
                                };
                                campaignService.sendPushToSyncCampaign(campaignRequest, function (error, results) {
                                    if (error){
                                        return callback(error, null);
                                    }
                                    redisClient.del("PTS_" + serviceUids[i]);
                                    redisClient.srem("PTS", serviceUids[i]);
                                    return callback(null, "Push to sync sent");
                                    done();
                                });
                            });
                        }
                    });
                });
            }, false);
            task.start();
            resolve("Cron started");
        });
    });

    var jflScraper = async(function () {
        return new Promise(function(resolve, reject){

            var task = cron.schedule('*/45 * * * *', function() {
                var url = "https://9gag.com/trending";
                request(url, function (error, response, html) {
                    var $ = cheerio.load(html);

                    $('div[id="container"] > div > div > section[id="list-view-2"]').find('div').children().each(function (index, element) {

                        var href = $(element).find('article > div > a > img').attr('src');
                        var title = $(element).find('article > header > a > h1').text();
                        if (!href){
                            var href = $(element).find('article > div > a > div > video > source').attr('src');
                        }
                        if (href && title){
                            redisClient.hset(cmsConstants.SCRAPER_KEY, href, title);
                        }
                    });
                    resolve("Done");
                });
            }, false);
            task.start();
            resolve("Cron started");
        });
    });

    var jflCollector = async(function () {

        return new Promise(function (resolve, reject) {
            var task = cron.schedule('* */3 * * *', function() {
                redisClient.hgetall(cmsConstants.SCRAPER_KEY, function (error, obj) {
                    console.log("Redis object is " + JSON.stringify(obj));
                    var promises = [];
                    for (key in obj){
                        promises.push(insertToScraperChannel(key, obj[key]));
                        redisClient.hdel(cmsConstants.SCRAPER_KEY, key);
                    }
                    Promise.all(promises).then(
                        resolve("Done")
                    ).catch(function (error) {
                        reject(error)
                    });
                });
            }, false);
            task.start();
            resolve("Cron Started");
        });
    });

    var dbConnectionChecker = async(function () {

        return new Promise(function (resolve, reject) {
            var task = cron.schedule('* * * * *', async(function() {
                try{
                    console.log('db Connection Checker every minute');
                    var email = await(User.find({
                        where: {
                            email: 'anmol@hike.in',
                            isActive: true
                        }
                    }));
                }catch (error){
                    console.log('db Connection should restart');
                    cmd.run('sh /home/deploy/restart.sh');
                }
            }));
        });
    });
    
    var insertToScraperChannel = async(function (url, title) {
        var amsUtils = new AmsUtils();
        var scraperUtils = new ScraperUtils();
        console.log("Url and title is " + JSON.stringify(url)  + "     " + JSON.stringify(title));
        return new Promise(function (resolve, reject) {

            try{
                var contentResponse = await(amsUtils.getContentTypeFromUrl(url));
                var contentType = contentResponse.contentType;
                var extension  = contentResponse.extension;
                var matterRequest = {
                    caption:title,
                    category:"international",
                    subCategory:"others",
                    tags:[]
                };
                if (contentType == cmsConstants.VIDEO){
                    resolve("Done");
                }else{
                    var assetResponse = await(amsUtils.getAssetFromLink(url));
                    matterRequest['coverAssetId'] = assetResponse.assetId;
                    matterRequest['coverExtension'] = extension;
                    var matterResponse = await(amsUtils.getMatterPacketForImage(matterRequest));
                    var serviceUid = config['SCRAPER'].SERVICE_UID;
                    matterResponse.serviceUid = serviceUid;
                    var result = await(scraperUtils.createMatter(matterResponse));
                    resolve(result);
                }
            }catch (error){
                reject(error);
            }
        });
        
    });

    PushToSyncService.prototype.initialzer  = async(function (callback) {
        try {
            var task2 = await(jflScraper());
            var task1 = await(startConsumer());
            var task3 = await(jflCollector());
            var task4 = await(dbConnectionChecker());
            return callback(null, "Cron started")
        }catch(error){
            log.error(error);
            return callback(error, null);
        }
    });
    return PushToSyncService;

})();

module.exports = PushToSyncService;

var ScraperUtils = require('../utils/scraper-utils');