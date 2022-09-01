"use strict";

var clientRepository = require("../repositories/client");
var jwtHanlder = require("./jwtHanlder");
const path = require("path");
var imagesHandler = require("./imagesHandler");

function getClient(req, res) {
  let clientRepo = new clientRepository();

  let client = clientRepo
    .get(req.params.id)
    .then((client) => {
      res.status(200).send({ client: client });
    })
    .catch((err) => {
      res.status(404).send({ message: "no hay" });
    });
}

async function getBusinessClients(req, res) {
  var idBusiness = req.params.idBusiness;
  var pageCount = req.query.pageCount;
  var perPage = req.query.perPage;
  var searchWord = req.query.searchWord;
  var orderBy = req.query.orderBy;
  var offset = (pageCount - 1) * perPage;
  var limit = perPage;
  let clientRepo = new clientRepository();

  try {
    let data = await clientRepo.getByBusinessId(
      idBusiness,
      offset,
      limit,
      orderBy,
      searchWord
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: error });
  }
}

async function addClient(req, res) {
  var params = req.body;
  let clientRepo = new clientRepository();

  try {
    if (req.file) {
      let imgHandler = new imagesHandler();
      params.image = await imgHandler.processImage(req.file, "client");
    }

    var tokenPayload = jwtHanlder.getDataToken(req.headers.authorization);
    params.userId = tokenPayload.sub;

    let client = await clientRepo.create(params);

    res.status(200).send({ client: client });
  } catch (error) {
    res.status(400).send({ message: error });
  }
}

async function updateClient(req, res) {
  let clientId = req.params._id;
  let update = req.body;

  try {
    if (req.file) {
      let imgHandler = new imagesHandler();
      update.image = await imgHandler.processImage(req.file, "client");
    }

    let clientRepo = new clientRepository();
    let reponse = await clientRepo.update(clientId, update);
    res.status(200).send({ client: reponse });
  } catch (error) {
    res.status(400).send({ message: error });
  }
}

async function deleteClient(req, res) {
  var clientId = req.params.id;
  try {
    let clientRepo = new clientRepository();

    let client = await clientRepo.delete(clientId);

    res.status(200).send({ client: client });
  } catch (error) {
    res.status(400).send({ message: error });
  }
}

function getClientImageFile(req, res) {
  var fs = require("fs");
  var imageFile = req.params.imageFile;
  var path_file = "public/client/" + imageFile;

  fs.exists(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ message: "No existe la imagen..." });
    }
  });
}

module.exports = {
  addClient,
  getClient,
  deleteClient,
  updateClient,
  getClientImageFile,
  getBusinessClients,
};
