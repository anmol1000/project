var async = require('asyncawait/async');
var await = require('asyncawait/await');
var PAStoryHandler = require('../handlers/story-handlers/pa-story-handler');
var NewOnHikeStoryHandler = require('../handlers/story-handlers/newonhike-story-handler');
var DiscoverStoryHandler = require('../handlers/story-handlers/discover-story-handler');

var StoriesService = (function () {
    function StoriesService() {
    }

    StoriesService.prototype.scheduleStory = async(function (options) {
        return new Promise(function (resolve, reject) {

            var storyType = options.storyType;
            try {
                var storyHandler = await(getStoryType(storyType));
                var storiesResponse = await(storyHandler.scheduleStory(options));
                resolve(storiesResponse);
            }catch (error){
                reject(error);
            }
        });
    });
    
    StoriesService.prototype.listenCallbackForCreatingStory = async(function (options) {

        return new Promise(function (resolve, reject) {
            var storyType = options.storyType;
            try{
                var storyHandler = await(getStoryType(storyType));
                var campaignId = await(storyHandler.listenCallbackForCreatingStory(options));
                resolve(campaignId);
            }catch (error){
                reject(error);
            }
        });

    });

    var getStoryType = async(function (eventType){

        return new Promise(function (resolve, reject) {

            if (eventType.toLowerCase() == cmsConstants.PUBLIC_ACCOUNTS){
                var paStoryHandler = new PAStoryHandler();
                resolve(paStoryHandler);

            }else if (eventType.toLowerCase() == cmsConstants.NEW_ON_HIKE){
                var newOnHikeStoryHandler = new NewOnHikeStoryHandler();
                resolve(newOnHikeStoryHandler);
            }
            else if (eventType.toLowerCase() == cmsConstants.DISCOVER ){
                var discoverStoryHandler = new DiscoverStoryHandler();
                resolve(discoverStoryHandler);
            }
        })
    });

    StoriesService.prototype.getStories = async(function () {
        
        return new Promise(function (resolve, reject) {
            var storyType = cmsConstants.DISCOVER;
            try {
                var storyHandler = await(getStoryType(storyType));
                var storiesResponse = await(storyHandler.getStories());
                resolve(storiesResponse);
            }catch (error){
                reject(error);
            }
        });
    });

    return StoriesService;
})();

module.exports = StoriesService;
