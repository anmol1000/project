const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

var userSchema = new Schema({
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
}, {
    timestamps: true
});
userSchema.index({
    user:1,
    medium:1,
    board:1,
    subject:1,
    active:1
},{
    unique:true
});

const User =  db.model('User',userSchema);

module.exports = User;