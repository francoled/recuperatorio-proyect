module.exports = (sequelize, DataTypes) => {
    let alias = 'Categoria';
    let columns = {
        ID_CATEGORIA: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        NOMBRE: {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    }

    let config = {
        tableName: 'categoria',
        timestamps: false
    }

    let Categoria = sequelize.define(alias, columns, config);
    Categoria.associate = function(models){
        Categoria.hasMany(models.Users,{
         as : 'Users',
         foreignKey: 'ID_CATEGORIA'
        })
       }

    return Categoria;
}
