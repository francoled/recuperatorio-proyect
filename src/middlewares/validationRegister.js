const {check} = require("express-validator");

const validationResult = [
check('name')
.notEmpty().withMessage('Debe completar el campo').bail()
.isLength({min:4}).withMessage('Debe tener al menos 4 caracteres').bail(),
check('lastName')
.notEmpty().withMessage('Debe completar el campo').bail()
.isLength({min:4}).withMessage('Debe tener al menos 4 caracteres').bail(),
check('userName')
.notEmpty().withMessage('Debe completar el campo').bail()
.isLength({min:5}).withMessage('Debe tener al menos 5 caracteres').bail(),
check('email')
.isEmail().withMessage('debe ser un email valido').bail(),
check('password')
.isLength({min:8}),
check('userImage'),
]

module.exports = validationResult;