const Product = require('../models/product');
const BaseRepository = require('./base.repository');

class ProductRepository extends BaseRepository{
    constructor(){
        super(Product);
    }
    async getByBusinessId(id){
         return await this.model.find({idBusiness:id}).exec();
     }
}

module.exports = ProductRepository;