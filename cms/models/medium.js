const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

var mediumSchema = new Schema({
    name:String,
    nativeName:String
},{
    timestamps: true
});
const Medium =  db.model('Medium', mediumSchema);

module.exports = Medium;