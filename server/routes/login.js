const User = require("../models/userModel")
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
    const userLoggingIn = req.body;
    
    User.findOne({username: userLoggingIn.username})
    .then(dbUser => {
        if(!dbUser) {
            return res.json({
                message: "Invalid Username or Password",
                valid: false
            })
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect => {
            if(isCorrect) {
                const payload = {
                    username: dbUser.username,
                    creature: dbUser.creature[0].name
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) {
                            console.log(err)
                            return res.json({message: err})
                        }
                        return res.json({
                            message: "Bearer Token Created",
                            token: "Bearer " + token,
                            valid: true
                        })
                    }
                )
            } else {
                return res.json({
                    message: "Invalid Username or Password",
                    valid: false
                })
            }
        })
    })
})

module.exports = router