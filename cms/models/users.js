const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const User =  db.model('User',new Schema({
    userId:ObjectId,
    name:String,
    email:String,
    contactNumber:Number,
    address:String,
    designation: {
        type: String,
        enum : ['STUDENT','TEACHER'],
        default: 'STUDENT'
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
},{timestamps: true}));

module.exports = User;