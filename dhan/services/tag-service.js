var models = require('../models');
var Tag = models.Tag;
var MatterTag = models.MatterTag;
var Promise = require('promise');
var TagService = require('./tag-service');
var JsonService = require('../services/json-service');
var ErrorHandler = require('../utils/error');

var Tags = (function () {
    function Tags() {
    }

    Tags.prototype.create = function (options, callback) {
        var name = options.name;
        var tagArray = [];
        var j = 0;
        if (!name || name.length == 0){
            return callback(null, tagArray);
        }
        for (var i = 0; i < name.length; i++) {

            Tag.findOrCreate({
                where: {
                    name: name[i].toLowerCase()
                }
            }).then(function (success) {
                success = JSON.parse(JSON.stringify(success));
                var tagObject = {};
                tagObject['id'] = success[0].id;
                tagObject['name'] = success[0].name;
                tagArray.push(tagObject);
                j = j + 1;

                if (j == name.length){
                    return callback(null, tagArray);
                }

            }).catch(function (error) {
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            });
        }
    };

    Tags.prototype.getAll = function (options, callback) {

        var prefix = options.prefix;

        Tag.findAll({
            where: ["name ilike ?", '%' + prefix + '%'],
            attributes:['id', 'name']
        }).then(function (result) {
            result = JSON.parse(JSON.stringify(result));
            if (result){
                return callback(null, result);
            }
            else{
                var message = "No Categories found";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            }
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    Tags.prototype.getByArticleId = function (options, callback) {

        var articleId = options.articleId;
        var jsonService = new JsonService();

        MatterTag.findAll({
            where:{
                matterId:articleId
            },
            include:[{
                model:Tag
            }]
        }).then(function (success) {
            success = JSON.parse(JSON.stringify(success));
            jsonService.getTagsForArticle(success, function (error, jsonResult) {
               if (error){
                   return callback(error, null);
               }
               return callback(null, jsonResult);
            });
        }).catch(function (error) {

        });
    };
    Tags.prototype.updateMatterTags = function (options,callback) {
        var self = this;
        var tags = options.tags;
        var articleId = options.articleId;
        var createRequest = {
            name:tags
        };

        self.create(createRequest, function (error, tagsWithId) {
           var updateRequest = {
               tags:tagsWithId,
               articleId:articleId
           };
           updateDB(updateRequest, function (error, success) {
              if (error){
                  return callback(error, null);
              }
              return callback(null, success)
           });
        });

    };

    var updateDB = function (options, callback) {

        var tags = options.tags;
        var articleId = options.articleId;
        var tagId = [];

        if (!tags || tags.length == 0){
            return callback(null, "Not found");
        }

        for (i = 0; i < tags.length; i++){
            var updatePromise = new Promise(
                function (resolve, reject) {
                    var j = i;
                    tagId.push(tags[j].id);
                    MatterTag.findOrCreate({
                        where:{
                            matterId:articleId,
                            tagId:tags[i].id
                        }
                    }).then(function (success) {
                        resolve(j);
                    }, function (response) {
                        reject(response);
                    });
                });

            updatePromise.then(function(index){
                if (index == tags.length - 1){
                    MatterTag.destroy({
                        where:{
                            tagId:{
                                $notIn:tagId
                            },
                            matterId:articleId
                        }
                    }).then(function (success) {
                        return callback(null,success);
                    }).catch(function (error) {
                        return callback(error, null);
                    });
                }
            }).catch(function (error) {
                return callback(error, null);
            });
        }

    };

    return Tags;
})();

module.exports = Tags;