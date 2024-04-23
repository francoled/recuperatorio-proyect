const {check} = require('express-validator');

const validationResult=[

    check(email)
    .isEmpty().withMessage('debe completar el campo').bail()
    .isEmail().withMessage('email invalido'),
    check(password)
    .isEmpty().withMessage('debe completar el campo').bail(),
    
]

module.exports = validationResult;