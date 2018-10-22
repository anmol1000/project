const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const Subject =  db.model('Subject', new Schema({
    subjectId:ObjectId,
    subjectName:String
},{timestamps: true}));

module.exports = Subject;