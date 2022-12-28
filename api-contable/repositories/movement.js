const Movement = require("../models/movement");
const BaseRepository = require("./base.repository");

class MovementRepository extends BaseRepository {
  constructor() {
    super(Movement);
  }

  async create(entity) {
    entity.business = entity.idBusiness;
    delete entity.idBusiness;
    try {

      return await this.model.create(entity);
    } catch (err) {
      console.log(err);
    }
  }

  async getMovementByBox(idBox) {
    let movements = await this.model
      .find({ box: idBox })
      //.skip(offset)
      //.limit(limit)
      .populate('box')
    //.exec();

    return movements;
  }
}
module.exports = MovementRepository;
