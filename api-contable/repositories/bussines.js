const Bussines = require('../models/bussines');
const BaseRepository = require('./base.repository');

class BussinesRepository extends BaseRepository{
    constructor(){
        super(Bussines);
    }
}

module.exports = BussinesRepository;