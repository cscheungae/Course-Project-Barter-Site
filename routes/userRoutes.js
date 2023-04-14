const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const saltRounds = process.env.PASSWORD_SALT;

module.exports = (app) => {

    /// GET USER
    /// INPUT: [name: String, phone: String]
    /// OUTPUT: USER JSON in UserSchema
    app.get(`/user`, async (req, res) => {
        const { name, phone } = req.body;
        let user = await User.findOne({ name: name, phone: phone });
        if (user == undefined)
            return res.status(404).send({ message: "user dose not exits." });
        return res.status(200).send(user);
    });

    /// ADD (REGISTER) USER
    /// INPUT: [name: String, password: String (unhashed password), phone: String]
    /// OUTPUT: Send success code 200 and any response data
    app.post('/user/reg', async (req, res) => {
        const { name, password, phone } = req.body;
        await bcrypt.hash(password, parseInt(saltRounds), async (err, hashPassword) => {
            if (err) {
                console.log(`Server Error - encryption failed: ${err}`);
                return res.status(500).send({ message: "Server Error - encryption failed" });
            }
            let result = await User.create({
                name: name,
                password: hashPassword,
                phone, phone
            });
            return res.status(200).send(result);
        });

    });

    /// LOGIN
    /// INPUT: [name: String, password: String]
    /// OUTPUT: Send true 200 when success send 401 when unautorized
    app.post('/user/login', async (req, res) => {
        const { name, password, phone } = req.body;
        // get the user from the mondodb
        let userIdentity = await User.findOne({ name: name, phone: phone });
        // compare the password
        bcrypt.compare(password, userIdentity?.password ?? null, (err, result) => {
            if (result == true) {
                return res.status(200).send({ message: "authorized" });
            } else {
                return res.status(401).send({ message: "unauthorized" });
            }
        });
    })
}