const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const channelMapperSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:'Channel'
    },
    admin: Boolean,
    active: Boolean

},{timestamps: true});

channelMapperSchema.index({
    user:1,
    channel:1
},{
    unique:true
});

const ChannelMapper = db.model('ChannelMapper', channelMapperSchema);
module.exports = ChannelMapper;