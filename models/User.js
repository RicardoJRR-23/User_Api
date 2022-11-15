const connectDB = require('../config/database');
const bcrypt = require('bcrypt');
const Person = require('./Person');

class User {
    static async create(userName, email, password) {
        try {
            const hash_password = await bcrypt.hash(password, 8);
            console.log(hash_password);
            const user = await connectDB.query("INSERT INTO users (user_name, email, password) VALUES($1, $2, $3) RETURNING *", [userName, email, hash_password]);
            return user.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getById(id) {
        try {
            const user = await connectDB.query("SELECT user_name, email FROM users WHERE id = $1", [id]);
            return user.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getByEmail(email) {
        try {
            const user = await connectDB.query("SELECT * FROM users WHERE email = $1", [email]);
            return user.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }

    static async update(user_name, email, password, id) {
        try {
            let user;
            if (user_name) {
                user = await connectDB.query("UPDATE users SET user_name = $1 WHERE id = $2 RETURNING user_name, email", [user_name, id]);
            }
            if (email) {
                user = await connectDB.query("UPDATE users SET email = $1 WHERE id = $2 RETURNING user_name, email", [email, id]);
            }
            if (password) {
                const hash_password = bcrypt.hash(password, 8);
                user = await connectDB.query("UPDATE users SET password = $1 WHERE id = $2 RETURNING user_name, email", [hash_password, id]);
            }

            return user.rows[0];
        } catch (error) {
            console.log(error.message);
        }
        
    }

    static async delete(id) {
        try {
            await Person.delete(id);
            await connectDB.query("DELETE FROM users WHERE id = $1", [id]);
        } catch (error) {
            console.log(error.message);
        }
    }

    static async checkPassword(password, hash_password) {
        return bcrypt.compare(password, hash_password);
    }

}

module.exports = User;