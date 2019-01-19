const User = require('../models/users');

class AuthService {
    constructor(){

    }

    async login({username, password}){
        try{
            var user = User.find({
                $or:[
                    {}
                ]
            })
        }catch (error) {

        }
    }
}