const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    streetName: String,
    streetNumber: String,
    postCode: String,
    city: String

})

module.exports = mongoose.model("Address", addressSchema)