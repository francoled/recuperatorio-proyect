
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require("../database/models/index");

const userController = {
    index: (req, res) => {
        if (session) {
            res.render("home")
        }
        res.redirect('/login')
    },
    edit: (req, res) => {

        res.render('edit', { user: req.session.userLogged });
    },
    Login: (req, res) => {
        res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    },
    account: (req, res) => {

        res.render('home', { user: req.session.userLogged });
    },
    logOut: (req, res) => {
        req.session.destroy(function (err) {
            if (err) {
                console.error(err);
            } else {
                res.redirect('/');
            }
        });
    },
    registerProcess: async (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let pass = bcrypt.hashSync(req.body.password, 10);
            let userInDB = await db.Users.findOne({ where: { EMAIL: req.body.email } });

            if (userInDB == undefined) {
                let image = req.file ? req.file.filename : 'default.png';
                let user = await db.Users.create({
                    ID_CATEGORIA: 2,
                    NOMBRE: req.body.name,
                    APELLIDO: req.body.lastName,
                    EMAIL: req.body.email,
                    CONTRASEÑA: pass,
                    IMAGEN: image,
                    deleted_at: null,
                    username: req.body.userName

                });
                req.session.userLogged = user;
                res.redirect('/user/account');
            } else {
                res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
        }
        else {
            res.render('register', {
                errors: errors.mapped(),
                oldData: req.body
            })
            console.log(errors)

        }
    },

    loginProcess: async (req, res) => {
        try {
            let userInDB = await db.Users.findOne({ where: { EMAIL: req.body.email } });

            if (userInDB) {
                let user = await db.Users.findOne({
                    where: {
                        EMAIL: req.body.email
                    }
                })
                if (bcrypt.compareSync(req.body.password, user.CONTRASEÑA)) {
                    req.session.userLogged = user;

                    if (req.body.remember_user) {

                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })

                    }
                    res.redirect('/user/account');

                } else {
                    res.render('login', {
                        errors: {
                            password: {
                                msg: 'la contraseña no coincide'
                            }
                        },
                        oldData: req.body
                    });
                }


            } else {
                res.render('login', {
                    errors: {
                        email: {
                            msg: 'Este email no esta registrado'
                        }
                    },
                    oldData: req.body
                });

            }

        } catch (error) {

        }
    },
    update: async (req, res) => {
        try {





            let image = req.file ? req.file.filename : req.session.userLogged.IMAGEN;
            let contra = req.body.password;
            let confirmContra = req.body.newPassword
            if (contra && confirmContra) {
               
                let contraBody = bcrypt.compareSync(req.body.password, req.session.userLogged.CONTRASEÑA);
                if (!contraBody) {
                    return res.render('edit', {
                        errors: {
                            password: {
                                msg: 'la contraseña no coincide'
                            }
                        },
                        user:req.session.userLogged,
                        oldData: req.body
                    });
                }
            }


            let contraVieja = req.session.userLogged.CONTRASEÑA
            let contraNueva = req.body.newPassword;
            let newContra;
            if (contraNueva) {
                newContra = bcrypt.hashSync(contraNueva, 10)
            } else {
                newContra = contraVieja
            }


            console.log(req.body);

            let user = await db.Users.update({
                ID_CATEGORIA: 2,
                NOMBRE: req.body.name,
                APELLIDO: req.body.lastName,
                EMAIL: req.body.email,
                CONTRASEÑA: newContra,
                IMAGEN: image,
                username: req.body.userName,
            }, {
                where: {
                    ID_USERS: req.params.id
                }
            })
            let updatedUser = await db.Users.findOne({
                where: {
                    ID_USERS: req.params.id
                }
            });

            if (updatedUser) {
                req.session.userLogged = updatedUser;
                res.redirect('../../user/account');
            }
        

} catch (error) {

}
    } 
}

module.exports = userController;