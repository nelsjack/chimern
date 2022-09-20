const User = require("../models/userModel")
const router = require('express').Router();
const jwt = require("jsonwebtoken");

router.post("/updateValue", (req, res) => {
    const body = req.body
    const type = body.type;
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
            const userCreature = dbUser.creature[0]
            const creatureValue = userCreature[type] + 10
            userCreature.set({
                [type]: creatureValue
            })
            dbUser.save()
            return res.json(creatureValue)
        })
    })
})

module.exports = router