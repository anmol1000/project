var db = require('../models');
db.sequelize.sync().then(function (result) {
    log.info("Syncing ");
});


module.exports = db;