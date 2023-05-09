const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jsonWebToken = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

const land = async (req, res, next) => {
    res.send({ message: "Welcome" });
}

const signUp = async (req, res, next) => {
    let email = req.body.email
    try {
        await userModel.find({ email: email }).then((result) => {
            if (result.length > 0) {
                res.status(409).send({ message: "Email already exists.", status: false })
            } else {
                let form = new userModel(req.body)
                form.save().then((result2) => {
                    console.log(result2)
                    res.status(201).send({ message: "Account has been created successfully", status: true })
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message || "Internal server error", status: false })
        next(error)
    }
}

const signIn = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
        await userModel.find({ email: email }).then((result) => {
            if (result.length === 0) {
                res.status(404).send({ message: "You don't have an account with us", status: false })
            } else {
                bcryptjs.compare(password, result[0].password).then((result2) => {
                    console.log(result2)
                    if (result2) {
                        const token = jsonWebToken.sign({email},SECRET, {expiresIn: 120} )
                        console.log(token)
                        res.status(200).send({ message: "Welcome" + result[0].firstName, status: true, token: token })
                    }else{
                    res.status(401).send({ message: "Invalid password", status: false })
                    }
                })
            }
        }).catch((error) => {
            console.log(error)
            res.status(500).send({ message: "Sign in failed", status: false })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error", status: false })
        return next(error)
    }
}

const verifyToken =  (req, res, next) => {
    // console.log(req.body.token)
    // const token =  req.body.token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    jsonWebToken.verify(token, SECRET, (error, decoded) => {
        if(error){
            res.status(401).send({message: "Unauthorized", status: false})
            console.log(error)
        }else{
            console.log(decoded)
            let email = decoded.email
            if (decoded != undefined){
                userModel.findOne({email: email}).then((result) => {
                    console.log(result)
                    res.status(200).send({message: "Welcome" + email, status: true, data: result})
                })
            }else{
                res.status(401).send({message: "Unauthorized", status: false})
            }
        }
    })
}

const resetPassword = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        await userModel.find({ email: email }).then((result) => {
            if (result.length === 0) {
                res.status(404).send({ message: "You don't have an account with us", status: false })
            } else {
                userModel.updateOne({ email: result[0].email }, { $set: { password: password } }).then((result2) => {
                    console.log(result2)
                    res.status(201).send({ message: "Password changed successfully", status: true })
                }).catch((error) => {
                    console.log(error)
                    res.status(500).send({ message: "Password changed not successful", status: false })
                })
            }

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error", status: false })
        return next(error)
    }
}

module.exports = { land, signUp, resetPassword, signIn, verifyToken }