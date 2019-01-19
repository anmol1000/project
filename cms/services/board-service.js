var Board = require('../models/board');

class BoardService {
    constructor(){

    }
    async addBoard({name, nativeName}){
        try{
            const baord = new Board({
                name:name,
                nativeName:nativeName
            });
            let newBoard = await baord.save();
            return newBoard;
        }
        catch (error) {
            throw error;
        }
    }

    async getBoard(searchString = ""){
        try {
            var boardList = await Board.find({
                name: {
                    $regex: '.*' + searchString + '.*'
                }
            });
            return boardList;
        }catch (error) {
            throw error;
        }
    }
}

module.exports = BoardService;