var Subject = require('../models/subjects');

class SubjectService {
    constructor(){

    }
    async addSubject({name}){
        try{
            const subject = new Subject({
                name:name
            });
            let newSubject = await subject.save();
            return newSubject;
        }
        catch (error) {
            throw error;
        }
    }

    async getSubject(searchString = ""){
        try {
            var subjectList = await Subject.find({
                name: {
                    $regex: '.*' + searchString + '.*'
                }
            });
            return subjectList;
        }catch (error) {
            throw error;
        }
    }
}

module.exports = SubjectService;