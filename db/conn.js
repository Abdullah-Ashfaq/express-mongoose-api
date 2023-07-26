const mongoose = require("mongoose")

const url = process.env.DATABASEURL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => console.log("connection is successfull")).catch((err) => console.log(`connection${err}`))