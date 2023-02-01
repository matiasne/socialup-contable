const Sale = require("../models/sale");
const BaseRepository = require("./base.repository");

class saleRepository extends BaseRepository {
  constructor() {
    super(Sale);
  }

  async create(entity) {

    entity.businessAtDate = entity.business;
    delete entity.business;
    entity.business = entity.idBusiness;
    delete entity.idBusiness;
    entity.clientAtDate = entity.client;
    delete entity.client;
    entity.client = entity.idClient;
    delete entity.idClient;
    entity.box = entity.boxId;
    delete entity.boxId;
    try {

      return await this.model.create(entity);
    } catch (err) {
      console.log(err);
    }
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
    query["business"] = idBusiness;

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
      query["clientAtDate._id"] = idClient;
    }
    if (box != "") {
      const i = box.split(',');
      query["box"] = { $in: i }
    }
    // if (saleStatus != "") {
    //   query["status"]  = saleStatus;
    // }

    if (paymentType != "empty" && paymentType != "") {
      const items = paymentType.split(',');

      query["payments.type"] = { $in: items };
    }
    // console.log(query)
    let sales = await this.model
      .find(query)
      // .skip(offset)
      // .limit(limit)
      .populate('box') // .sort({ createdAt: -1 })

    let total = await this.model.find({ "business": idBusiness }).count();

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
    console.log(response)
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
