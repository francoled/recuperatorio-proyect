const express = require("express");
const router = express.Router();
const path = require('path');
const userController = require('../controller/userController.js')
const multer = require('multer');
const validationRegister = require('../middlewares/validationRegister.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');

let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,"public/image");

    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage : storage});



router.get('/', userController.register);

router.post('/',  validationRegister /*, upload.single("userImage"), */, userController.registerProcess); 

router.get('/account',guestMiddleware, userController.account);


module.exports = router