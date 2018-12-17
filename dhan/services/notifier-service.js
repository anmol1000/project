var ses = require('../utils/aws-ses');
var from = ['creators@hike.in'];
var to = ['anmol@hike.in'];

var NotifierService = (function () {
    function NotifierService() {
    }
    
    NotifierService.prototype.sendEmail  = function (options, callback) {

        var params = {
            Destination: {
                ToAddresses: [
                    'anmol@hike.in'
                ]
            },
            Message: {
                Body: {
                    Text: {
                        Data: 'This is test message.'
                    }
                },
                Subject: {
                    Data: 'Testing'
                }
            },
            Source: 'creators@hike.in'
        };
        var email = ses.sendEmail(params, function (error, data) {
            if (error){
                return callback(error, null);
            }
            var messageId = data.MessageId;
            return callback(null, messageId);
        });
    };

    return NotifierService;
})();

module.exports = NotifierService;