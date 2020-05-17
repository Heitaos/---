'use strict';
module.exports = (sequelize, DataTypes) => {
    const balanceRecord = sequelize.define('balanceRecord', {
        uId: {
            type: DataTypes.INTEGER,
            references: 'user',
            referencesKey: 'id'
        },
        operation: DataTypes.ENUM('发布任务', '完成任务', '充值', '提现'),
        state: DataTypes.ENUM('通过', '拒绝'),
        money: DataTypes.DECIMAL(10, 2),
        time: DataTypes.DATE,
    }, {
        timestamps: false
    });
    balanceRecord.associate = function(models) {
        // associations can be defined here
        balanceRecord.belongsTo(models.user, { foreignKey: 'uId' });
    };
    return balanceRecord;
};