import mongoose from "mongoose";
//import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlenght: 5
    },
    phone: {
        type: String,
        minlenght: 5
    },
    street: {
        type: String,
        require: true,
        minlenght: 5
    },
    city: {
        type: String,
        required: true,
        minlenght: 3
    }
})

export default mongoose.model('Person', schema);