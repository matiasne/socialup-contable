const Business = require('../models/business');
const BaseRepository = require('./base.repository');

class BusinessRepository extends BaseRepository{
    constructor(){
        super(Business);
    }

   async getByUserId(id){
       console.log(this.model)
        return await this.model.find({idUser:id}).exec();
    }
}

module.exports = BusinessRepository;