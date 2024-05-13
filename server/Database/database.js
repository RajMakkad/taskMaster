require("dotenv").config();
const mongoose = require("mongoose");

const env = process.env;
const uri = env.mongodb_uri;

mongoose.connect(uri);

const userSchema = {
    username: String,
    password: String
}


const taskschema = {
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user"
    // },
    task: String,
    priority: String,
    time: Number,
    status: Boolean
}

const table = mongoose.model("task", taskschema);
const user = mongoose.model("user", userSchema);

module.exports = {
    table,
    user
};