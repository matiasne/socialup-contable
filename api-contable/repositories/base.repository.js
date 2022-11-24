class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    try {
      return await this.model.findById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async create(entity) {
    try {
      console.log(entity)
      return await this.model.create(entity);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, entity) {
    try {
      return await this.model.findByIdAndUpdate(id, entity, { new: true });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      await this.model.findByIdAndDelete(id);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = BaseRepository;
