'use strict';
module.exports = (sequelize, DataTypes) => {
    const submit = sequelize.define('submit', {
        tId: {
            type: DataTypes.INTEGER,
            references: 'task',
            referencesKey: 'id'
        },
        uId: {
            type: DataTypes.INTEGER,
            references: 'user',
            referencesKey: 'id'
        },
        context: DataTypes.TEXT,
        shotcut: DataTypes.STRING,
        redpack: DataTypes.DECIMAL(10, 2),
        state: DataTypes.ENUM('未审核', '通过', '拒绝'),
    }, {
        timestamps: false
    });
    submit.associate = function(models) {
        // associations can be defined here
        submit.belongsTo(models.user, { foreignKey: 'uId' });
        submit.belongsTo(models.task, { foreignKey: 'tId' });
    };
    return submit;
};