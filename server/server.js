const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/userModel")
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))

//routes
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));

mongoose.connect(process.env.MONGO_URI)
.then((res) => {
    app.listen(3333, () => console.log("Connected to MongoDB"))
})
.catch(err => console.log(err))

app.get("/getUsername", verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username})
})

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(" ")[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) { 
                return res.json({
                    isLoggedIn: false,
                    message: "Failed to Authenticate"
                })
            }
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username
                next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}