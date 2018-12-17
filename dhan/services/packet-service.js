var request = require('request');
var Services = require('../services/services');

var PacketService = (function() {
    function PacketService() {
    }

    PacketService.prototype.pushToSyncPacket = function (options, callback) {
        var serviceUid = options.serviceUid;
        var services = new Services();
        services.getByUid(serviceUid, function (error, serviceResponse) {
           if (error){
               return callback(error, null);
           }
           var botMsisdn = cmsConstants.PLUS + serviceResponse.mappName + cmsConstants.PLUS;
           var serviceBotName = serviceResponse.mappName;
           var packet = {
               t:cmsConstants.AC_PACKET,
               d:{
                   syncMicroappContentData:botMsisdn
               },
               f: botMsisdn
           };
           var packetResponse = {
               packet:packet,
               serviceName:serviceBotName
           };

           return callback(null, packetResponse);
        });
    };

    return PacketService;

})();

module.exports = PacketService;