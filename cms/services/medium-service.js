var Medium = require('../models/medium');

class MediumService {
    constructor(){

    }
    async addMedium({name, nativeName}){
        try{
            const medium = new Medium({
                name:name,
                nativeName:nativeName
            });
            let newMedium = await medium.save();
            return newMedium;
        }
        catch (error) {
            throw error;
        }
    }

    async getMedium(searchString = ""){
        try {
            var mediumList = await Medium.find({
                name: {
                    $regex: '.*' + searchString + '.*'
                }
            });
            return mediumList;
        }catch (error) {
            throw error;
        }
    }
}

module.exports = MediumService;