var crypto = require('crypto');
var algorithm = 'sha1';

var Encrypt = (function(){
    function Encrypt(){
        /*
         default contructor
         */
    }

    Encrypt.prototype.encrypt = function(key , data){
        return crypto.createHmac('sha1', key).update(data).digest('hex').substring(0,32);
    };

    return Encrypt;
})();

module.exports = Encrypt;