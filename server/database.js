require("dotenv").config();
const mongoose = require("mongoose");

const env = process.env;
const uri = env.mongodb_uri;

mongoose.connect(uri);

const taskschema = {
    task: String,
    priority: String,
    time: String,
    status: Boolean
}

const table = mongoose.model("task", taskschema);

module.exports = table;