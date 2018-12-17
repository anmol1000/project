var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

var SchedulerService = (function () {
    function SchedulerService() {
    }

    SchedulerService.prototype.scheduleJob = function (options, callback) {

        var payload = options.payload;
        var url = config["QUARTZ"].URL;
        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        payload.scheduleJson = JSON.stringify(payload.scheduleJson);
        var scheduleRequest = {
            uri: url,
            headers: header,
            form: payload
        };

        log.info("Request sent to scheduler service is " + JSON.stringify(scheduleRequest));

        request.post(scheduleRequest, function (err, resp, body) {
            if (err) {
                return callback(err, null);
            }
            try {
                body = JSON.parse(body);
            } catch (error) {
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            }
            log.info(body);
            var jobId = body.job_id;
            return callback (null, jobId);
        });
    };

    return SchedulerService;

})();

module.exports = SchedulerService;