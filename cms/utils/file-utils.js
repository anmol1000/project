var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var http = require('http');
var https = require('https');
var request = Promise.promisifyAll(require('request'));
var defaultRequest = require('request').defaults({ encoding: null });

module.exports = {

    downloadFile :function (url , filePath) {
        return new Promise(function (resolve, reject) {
            var file = fs.createWriteStream(filePath);
            if (url.indexOf("https") > -1){
                var downloadResponse = https.get(url, function (response) {
                    response.pipe(file);
                    file.on('finish', function () {
                        resolve();
                    });
                });
            }
            else{
                var downloadResponse = http.get(url, function (response) {
                    response.pipe(file);
                    file.on('finish', function () {
                       resolve();
                    });
                });
            }
        });
    },
    getImageBase64 : function (url) {
        return new Promise(function (resolve, reject) {
            defaultRequest.get(url, function (error, response, body) {
                if (error){
                    reject(error);
                }
                if (!error && response.statusCode == 200) {
                    data = new Buffer(body).toString('base64');
                    resolve(data);
                }
            });
        });
    }

};