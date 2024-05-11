const express = require("express");
const router = express.Router();
const { user } = require("../Database/database");


// create user
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const exists = await user.findOne({ username });
        if (exists) {
            alert("User already exists!")
            return res.status(404).json({ message: "User already exists!" });
        }
        const newUser = new user({ username, password });
        newUser.save()
            .then((user) => res.status(200).json({ user, message: "New user created." }))
            .catch(error => res.send(300).json({ error, message: "Failed to add the new user to the system." }))
    } catch (err) {
        res.status(500).json({
            message: "Some Error",
            error: err
        })
    }
});


// signin user.
router.post("/signin", (req, res) => {
    try {
        const { username, password } = req.body;
        user.findOne({ username, password })
        .then(user => {
            if(!user)
                return res.status(404).json({message: "User does not exists"});
            return res.status(200).json({ username, message: "User signed in succesfull" });
        })
        // .catch(err => res.status(404).json({message: "User does not exits", error: err}))
        // return res.status(200).json({ username, message: "User signed in succesfull" });
    } catch (err) {
        res.status(500).json({
            message: "Some Error",
            error: err
        })
    }
});


module.exports = {
    userRouter: router
}