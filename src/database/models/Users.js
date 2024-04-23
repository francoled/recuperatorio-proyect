module.exports = (sequelize, DataTypes) => {
    let alias = 'Users';
    let columns = {

  ID_USERS: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_CATEGORIA: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  NOMBRE: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  APELLIDO: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  EMAIL: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  CONTRASEÑA: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  IMAGEN: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  deleted_at:{
    type:DataTypes.DATE,
    allowNull:true
  },
  username:{
    type:DataTypes.STRING(225),
    allowNull:false

  }
    }
 
 let config = {
    tableName: 'users',
    timestamps: false
}
let User = sequelize.define(alias, columns, config);
User.associate = function(models) {
  User.belongsTo(models.Categoria, {
    foreignKey: 'ID_CATEGORIA',
    as: 'categoria'
  });
}

return User
}
