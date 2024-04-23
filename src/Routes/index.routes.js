const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js")
const adminController = require("../controller/adminController.js")
const multer = require('multer');
const path = require('path');
const validationRegister = require('../middlewares/validationRegister.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');
const apiRoutes = require('./api.routes.js');
const userLogged = require('../middlewares/userLoggedMiddleware.js');
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,"public/image");

    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage : storage});


router.get('/', userController.Login);
router.post('/', userController.loginProcess)

/* REGISTRO DE USUARIO */
router.get('/user/register',userLogged, userController.register); 
router.post( '/user/register',userLogged, upload.single("image"), validationRegister  ,  userController.registerProcess); 


router.get('/user/account', guestMiddleware ,  userController.account);

router.get('/user/account/:id',guestMiddleware, userController.edit);
router.put('/user/account/:id',guestMiddleware, upload.single("image"), validationRegister, userController.update);

router.get('/logout',guestMiddleware, userController.logOut);

/* RUTAS PARA ADMIN */
router.get("/users", adminController.list);
router.use('/api', apiRoutes);



module.exports = router;