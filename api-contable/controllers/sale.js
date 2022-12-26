"use strict";

const box = require("../models/box");
const BoxRepository = require("../repositories/box");
const MovementRepository = require("../repositories/movement");
var saleRepository = require("../repositories/sale");

async function saveSale(req, res) {
  var params = req.body;
  try {
    let saleRepo = new saleRepository();
    let sale = await saleRepo.create(params);
    res.status(200).send({ sale: sale });
    let movementRepo = new MovementRepository();
    let boxRepository = new BoxRepository();
    let box = await boxRepository.get(params.boxId);

    for await (let element of sale.payments) {
      let m = {
        idSale: sale._id,
        idBox: box._id,
        amount: sale.total,
        type: element.type,
        boxAmount: element.amount,
      };
      console.log(m)
      await movementRepo.create(m);
      box.actualAmount = Number(box.actualAmount) + Number(element.amount);
    }

    await boxRepository.update(box._id, box);
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
    idClient,
    dateFrom,
    dateTo,
    saleStatus,
    paymentType,
    box
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
      idClient,
      dateFrom,
      dateTo,
      saleStatus,
      paymentType,
      box
    );

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
}

function getSale(req, res) {
  const idSale = req.params._id;
  let saleRepo = new saleRepository();

  saleRepo
    .get(idSale)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(404).send({ message: "no se encontro venta" });
    });
}
module.exports = {
  saveSale,
  getSales,
  getSale,
};
