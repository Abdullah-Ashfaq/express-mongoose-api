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
        type: Number
       
    },
    cnic: {
        type: Number
       
    },

    

})
  
const User = mongoose.model('USER', userSchema)
module.exports = User;