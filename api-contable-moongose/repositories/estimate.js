const Estimate = require("../models/estimate");
const BaseRepository = require("./base.repository");

class estimateRepository extends BaseRepository {
  constructor() {
    super(Estimate);
  }
  async getByBusinessId(
    id,
    offset = 0,
    limit = 0,
    orderBy = "timestamp",
    searchWord = ""
  ) {
    const estimate = await this.model
      .find({ "business._id": id, name: new RegExp(searchWord, "i") })
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await this.model
      .find({ "business._id": id, name: new RegExp(searchWord, "i") })
      .count();

    const totalPages = 1;
    if (limit) totalPages = Math.ceil(total / parseInt(limit));

    const currentPage = 1;
    if (offset) currentPage = Math.ceil(total % parseInt(offset)) + 1;

    const response = {
      data: estimate,
      paging: {
        total: total,
        currentPage: currentPage,
        totalPages: totalPages,
      },
    };

    return response;
  }
}

module.exports = estimateRepository;
