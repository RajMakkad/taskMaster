const express = require("express");
const { taskRouter } = require("./Routes/routes");
const { userRouter } = require("./Routes/user");
const cors = require("cors");
require("dotenv").config();

const app = express();
const env = process.env;
const port = env.port;
const localhost = env.localhost;

app.use(cors());
app.use(express.json());
app.use("/api", taskRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, there!!" })
})


app.listen(port, () => {
    console.log(`taskMaster is listening on http://${localhost}:${port}`)
});