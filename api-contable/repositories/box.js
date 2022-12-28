const Box = require("../models/box");
const BaseRepository = require("./base.repository");

class BoxRepository extends BaseRepository {
  constructor() {
    super(Box);
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

  async getByBusinessId(
    idBusiness,
    offset = 0,
    limit = 0,
    orderBy = "timestamp",
    searchWord = ""
  ) {
    let box = await this.model
      .find({ business: idBusiness, name: new RegExp(searchWord, "i") })
      .skip(offset)
      .limit(limit)
      .exec();

    let total = await this.model
      .find({ business: idBusiness, name: new RegExp(searchWord, "i") })
      .count();

    let totalPages = 1;
    if (limit) totalPages = Math.ceil(total / parseInt(limit));

    let currentPage = 1;
    if (offset) currentPage = Math.ceil(total % parseInt(offset)) + 1;

    let response = {
      data: box,
      paging: {
        total: total,
        currentPage: currentPage,
        totalPages: totalPages,
      },
    };

    return response;
  }
}

module.exports = BoxRepository;
