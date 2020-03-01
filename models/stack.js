var mongoose = require("mongoose");

var stackSchema = new mongoose.Schema({
	name: String,
	description: String
});

var Stack = mongoose.model("Stack", stackSchema);

module.exports = Stack;
