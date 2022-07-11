'use strict'

var saleRepository = require('../repositories/sale');


async function saveSale(req,res){
    var params = req.body;   
    console.log(params)
    try{
        let saleRepo = new saleRepository(); 
        let sale = await saleRepo.create(params);
        res.status(200).send({sale: sale});
    }catch(error){
        res.status(400).send({message: error});
    }
}

module.exports = {
    saveSale
} ; 