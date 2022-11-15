const connectDB = require('../config/database');

class Person {
    static async create(name, birth, gender_id, user_id) {
        try {
            const person = await connectDB.query("INSERT INTO people (name, birth, gender_id, user_id) VALUES($1, $2, $3, $4) RETURNING *", [name, birth, Number(gender_id), Number(user_id)]);
            return person.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }


    static async getByUserId(user_id) {
        try {
            const person = await connectDB.query("SELECT people.name, people.birth, genders.gender FROM people JOIN genders ON people.gender_id = genders.id WHERE people.user_id = $1",[Number(user_id)]);
            return person.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }


    static async update(name, birth, gender_id, user_id){
        try {
            let person;
            if (name && birth && gender_id) {
                person = await connectDB.query("UPDATE people SET name = $1, birth = $2, gender_id = $3 WHERE user_id = $4 RETURNING *", [name, birth, Number(gender_id), Number(user_id)])
            } else {
                if (name) {
                    person = await connectDB.query("UPDATE people SET name = $1 WHERE user_id = $2 RETURNING *", [name, Number(user_id)])
                }
                if (birth) {
                    person = await connectDB.query("UPDATE people SET birth = $1 WHERE user_id = $2 RETURNING *", [birth, Number(user_id)]);
                }
                if (gender_id) {
                    person = await connectDB.query("UPDATE people SET gender_id = $1 WHERE user_id = $2 RETURNING *", [Number(gender_id), user_id]);
                }
            }

            return person.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }


    static async delete(user_id) {
        try {
            await connectDB.query("DELETE FROM people WHERE user_id = $1", [Number(user_id)]);
        } catch (error){
            console.log(error.message);
        }
    }

}

module.exports = Person;