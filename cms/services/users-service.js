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
            console.log(error);
        }
    }
}

module.exports = UserService;