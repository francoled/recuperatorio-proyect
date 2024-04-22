async function  allUser(req,res){
    const users =await db.Users.findAll()
    return res.status(200).json( {
        length:users.length,
        users:users,
    }   )
}