const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true,
        trim: true
    },
    dateSent:{
        type: Date,
        required:false
    }
   
})
const Registration = mongoose.model('registration', registrationSchema)

module.exports = Registration

