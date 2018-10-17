var express = require('express');
var router = express.Router();
/*
 auth --> valid user
 has access to service for which article is getting created
 can create_article
 */
/*
 TODO: Tags Entry in Matter Tag table
 */
router.post('/', function (req, res, next) {
    return res.json(result);
});

/*
 TODO: Tags Update
 TODO: Delete Post if Cover+Post changed to Cover only
 */

/*
 TODO: new publish API with secret code
 */



router.get('/:articleId', function (req, res, next) {
    //check user has access to service to which article belongs
    log.info("Fetch New Content by Id " + req.params.articleId);
    var payload = {
        articleId: req.params.articleId
    };
    var isAdmin = req.user.isAdmin;
    var serviceUid = req.service.serviceUid;
    return res.json(result);
});

module.exports = router;
