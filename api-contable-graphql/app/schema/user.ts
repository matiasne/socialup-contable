import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: false, minlength: 2 },
  surname: { type: String, required: true, unique: false, minlength: 2 },
  email: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true, unique: false, minlength: 6 },
  role: { type: String, required: false, unique: false, minlength: 3 },
  image: { type: String, required: false, unique: false, minlength: 3 },
  address: { type: String, required: false, unique: false, minlength: 3 },
  gender: { type: String, required: false, unique: false, minlength: 3 },
  phone: { type: String, required: false, unique: false, minlength: 3 },
  businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }],
});
export default mongoose.model("User", schema);
