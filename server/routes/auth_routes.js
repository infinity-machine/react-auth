const auth_router = require('express').Router();
const { sendValidationEmail, loginUser, registerUser } = require('../controllers');

// SEND VALIDATION EMAIL
auth_router.post('/register', async (req, res) => {
   sendValidationEmail(req.body.email)
})

auth_router.post('/validate', async (req, res) => {
    console.log('uhhhhhhh')
})



// auth_router.post('/register', async (req, res) => {
//     // MAIL VALIDATION 

//     // CREATE A HASH, ATTACH HASH TO EMAIL, SEND TO ADDRESS PROVIDED

//     // EMAIL CONTAINS LINK TO PAGE CONTAINING FORM FOR VALIDATING SENT HASH

//     // UPON VALIDATION, PROCEED WITH ACCOUNT CREATION PROCESS

//     const access_token = await registerUser(req.body);
//     if(!access_token) return res.sendStatus(400);
//     res.json(access_token);
// });

// LOGIN
auth_router.post('/login', async (req, res) => {
    const access_token = await loginUser(req.body);
    if (!access_token) return res.sendStatus(400);
    res.json(access_token);
});

module.exports = auth_router;