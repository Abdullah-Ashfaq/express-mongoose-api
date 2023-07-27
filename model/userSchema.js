const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
       
    },
    cnic: {
        type: Number,
        required: true
       
    },

    

},{versionKey: false})
  
const User = mongoose.model('USER', userSchema)
module.exports = User;