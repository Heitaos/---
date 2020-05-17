'use strict';
module.exports = (sequelize, DataTypes) => {
    const task = sequelize.define('task', {
        uId: {
            type: DataTypes.INTEGER,
            references: 'user',
            referencesKey: 'id'
        },
        title: DataTypes.STRING,
        cover: DataTypes.STRING,
        context: DataTypes.TEXT,
        people: DataTypes.INTEGER,
        money: DataTypes.DECIMAL(10, 2),
        model: DataTypes.BOOLEAN,
        time: DataTypes.DATE,
        hot: DataTypes.INTEGER,
        state: DataTypes.ENUM('发布', '草稿'),
    }, {
        timestamps: false
    });
    task.associate = function(models) {
        // associations can be defined here
        task.belongsTo(models.user, { foreignKey: 'uId' });
    };
    return task;
};