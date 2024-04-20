
const {validationResult} = require("express-validator");  

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

            /* db.user.create(); */
        }
        else{
            res.render('login',{
                errors: errors.array(),
                oldData: req.body
            })
        }
    },
    loginProcess:async(req, res)=>{

    },
    delete:async(req, res)=>{
        db.user.deestroy({where:{id:idUser}})
    }



    


}

module.exports = userController;