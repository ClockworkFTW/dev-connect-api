const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, default: "earth" },
  bio: { type: String, maxlength: 200 },
  stack: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stack" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created: Date
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.friends;
    return ret;
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
