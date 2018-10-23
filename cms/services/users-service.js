const User = require('../models').User;

class UserService {
    constructor(){

    }
    async addUser({name, email, contactNumber, address, designation}){
        try{
            const user = new User({
                name:name,
                email:email,
                contactNumber:contactNumber,
                address:address,
                designation
            });
            let newUser = await user.save();
            return newUser;
        }
        catch (error) {
            throw error;
        }
    }

    async getUsers(searchString = ""){
        try {
            var userList = await User.find({
                name: {
                    $regex: '.*' + searchString + '.*'
                }
            });
            return userList;
        }catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;