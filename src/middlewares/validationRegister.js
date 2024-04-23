const { body } = require("express-validator");
const path = require('path');
const fs = require('fs')

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
    body('password').trim()
    .notEmpty().withMessage('La Contraseña no puede estar vacia').bail()
    .isLength({min:8}).withMessage('debe contener al menos 8 caracteres').bail()
    .matches(/[A-Z]/).withMessage('Debe contener al menos una mayúscula')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Debe contener al menos un carácter especial'),

        body('image').custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                if (req.file) {
                    const filetypes = /jpeg|jpg|png|gif/;
                    const extname = req.file.originalname.toLowerCase().split('.').pop();
                    const validSize = req.file.size < 1000000; // Menor a 1MB
    
                    if (filetypes.test(extname) && validSize) {
                        resolve(true);
                    } else {
                        const filePath = path.join(__dirname, '../../public/image', req.file.filename);
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(err);
                            }
                            if (!validSize) {
                                reject(new Error('El tamaño del archivo debe ser menor a 1MB'));
                            } else {
                                reject(new Error('El archivo debe ser de tipo jpeg, jpg, png o gif'));
                            }
                        });
                    }
                } else {
                    resolve(true);
                }
            });
        })
    ];



module.exports = validationResult;