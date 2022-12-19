const Movement = require("../models/movement");
const BaseRepository = require("./base.repository");

class MovementRepository extends BaseRepository {
  constructor() {
    super(Movement);
  }

  async getMovementByBox(idBox) {
    let movements = await this.model
      .find({ idBox: idBox })
      //.skip(offset)
      //.limit(limit)
      .populate('idBox')
    //.exec();

    return movements;
  }
}
module.exports = MovementRepository;
