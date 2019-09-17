var User = require('../models/user');

class UserService {
    constructor(){

    }
    async addUser({userName, userPassword}){
        try{
            const user = new User({
                username:userName,
                password:userPassword,
                active: true
            });
            let newUser = await user.save();
            return newUser;
        }
        catch (error) {
            throw error;
        }
    }

    async getUserByName({userName}){
        try {
            var userList = await User.find({
                username: userName
            });
            return userList[0];
        }catch (error) {
            throw error;
        }
    }

    async getUserById ({userId}){
        try{
            var userList = await User.find({
                _id:userId
            });

            return userList[0];
        }catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;