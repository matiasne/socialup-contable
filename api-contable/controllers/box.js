const boxRepository = require("../repositories/box");

function getBox(req, res) {
  const boxRepo = new boxRepository();

  const box = boxRepo
    .get(req.params._id)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
}

async function getBoxs(req, res) {
  const { idBusiness, pageCount, perPage, searchWord, orderBy } = req.params;

  const offset = (pageCount - 1) * perPage;

  const limit = perPage;

  const boxRepo = new boxRepository();

  try {
    const data = await boxRepo.getByBusinessId(
      idBusiness,
      offset,
      limit,
      orderBy,
      searchWord
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

async function createBox(req, res) {

  const boxRepo = new boxRepository();
  try {
    const data = await boxRepo.create(req.body);

    res.status(200).send({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

async function updateBox(req, res) {
  const boxId = req.params._id;
  const update = req.body;

  try {
    const boxRepo = new boxRepository();
    const data = await boxRepo.update(boxId, update);
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

async function deleteBox(req, res) {
  const boxId = req.params._id;
  try {
    const boxRepo = new boxRepository();

    const data = await boxRepo.delete(boxId);

    res.status(200).send({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

module.exports = {
  getBox,
  getBoxs,
  createBox,
  updateBox,
  deleteBox,
};
