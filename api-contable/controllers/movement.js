const movementRepository = require ("../repositories/movement");

function getMovement(req, res){
    const movementRepo = new movementRepository();

    const movement = movementRepo
    .get(req.params._id)
    .then ((data) => {
        res.status(200).send({data});
    })
    .catch((err) => {
        res.status(404).send({ message: err.message });
    })
}