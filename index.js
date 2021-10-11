const express = require("express")
const app = express()
const mongoose = require("mongoose");
const StudentModel = require("./models/StudentModel");
const db = "mongodb://localhost:27017/populate"
const port = 8000;



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