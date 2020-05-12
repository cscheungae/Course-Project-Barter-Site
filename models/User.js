const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    password: String,
    phone: String,
})

mongoose.model('user', userSchema, 'user');