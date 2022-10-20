const Sale = require("../models/sale");
const BaseRepository = require("./base.repository");

class saleRepository extends BaseRepository {
  constructor() {
    super(Sale);
  }
  async getByBusinessId(
    id,
    offset,
    limit,
    orderBy,
    searchWord,
    dateFrom,
    dateTo
  ) {
    console.log("hola")
    console.log(searchWord)
    console.log(dateFrom)
    console.log(dateTo)

    
   
    
    let sales = await this.model
      .find({ "business._id": id, name: new RegExp(searchWord, "i"),createdAt: {$gte: new Date (dateFrom),$lte: new Date (dateTo) }})
      .skip(offset)
      .limit(limit)
      .exec();

    let total = await this.model
      .find({ "business._id": id, name: new RegExp(searchWord, "i") })
      .count();

    let totalPages = 1;
    if (limit) totalPages = Math.ceil(total / parseInt(limit));

    let currentPage = 1;
    if (offset) currentPage = Math.ceil(total % parseInt(offset)) + 1;

    let response = {
      data: sales,
      paging: {
        total: total,
        currentPage: currentPage,
        totalPages: totalPages,
      },
    };

    return response;
  }
}

module.exports = saleRepository;
