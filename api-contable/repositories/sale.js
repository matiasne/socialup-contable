const Sale = require('../models/sale');
const BaseRepository = require('./base.repository');

class saleRepository extends BaseRepository{
    constructor(){
        super(Sale);
    }
}

module.exports = saleRepository;