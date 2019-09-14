const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const channelSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum : ['PUBLIC','PRIVATE'],
        default: 'PUBLIC'
    }
},{timestamps: true});

channelSchema.index({
    name:1,
    type:1
},{
    unique:true
});

const Channel = db.model('Channel', channelSchema);
module.exports = Channel;