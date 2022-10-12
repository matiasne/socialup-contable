"use strict";

var saleRepository = require("../repositories/sale");

async function saveSale(req, res) {
  var params = req.body;
  try {
    let saleRepo = new saleRepository();
    let sale = await saleRepo.create(params);
    res.status(200).send({ sale: sale });
  } catch (error) {
    res.status(400).send({ message: error });
  }
}
async function getSales(req, res) {
  //  var idBusiness = req.params.idBusiness;
  //  var pageCount = req.query.pageCount;
  //  var perPage = req.query.perPage;
  //  var searchWord = req.query.searchWord;
  //  var orderBy = req.query.orderBy;

  console.log(req.query)
  
  const { idBusiness, pageCount, orderBy, perPage, searchWord, dateFrom, dateTo } = req.query
  var offset = (pageCount - 1) * perPage;

  var limit = perPage;

  let saleRepo = new saleRepository();

  try {
    let data = await saleRepo.getByBusinessId(
      idBusiness,
      offset,
      limit,
      orderBy,
      searchWord,
      dateFrom,
      dateTo
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error });
  }
}

module.exports = {
  saveSale,
  getSales,
};
