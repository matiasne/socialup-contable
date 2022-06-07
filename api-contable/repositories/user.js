const User = require('../models/user');
const BaseRepository = require('./base.repository');

class userRepository extends BaseRepository{
    constructor(){
        super(User);
    }
    async getUserEmail(email){
        try{
        return await this.model.findOne({email:email});
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = userRepository;