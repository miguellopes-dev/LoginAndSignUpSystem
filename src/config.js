const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/mm/login/users")

connect.then(() => {
    console.log("Database connected SUCCESSFULLY");
})

.catch(() => {
    console.log("Database connection FAILED");
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;