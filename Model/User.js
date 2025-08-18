import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },  // making schema validation using requires
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);  // create user collection
export default User;