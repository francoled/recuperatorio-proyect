const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js")
const usersRoutes  = require('./user.routes')


router.get('/', userController.Login);

router.get('/login', userController.Login);

router.use('/register', usersRoutes);

router.get('/account', userController.account);

module.exports = router;