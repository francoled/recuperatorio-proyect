const { check } = require("express-validator");

const validationResult = [
    check('name')
        .notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({ min: 4 }).withMessage('Debe tener al menos 4 caracteres'),
    check('lastName')
        .notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({ min: 4 }).withMessage('Debe tener al menos 4 caracteres'),
    check('userName')
        .notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres'),
    check('email')
        .isEmail().withMessage('debe ser un email valido').bail(),
    check('password')
        .isLength({ min: 8 }).withMessage('la contraseña debe tener minimo 8 caracteres'),

]

module.exports = validationResult;