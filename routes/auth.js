const express = require("express");
const _ = require("lodash");
const validateAuth = require("../functions/validateAuth");
const router = express.Router();
const bcrypt = require("bcrypt");
const {Users,} = require("../schemas/userSchema")

router.use(express.json());


router.post("/", async (req, res) => {
    const extractData = _.pick(req.body, ["email", "password"]);
    const { error, value} = validateAuth(extractData);
    if  (error) {return res.status(400).send(error.details[0].message);}
    let user = await Users.findOne({email: extractData.email});
    if (!user) {return res.status(400).send('Invalid user email or password.')}
    const isPasswordValid = await bcrypt.compare(extractData.password, user.password)
    if(isPasswordValid == false) {return res.status(400).send('Invalid password.')}
    const token =  user.generateToken();
    return res.status(200).send(token)
  
});

module.exports = router;
