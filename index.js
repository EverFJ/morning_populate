const express = require("express")
const app = express()
const mongoose = require("mongoose");
const Student = require("./models/Student");
const Address = require("./models/Address")
const db = "mongodb://localhost:27017/populate"
const port = 8000;

const address1 = new Address({
    streetName: "rue des champs",
    streetNumber: "14",
    postCode: "75001",
    city: "Paris"
});

// Callbacks
// address1.save((err) => {
//     if (err) {
//         console.error(err)
//     }
//     const addressId = address1._id
//     const student = new Student({
//         firstName: "Francois",
//         surName: "Janson",
//         address: addressId
//     })
//     student.save((err) => {
//         if (err) {
//             console.error(err)
//         }
//     })
// })


// Promises
// address.save()
//     .then(newAddress => {
//         const student = new Student({
//             firstName: "François",
//             surName: "Janson",
//             address: newAddress._id
//         })
//         student.save()
//             .then(console.log)
//             .catch(console.error)
//     })
//     .catch(console.error)

const saveData = (student, address) => {
    const addressToSave = new Address(address)
    addressToSave.save((err) => {
        if (err) {
            console.error(err)
        }
        student.address = addressToSave._id
        const studentToSave = new Student(student)
        studentToSave.save(err => {
            if (err) {
                console.error(err)
            }
        })
    })
}

Student.find()
    .populate("address")
    .then(student => console.log(student))
    .catch(err => console.error(err))


// saveData({
//     firstName: "John",
//     surName: "Doe",
// }, {
//     streetName: "Thing Street",
//     streetNumber: "14",
//     postCode: "25145",
//     city: "NeverLand"
// })



// mongoose.connect(db, (error) => {
//     if (error) {
//         console.error(error)
//         process.exit(1)
//     }
//     console.log(`Connected to ${db}`)
// })

mongoose.connect(db)
mongoose.connection.on("connected", () => {
    console.log(`Db connection open to ${mongoose.connection.host} ${mongoose.connection.name}`)
})
mongoose.connection.on("error", (err) => {
    console.log("Mongoose default connection error", err)
})
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})