const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { authorization } =  req.headers;
    const [,token] = authorization.split(' ');

    jwt.verify(token, "bbef357897e532a60da4830fac13623e", function (err, decoded) {
        if (err) {
            return res.status(401).json({
                error: 'Token Invalid'
            })
        }
        req.userID = decoded.id;
        next();
    });
};

module.exports = auth;