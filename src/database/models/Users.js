module.exports = (sequelize, DataTypes) => {
    let alias = 'Users';
    let columns = {

  ID_USER: {
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
    allowNull: true
  },
  APELLIDO: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  EMAIL: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CONTRASEÑA: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  IMAGEN: {
    type: DataTypes.STRING(100),
    allowNull: true
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
