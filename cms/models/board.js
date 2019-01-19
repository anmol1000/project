const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

var boardSchema = new Schema({
    boardId:ObjectId,
    boardName:String,
    boardNativeName:String
},{
    timestamps: true
});

const Board =  db.model('Board', boardSchema);
module.exports = Board;