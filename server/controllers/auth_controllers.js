require('express');
const { User, Key } = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

function generateAccessToken(user) {
    return jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(user) {
    return jwt.sign({ data: user }, process.env.REFRESH_TOKEN_SECRET)
}

function sendValidationEmail(user_email) {
    const email_body = ''
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.MAIL_SEND,
            pass: process.env.MAIL_PASS
        }
    });
    const options = {
        from: process.env.MAIL_SEND,
        to: user_email,
        subject: 'CONFIRM YOUR EMAIL',
        text: email_body
    };
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log(`EMAIL SENT: ${info.response}`);
            res.sendStatus(200)
        }
    });
}

async function registerUser(user_to_register) {
    if (!user_to_register) return false;
    const new_user_data = await User.create(user_to_register);
    if (!new_user_data) return false;
    const refresh_token = generateRefreshToken(new_user_data);
    const user_key = await Key.create({
        key: refresh_token,
        user_id: new_user_data._id
    });
    if(!user_key) return false;
    const access_token = generateAccessToken(new_user_data);
    return access_token;
} 

async function loginUser(user_to_login) {
    const { email, password } = user_to_login;
    if (!email && !password) return false;
    const user_data = await User.findOne({
        email: email
    });
    if (!user_data) return false;
    const pass_is_valid = await user_data.validatePass(password);
    if (!pass_is_valid) return false;
    const key = await Key.findOne({
        user_id: user_data._id
    });
    if (!key) return false;
   jwt.verify(key.key, process.env.REFRESH_TOKEN_SECRET, async (err, token_user_data) => {
        if(err) return false;
        if (user_data.password !== token_user_data.data.password) return false;
    });
    const access_token = generateAccessToken({
        _id: user_data._id,
        username: user_data.username,
        email: user_data.email
    });
    return access_token;
};

// AUTHENTICATE TOKEN
function authenticateReqToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        const refresh_token = await Key.find({
            user_id: user.data._id
        });
        if (!refresh_token) return res.sendstatus(403)
        req.user = user;
        next();
    })
}

module.exports = {
    sendValidationEmail, loginUser, registerUser, authenticateReqToken
};