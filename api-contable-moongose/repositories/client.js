const Client = require("../models/client");
const BaseRepository = require("./base.repository");

class ClientRepository extends BaseRepository {
  constructor() {
    super(Client);
  }

  async getByBusinessId(
    id,
    offset = 0,
    limit = 0,
    orderBy = "timestamp",
    searchWord = ""
  ) {
    let clients = await this.model
      .find({ idBusiness: id, name: new RegExp(searchWord, "i") })
      .skip(offset)
      .limit(limit)
      .exec();
    let total = await this.model
      .find({ idBusiness: id, name: new RegExp(searchWord, "i") })
      .count();
    let totalPages = 1;
    if (limit) totalPages = Math.ceil(total / parseInt(limit));

    let currentPage = 1;
    if (offset) currentPage = Math.ceil(total % parseInt(offset)) + 1;

    let response = {
      data: clients,
      paging: {
        total: total,
        currentPage: currentPage,
        totalPages: totalPages,
      },
    };
    return response;
  }
}

module.exports = ClientRepository;
