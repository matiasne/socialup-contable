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
    searchWord,
    dateFrom,
    dateTo,
    saleStatus,
    payment
  ) {
    let query = "";

    console.log(`offset: ${offset}`);
    console.log(`limit: ${limit}`);
    console.log(`dateFrom: ${dateFrom}`);
    console.log(`dateTo: ${dateTo}`);
    console.log(`searchWord: ${searchWord}`);
    console.log(`saleStatus: ${saleStatus}`);
    console.log(`payment: ${payment}`);

    //Defino el id de la empresa a consultar
    query = `'business._id': '${idBusiness}',`;

    if (dateFrom != "" && dateTo != "") {
      query += ` "$and": [ {'createdAt': { $gte: new Date('${dateFrom}'), $lte: new Date('${dateTo}') }}],`;
    }

    if (dateFrom != "" && dateTo == "") {
      query += `"createdAt": { $gte: new Date('${dateFrom}') },`;
    }

    if (dateFrom == "" && dateTo != "") {
      query += `"createdAt": { $lte: new Date('${dateTO}') },`;
    }

    if (searchWord != "") {
      query += `"client.name": {$regex: /${searchWord}/i},`;
    }

    //if (saleStatus != "") {
    //  query += `"client.name": new RegExp(${searchWord}, "i"),`;
    //}

    //if (payment != "") {
    //  query += `"payment.type": new RegExp(${searchWord}, "i"),`;
    //}
    console.log(query);
    /*
      Opciones de la consulta:
      Business Id
      "business._id": id,
      
      Fecha Desde
        createdAt: { $gte: new Date(${dateFrom})}
      Fecha hasta
        createdAt: { $lte: new Date(${dateTo})
      Ambas Fechas
        createdAt: { $gte: new Date(${dateFrom}), $lte: new Date(${dateTo}) }
    
      serchWord
        "client.name": new RegExp(searchWord, "i")
      
      saleStatus
        status: ${saleStatus}

      Payment
        payment: ${payment}

      orferBy
        Definir el ordenamiento
    
    */

    let sales = await this.model
      .find({ query })
      .skip(offset)
      .limit(limit) // .sort({ createdAt: -1 })
      .exec();

    console.log(sales);
    let total = await this.model
      .find({ "business._id": idBusiness, name: new RegExp(searchWord, "i") })
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
