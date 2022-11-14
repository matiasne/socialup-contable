"use strict";

const MovementRepository = require("../repositories/movement");
var saleRepository = require("../repositories/sale");

async function saveSale(req, res) {
  
  var params = req.body;
  try {
    let saleRepo = new saleRepository();
    let sale = await saleRepo.create(params);
    res.status(200).send({ sale: sale });
    let movementRepo = new MovementRepository(); 
    params.payments.forEach(async element => {
        let m = {
          idSale : sale._id,
          amount : sale.total,
          type: element.type,
          boxAmount: element.amount
      }
    await movementRepo.create(m);
     });
  } catch (error) {
    res.status(400).send({ message: error });
  }
}
async function getSales(req, res) {
  const idBusiness = req.params.idBusiness;
  const {
    pageCount,
    orderBy,
    perPage,
    searchWord,
    dateFrom,
    dateTo,
    saleStatus,
    payment,
  } = req.query;

  const offset = (pageCount - 1) * perPage;

  const limit = perPage;

  let saleRepo = new saleRepository();

  try {
    let data = await saleRepo.getByBusinessId(
      idBusiness,
      offset,
      limit,
      orderBy,
      searchWord,
      dateFrom,
      dateTo,
      saleStatus,
      payment
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
}

module.exports = {
  saveSale,
  getSales,
};
