const Afip = require('../models/user');
const BaseRepository = require('./base.repository');

class afipRepository extends BaseRepository{
    constructor(){
        super(Afip);
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