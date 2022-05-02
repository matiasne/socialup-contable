const User = require('../models/user');
const BaseRepository = require('./base.repository');

class userRepository extends BaseRepository{
    constructor(){
        super(User);
    }
}

module.exports = userRepository;