const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

var subjectSchema = new Schema({
    name:String
},{
    timestamps: true
});

const Subject =  db.model('Subject', subjectSchema);

module.exports = Subject;