const User = require("../models/userModel")
const router = require('express').Router();
const jwt = require("jsonwebtoken");

router.get("/dashboard", async (req, res) => {
    const token = req.headers["x-access-token"]?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { 
            return res.json(err)
        }
        User.findOne({username: decoded.username})
        .then(dbUser => {
            if (!dbUser) {
                return null
            }
            res.json({creature: dbUser.creature, hunger: dbUser.hunger, mood: dbUser.hunger, cleanliness: dbUser.cleanliness})
        })
        
    })
})

module.exports = router