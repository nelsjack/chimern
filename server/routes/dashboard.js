const User = require("../models/userModel")
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/dashboard", async (req, res) => {
    const token = req.headers["x-access-token"]?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { 
            return res.json(err)
        }
        res.json({creature: decoded.creature})
    })
})

module.exports = router