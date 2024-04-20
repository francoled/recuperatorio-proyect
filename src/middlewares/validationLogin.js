const {check} = require('express-validator');

const validationResult=[

    check(email).isEmpty().withMessage('debe completar el campo').bail()
    .isEmail().withMessage('email invalido'),
    check(password),
]

module.exports = validationResult;