const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL
class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("Database Connection Successful!");
        })
        .catch((err) => {
            console.log("Database Connection Failed!" + err);
        })
    }
}

module.exports = new Database();