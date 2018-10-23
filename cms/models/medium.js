const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

var mediumSchema = new Schema({
    mediumId:ObjectId,
    mediumName:String,
    mediumNativeName:String
},{
    timestamps: true
});
const Medium =  db.model('Medium', mediumSchema);

module.exports = Medium;