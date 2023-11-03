
const jwt = require("jsonwebtoken");

function asureAuth(req, res, next) {
    if (!req.headers.authorization){
        res.status(403).send({ msg: "la peticion no tiene cabecera"});
    }

    const token = req.headers.authorization.replace("bearer", "");

    try {
        const payLoad = jwt.decode(token);
        const { exp } = payLoad
        const currentData = new Date().getTime()

        if (exp <= currentData) {
            return res.status(400).send({ msg:"token ha expirado"}+ error)
        }
        req.user = payLoad

        next();
    }   catch (error) {
        res.status(400).send({ msg: "token invalido" });
    }
}
module.exports = {
    asureAuth
}