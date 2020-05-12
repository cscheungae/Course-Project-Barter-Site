const mongoose = require('mongoose');
const { Schema } = mongoose;


const itemSchema = new Schema({
    name: String,
    description: String,
    owner: {
        name: String,
        phone: String,
    },
    buyers: [{
        name: String,
        phone: String,
    }]

})

mongoose.model('item', itemSchema, 'item');