'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        uName: DataTypes.STRING,
        password: DataTypes.STRING,
        balance: DataTypes.FLOAT,
    }, {
        timestamps: false
    });
    user.associate = function(models) {
        // URLSearchParams.hasMany(models.tasks,{
        //     foreignKey:'id'
        // })
    };
    return user;
};