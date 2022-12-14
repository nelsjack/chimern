const User = require("../models/userModel")
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const user = req.body;
    
    const takenUsername = await User.findOne({username: user.username})
    
    if (takenUsername) {
        res.json({message: "User already exists"})
    } else {
        const payload = {
            username: user.username,
            creature: user.creature
        }
        user.password = await bcrypt.hash(req.body.password, 10)

        const date = Date()

        const dbUser = new User({
            username: user.username.toLowerCase(),
            password: user.password,
            creature: {name: user.creature, born: date, fed: "", mana: 0, hunger: 50, mood: 50, cleanliness: 50}
        })

        dbUser.save()
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
                    message: "User and Bearer Token Created",
                    token: "Bearer " + token
                })
            }
        )
    }
})

module.exports = router;