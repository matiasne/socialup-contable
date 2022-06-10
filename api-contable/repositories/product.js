const Product = require('../models/product');
const BaseRepository = require('./base.repository');

class ProductRepository extends BaseRepository{
    constructor(){
        super(Product);
    }

}

module.exports = ProductRepository;