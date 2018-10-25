const db = require('../utils/mongo-client');
const Schema = db.Schema;

const loginDataSchema = new Schema({
        email: String,
        sessionId:String
},{timestamps: true});

const loginDataSchema = db.model('LoginData', loginDataSchema);
module.exports = loginDataSchema;