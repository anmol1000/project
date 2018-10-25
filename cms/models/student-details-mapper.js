const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const studentMapperSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    medium: {
        type: Schema.Types.ObjectId,
        ref: 'Medium'
    },
    board:{
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    active: {
        type:Boolean,
        default:false
    },
    totalFees:{
        type:Number
    }
},{timestamps: true});

studentMapperSchema.index({
    user:1,
    medium:1,
    board:1,
    subject:1,
    active:1
},{
    unique:true
});

const StudentMapper = db.model('StudentMapper', studentMapperSchema);
module.exports = StudentMapper;