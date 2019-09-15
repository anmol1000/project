const db = require('../utils/mongo-client');
const Schema = db.Schema;

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
    text:1,
    channel:1
},{
    unique:true
});

const Comment = db.model('Comment', commentSchema);
module.exports = Comment;