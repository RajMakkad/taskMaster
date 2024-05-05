const express = require("express");
const {router} = require("./Routes/routes")
const cors = require("cors");
require("dotenv").config();

const app = express();
const env = process.env;
const port = env.port;
const localhost = env.localhost;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
    res.status(200).json({message: "Hello, there!!"})
})


app.listen(port, () => {
    console.log(`taskMaster is listening on http://${localhost}:${port}`)
});