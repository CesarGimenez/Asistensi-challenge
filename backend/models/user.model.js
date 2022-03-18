const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, required: [true, "first name is required"] },
  last_name: { type: String, required: [true, "last name is required"] },
  dni: {
    type: String,
    unique: [true, "DNI already exists"],
    required: [true, "DNI is required"],
  },
  sex: { type: String, enum: ["Male", "Female", "Other"] },
  phone: { type: String, required: true },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive", "Pending"],
  },
  //Sign-In
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("users", userSchema);
