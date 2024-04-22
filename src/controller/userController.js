
const {validationResult} = require("express-validator");  
const bcrypt = require('bcryptjs');
const db = require("../database/models/index");

const userController={
    index:(req, res)=>{
        if(session){
            res.render("home")
        }
        res.redirect('/login')
    },
    Login:(req,res)=>{
        res.render("login");
    },
    register:(req,res)=>{
        res.render("register");
    },
    account:(req,res)=>{
        res.render('home');
    },
    registerProcess: (req, res)=>{

        let errors = validationResult(req);
        if( errors.isEmpty()){
            let pass = bcrypt.hashSync(req.body.password,10);
            db.Users.create({

                NOMBRE:req.body.name,
                APELLIDO:req.body.lastName,
                EMAIL:req.body.email,
                CONTRASEÑA:pass,
                IMAGEN:__filename,
                
            }); 
            res.redirect('/home')
        }
        else{
            res.render('register',{
                errors: errors.mapped(),
                oldData: req.body
            })
           
           
        }
    },

    loginProcess:async(req, res)=>{
        try {
            db.Users.findOne({where:{
                email:req.body.email
            }})
            if(bcrypt.compareSync(req.body.password,db.Users.password)){
    
    
            }
            
        } catch (error) {
            
        }
    },

    delete:async(req, res)=>{try {
        db.user.destroy({where:{id:idUser}})
        
    } catch (error) {
        
    }


    },
    update:async(req,res)=>{

        db
    }



    


}

module.exports = userController;