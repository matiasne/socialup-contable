const Product = require("../models/product");
const BaseRepository = require("./base.repository");

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
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
    id,
    offset = 0,
    limit = 0,
    orderBy = "timestamp",
    searchWord = ""
  ) {
    let products = await this.model
      .find({ business: id, name: new RegExp(searchWord, "i") })
      .skip(offset)
      .limit(limit)
      .exec();

    let total = await this.model
      .find({ business: id, name: new RegExp(searchWord, "i") })
      .count();

    let totalPages = 1;
    if (limit) totalPages = Math.ceil(total / parseInt(limit));

    let currentPage = 1;
    if (offset) currentPage = Math.ceil(total % parseInt(offset)) + 1;

    let response = {
      data: products,
      paging: {
        total: total,
        currentPage: currentPage,
        totalPages: totalPages,
      },
    };

    return response;
  }
}

module.exports = ProductRepository;
