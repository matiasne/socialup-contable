class BaseRepository{
    constructor(model){
        this.model = model;
    }

    async get(id){
        return await this.model.findById(id);
    }

    async create(entity){
        return await this.model.create(entity);
    }

    async update(id, entity){
        return await this.model.findByIdAndUpdate(id, entity, {new: true})
    }

    async delete(id){
        await this.model.findByIdAndDelete(id);
        return true;
    }

    async getUserEmail(email){
        return await this.model.findOne({email:email});
    }
}

module.exports = BaseRepository;