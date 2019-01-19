const db = require('../utils/mongo-client');
const Schema = db.Schema;

const studentFeesMapperSchema = new Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref: 'StudentMapper'
    },
    feeAmount:{
        type:Number
    },
    meta: String
},{timestamps: true});

const StudentFeesMapper = db.model('StudentFeesMapper', studentFeesMapperSchema);
module.exports = studentFeesMapperSchema;