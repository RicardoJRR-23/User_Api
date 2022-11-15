const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const create = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);
    if (!user) {
        return res.status(401).json({sucess: false, msg: "email or password incorrect"});
    }

    const isPassword = await User.checkPassword(password, user.password);
    if (!isPassword) {
        return res.status(401).json({sucess: false, msg: "email or password incorrect"});
    }

    const token = jwt.sign({id: user.id}, "bbef357897e532a60da4830fac13623e", {
        expiresIn: "7d"
    });

    res.status(200).json({sucess: true, token: token});
};

module.exports = { create };