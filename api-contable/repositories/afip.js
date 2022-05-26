const Afip = require('../models/afip');
const BaseRepository = require('./base.repository');

class afipRepository extends BaseRepository{
    constructor(){
        super(Afip);
    }
}

module.exports = afipRepository;