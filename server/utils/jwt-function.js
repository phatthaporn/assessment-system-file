require("dotenv").config()
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const saltRounds = 10
const SecretKey = process.env.SECRET_KEY
const fs = require("fs")
const privateKey = fs.readFileSync(privateKeyPath, "utf8")

const endCode = (text) => {
    return new Promise((resolve) => {
        let cipher_text = CryptoJS.AES.encrypt(text, SecretKey).toString();
        resolve(cipher_text)
    })
}
const deCrypt = (text) => {
    return new Promise((resolve) => {
        var bytes = CryptoJS.AES.decrypt(text, SecretKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        resolve(originalText)
    })
}
const hashData = (data) => {
    return new Promise(async (resolve) => {
        try {
            bcrypt.hash(data, saltRounds, function (err, hash) {
                resolve(hash)
            })
        } catch (error) {
            resolve(data)
        }
    })
}
const compareData = (data, hash) => {
    return new Promise(async (resolve) => {
        try {
            bcrypt.compare(data, hash, function (err, match) {
                resolve(match)
            })
        } catch (error) {
            console.log(error)
            resolve(data)
        }
    })
}
const jwtEncode = (user_profile) => {
    return new Promise(async (resolve) => {
        try {
            const accessToken = jwt.sign(user_profile, privateKey, {
                expiresIn: "8hr"
            })
            resolve(accessToken)

        } catch (error) {
            resolve(data)
        }
    })
}

module.exports = { endCode, deCrypt, hashData, compareData, jwtEncode }