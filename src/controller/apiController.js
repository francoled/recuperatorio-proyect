
const db = require('../database/models/index');

function users(NOMBRE, APELLIDO, EMAIL,ID_USERS){
    this.name = NOMBRE
    this.last_name = APELLIDO
    this.email = EMAIL
    this.detail  = "http://localhost:3000/api/users/"+ID_USERS
  }
  
  function user(NOMBRE, APELLIDO, EMAIL,IMAGEN){
      this.name = NOMBRE
      this.last_name = APELLIDO
      this.email = EMAIL
      this.image  = "/img/"+IMAGEN
    }


const apiController = {


    

        list: async function (req, res) {
            try {
              let allUsers =  await db.Users.findAll(
                {
                    include: [{ association: 'categoria' }]
                },{where:{deleted_at:null}});
              let newUsers = allUsers.map(usuario=> new users(usuario.NOMBRE, usuario.APELLIDO, usuario.EMAIL,usuario.ID_USERS));
              res.status(200).json({
                count: allUsers.length,
                users: newUsers,
              });
    
            } catch (error) { 
              console.log(error.message);
              res.set('Content-Type', 'text/plain');
              res.send("Error inesperado").status(500);
            }
          },
    
          getOne: async function (req, res) {
            try {
              let oneUser = await db.Users.findByPk(req.params.id, {include:[{association:'categoria'}]});
              let User = new user(oneUser.NOMBRE, oneUser.APELLIDO, oneUser.EMAIL, oneUser.IMAGEN);
              res.status(200).json({User});
            } catch (e) {
              res.send(e);
            }
          }

    
}

module.exports = apiController;