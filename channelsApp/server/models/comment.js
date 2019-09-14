const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
    text: String,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }
},{timestamps: true});

commentSchema.index({
    name:1,
    type:1
},{
    unique:true
});

const Comment = db.model('Comment', commentSchema);
module.exports = Comment;