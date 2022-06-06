const Business = require('../models/business');
const BaseRepository = require('./base.repository');

class BusinessRepository extends BaseRepository{
    constructor(){
        super(Business);
    }
}

module.exports = BusinessRepository;