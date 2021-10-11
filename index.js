const express = require("express")
const app = express()
const mongoose = require("mongoose");
const StudentModel = require("./models/StudentModel");
const AddressModel = require("./models/AddressModel");
const db = "mongodb://localhost:27017/populate"
const port = 8000;

const address = new Address({
    streetName: "rue des champs",
    streetNumber: "14",
    postCode: "75001",
    city: "Paris"
})

address.save((err) => {
    if (err) {
        console.error(err)
    }
    const addressId = address._id
    const student = new Student({
        firstName: "Francois",
        surName: "Janson",
        address: addressId
    })
    student.save((err) => {
        if (err) {
            console.error(err)
        }
    })
})

Student.find()
    .populate("address")
    .then(student => console.log(student))
    .catch(err => console.error(err))

mongoose.connect(db, (error) => {
    if (error) {
        console.error(error)
        process.exit(1)
    }
    console.log(`Connected to ${db}`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})