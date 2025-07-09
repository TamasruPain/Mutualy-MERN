const express = require('express');
const router = express.Router();
const { signupUser, signinUser, getUser, deleteUser } = require('../Controllers/auth.controller');
const ensureAuthenticated = require('../Middleware/Auth');
const {signupValidation, signinValidation} = require("../Middleware/AuthValidation");

router.post('/signup', signupValidation ,signupUser);
router.post('/signin', signinValidation,signinUser);
router.get('/getuser', getUser);
router.delete('/delete/:userid', ensureAuthenticated, deleteUser);

module.exports = router;
