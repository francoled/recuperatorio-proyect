
const {validationResult} = require("express-validator");  
const bcrypt = require('bcryptjs');

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

                nombre:req.body.name,
                apellido:req.body.lastName,
                email:req.body.email,
                contraseña:pass,
                
            }); 
            res.redirect('/')
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
    }



    


}

module.exports = userController;