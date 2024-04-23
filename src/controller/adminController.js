const db = require ('../database/models/index');


const adminController = {
    list: async (req, res)=>{
         try {
             const user = await db.Users.findAll({where:{deleted_at:null}});
             res.render('userList',{user: user})
         } 
         catch (error) {
            
         }

        

        
    },
    
    delete:async(req, res)=>{try {
        db.Users.update({where:{id:idUser}})
        
    } catch (error) {
        
    }
    },


};

module.exports = adminController;
