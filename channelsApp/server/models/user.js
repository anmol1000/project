const db = require('../utils/mongo-client');
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    username:String,
    password:String,
    active: Boolean
}, {
    timestamps: true
});
userSchema.index({
    username:1,
    password:1
},{
    unique:true
});

const User =  db.model('User',userSchema);

module.exports = User;