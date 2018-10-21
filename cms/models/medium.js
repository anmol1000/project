const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const Medium =  db.model('Medium', new Schema({
    mediumId:ObjectId,
    mediumName:String,
    mediumNativeName:String
}));

module.exports = Medium;