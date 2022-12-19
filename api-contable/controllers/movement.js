const movementRepository = require("../repositories/movement");

function getMovement(req, res) {
    const movementRepo = new movementRepository();
    console.log(req.params._id)
    const movement = movementRepo.getMovementByBox(req.params._id)

        .then((data) => {
            console.log(data)
            res.status(200).send({ data: data });
        })
        .catch((err) => {
            res.status(404).send({ message: err.message });
        })
}

module.exports = {
    getMovement
};