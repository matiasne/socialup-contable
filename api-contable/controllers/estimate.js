const estimateRepository = require("../repositories/estimate");

async function saveEstimate(req, res) {
  const params = req.body;
  try {
    const estimateRepo = new estimateRepository();
    const sale = await estimateRepo.create(params);
    res.status(200).send({ sale: sale });
  } catch (error) {
    res.status(400).send({ message: error });
  }
}
async function getEstimate(req, res) {
  const { idBusiness, pageCount, perPage, searchWord, orderBy } = req.params;

  const offset = (pageCount - 1) * perPage;

  const limit = perPage;

  const estimateRepo = new estimateRepository();

  try {
    const data = await estimateRepo.getByBusinessId(
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

module.exports = {
  saveEstimate,
  getEstimate,
};
