const Business = require("../models/business");
const BaseRepository = require("./base.repository");

class BusinessRepository extends BaseRepository {
  constructor() {
    super(Business);
  }


  async create(entity) {

    entity.user = entity.idUser;
    delete entity.idUser;

    try {
      return await this.model.create(entity);
    } catch (err) {
      console.log(err);
    }
  }


  async getByUserId(
    id,
    offset = 0,
    limit = 0,
    orderBy = "timestamp",
    searchWord = ""
  ) {
    let businesses = await this.model
      .find({ user: id, name: new RegExp(searchWord, "i") })
      .skip(offset)
      .limit(limit)
      .exec();
    let total = await this.model
      .find({ user: id, name: new RegExp(searchWord, "i") })
      .count();
    let totalPages = 1;
    if (limit) totalPages = Math.ceil(total / parseInt(limit));

    let currentPage = 1;
    if (offset) currentPage = Math.ceil(total % parseInt(offset)) + 1;

    let response = {
      data: businesses,
      paging: {
        total: total,
        currentPage: currentPage,
        totalPages: totalPages,
      },
    };
    return response;
  }
}

module.exports = BusinessRepository;
