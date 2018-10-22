const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const Board =  db.model('Board', new Schema({
    boardId:ObjectId,
    boardName:String,
    boardNativeName:String
},{timestamps: true}));