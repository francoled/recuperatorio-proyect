const db = require ('../database/models/index');
const { loginProcess } = require('./userController');


const adminController = {
    /* login:(req,res)=>{
        res.render('login');
    },
    loginProcess:req */
    list: async (req, res)=>{
         try {
             const user = await db.Users.findAll({where:{deleted_at:null}},{include:[{association:'categoria'}]});
             res.render('usersList',{user: user})
         } 
         catch (error) {
            
         }

        

        
    },
    edit: async (req, res) => {
        try{
            let user = await db.Users.findByPk(req.params.id);
            res.render('editAdmin', { user: user });

        }catch{

        }
    },
    update: async (req, res) => {
        try {



            
            let userCat = await db.Users.findByPk(req.params.id);

            let image = req.file ? req.file.filename : userCat.IMAGEN;
            
            let confirmContra = req.body.newPassword
            if ( confirmContra) {
               
                let contraBody = bcrypt.compareSync(req.body.newPassword, userCat.CONTRASEÑA);
                if (!contraBody) {
                    return res.render('editAdmin', {
                        errors: {
                            password: {
                                msg: 'la contraseña no coincide'
                            }
                        },
                        user:userCat,
                        oldData: req.body
                    });
                }
            }


            let contraVieja = userCat.CONTRASEÑA;
            let contraNueva = req.body.newPassword;
            let newContra;
            if (contraNueva) {
                newContra = bcrypt.hashSync(contraNueva, 10)
            } else {
                newContra = contraVieja
            }
            let categoria = req.body.categoria? req.body.categoria:userCat.ID_CATEGORIA
            console.log(req.body);

            let user = await db.Users.update({
                ID_CATEGORIA: categoria,
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
            /* let updatedUser = await db.Users.findOne({
                where: {
                    ID_USERS: req.params.id
                }
            });

            if (updatedUser) {
                
            } */
            
            res.redirect('../../admin/users');

} catch (error) {

}
    },
    
    delete:async(req, res)=>{try {
        let date = new Date();
        await db.Users.update({
            deleted_at: date 
        },{where:{ID_USERS:req.params.id}})

        
        res.redirect('/admin/users');
    } catch (error) {
        
    }
    },


};

module.exports = adminController;
