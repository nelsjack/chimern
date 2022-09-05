const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))

app.get("/home", (req, res) => {
    res.json({
        name: "Bill" 
    })
})

app.listen(3333, () => console.log("Server is up"))