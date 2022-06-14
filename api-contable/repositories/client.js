const Client = require('../models/client');
const BaseRepository = require('./base.repository');

class ClientRepository extends BaseRepository{
    constructor(){
        super(Client);
    }

   async getByBusinessId(id){
        return await this.model.find({idBusiness:id}).exec();
    }
}

module.exports = ClientRepository;