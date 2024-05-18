const env = process.env;
const secret = env.secret;
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers.token;
        const username = jwt.verify(token, secret);
        req.username = username;
        next();
    } catch (error) {
        res.status(502).json({ message: "Failed to verify the jwt" });
    }
}

module.exports = {
    verifyJWT
}