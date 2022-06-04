const User = require('../models/user');
const BaseRepository = require('./base.repository');

class userRepository extends BaseRepository{
    constructor(){
        super(User);
    }

    async get(id){
        console.log("asdasdasd")
        return await this.model.findById(id).populate('businesses');
    }
}

module.exports = userRepository;