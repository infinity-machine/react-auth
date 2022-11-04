const api_router = require('express').Router();

const { User } = require('../models');
const { authenticateReqToken } = require('../controllers');

// GET ALL USERS
api_router.get('/users', authenticateReqToken, async (req, res) => {
    const users = await User.find()
    res.json(users)
})

// GET YOUR USER WITH AUTH
api_router.get('/user', authenticateReqToken, async (req, res) => {
    const user_data = await User.findOne({
        username: req.user.data.username,
        email: req.user.data.email
    })
    res.json(user_data)
})

module.exports = api_router;