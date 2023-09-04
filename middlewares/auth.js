const jwt = require("jsonwebtoken");


exports.auth = (req, res, next) => {

    let token = req.header('x-api-key');

    if (!token) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
    try {

        let decodeToken = jwt.verify(token, "MonkeysSecret");

        req.tokenData = decodeToken;

        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token invali or expired 2222" })
    }
}