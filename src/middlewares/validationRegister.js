const { body } = require("express-validator");

const validationResult = [
    body('name')
        .notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({ min: 4 }).withMessage('Debe tener al menos 4 caracteres'),
    body('lastName')
        .notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({ min: 4 }).withMessage('Debe tener al menos 4 caracteres'),
    body('userName')
       .notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres'),
    body('email')
        .isEmail().withMessage('debe ser un email valido'),
    body('password')
        .isLength({ min: 8 }).withMessage('la contraseña debe tener minimo 8 caracteres'),

];

module.exports = validationResult;