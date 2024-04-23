function userLogged (req,res,next){
    if(req.session.userLogged != undefined){

        res.redirect('/user/account');
    }

    next();

}

module.exports = userLogged;