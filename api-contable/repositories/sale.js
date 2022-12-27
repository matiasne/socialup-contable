const Sale = require("../models/sale");
const BaseRepository = require("./base.repository");

class saleRepository extends BaseRepository {
  constructor() {
    super(Sale);
  }

  async getByBusinessId(
    idBusiness,
    offset,
    limit,
    orderBy,
    idClient,
    dateFrom,
    dateTo,
    saleStatus,
    paymentType,
    box
  ) {
    let query = {};
    //Defino el id de la empresa a consultar
    query["business._id"] = idBusiness;

    if (dateFrom != "" && dateTo != "") {
      query["createdAt"] = { $gte: new Date(dateFrom), $lte: new Date(dateTo) };
    }

    if (dateFrom != "" && dateTo == "") {
      query["createdAt"] = { $gte: new Date(dateFrom) };
    }

    if (dateFrom == "" && dateTo != "") {
      query["createdAt"] = { $lte: new Date(dateTo) };
    }

    if (idClient != "") {
      query["client._id"] = idClient;
    }
    if (box != "") {
      const i = box.split(',');
      query["boxId"] = { $in: i }
    }
    // if (saleStatus != "") {
    //   query["status"]  = saleStatus;
    // }

    if (paymentType != "empty" && paymentType != "") {
      const items = paymentType.split(',');

      query["payments.type"] = { $in: items };
    }


    let sales = await this.model
      .find(query)
      .skip(offset)
      .limit(limit)
      .populate('box') // .sort({ createdAt: -1 })

    let total = await this.model.find({ "business._id": idBusiness }).count();

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
  async get_sale(idSale) {
    let sale = await this.model
      .findById(idSale)
      //.skip(offset)
      //.limit(limit)
      .populate('box') // .sort({ createdAt: -1 })
    return sale;
  }
}

module.exports = saleRepository;
