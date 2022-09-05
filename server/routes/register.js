const User = require("../models/userModel")
const router = require('express').Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const user = req.body;

    const takenUsername = await User.findOne({username: user.username})

    if (takenUsername) {
        res.json({message: "User already exists"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            username: user.username.toLowerCase(),
            password: user.password
        })

        dbUser.save()
        res.json({message: "Success"})
    }
})

module.exports = router;