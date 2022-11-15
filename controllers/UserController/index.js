const User = require('../../models/User');
const Person = require('../../models/Person');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    const { user_name, email, password, person} = req.body;
    console.log(password);
    if (!user_name && !email && !password && !person.name && !person.gender_id && !person.birth) {
        return res.status(400).json({sucess: false, msg: "You have to provide values for all the fields!!!"});
    }
    
    const email_substrL = email.substring(0, email.indexOf('@') - 1);
    if (user_name.length < 5 || user_name.length > 50) {
        return res.status(400).json({sucess: false, msg: "The field user_name must have at least 5 characters and the maximum is 50 characters"});
    }
    if (password.length < 6 || password.length > 12) {
        return res.status(400).json({sucess: false, msg: "The field password must have at least 6 characters and the maximum is 12 characters"});
    }
    if (email_substrL.length < 5 || email_substrL.length > 50) {
        return res.status(400).json({sucess: false, msg: "The field email must have at least 6 characters and the maximum is 50 characters before '@'"});
    }

    const user = await User.create(user_name, email, password);
    const personG = await Person.create(person.name, person.birth, person.gender_id, user.id);
    res.status(201).json({sucess: true, userInfo:{ user, personG}});
};

const update = async (req, res) => {
    const { user_name, email, password, person } = req.body;
    const { userID } = req;
    if (!user_name && !email && !password && !person.name && !person.birth && !person.gender_id) {
        return res.status(400).json({sucess: false, msg: "At least one of the fields have to be filled"});
    }
    const user = await User.update(user_name, email, password, userID);
    const person2 = await Person.update(person.name, person.birth, person.gender_id, userID);
    res.status(200).json({sucess: true, user_info: {user, person2}});
};

const deleteUser = async (req, res) => {
    const { deletUsr } = req.params;
    const { userID } = req;
    if (deletUsr.toLowerCase() == 'yes') {
        await User.delete(userID);
        const token = jwt.sign({id: 0}, "bbef357897e532a60da4830fac13623e", {
                 expiresIn: 60
        });
        console.log("deleted", token);
        return res.status(200).json({sucess: true, msg: 'User sucessfull deleted'});
    }
    res.status(400).json({sucess: false, msg: "could not delete the user"});
    
};

const getInfo = async (req, res) => {
    const { userID } = req;
    const user = await User.getById(userID);
    const {name, gender, birth} = await Person.getByUserId(userID);
    const people = {name, gender, birth: birth.toString().substring(4, 15)}
    res.status(200).json({sucess: true, User_info: {...user, ...people}});
};

module.exports = {create, update, deleteUser, getInfo};