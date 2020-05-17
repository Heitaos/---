'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            uName: {
                type: Sequelize.STRINGi,
                unique: true,
            },
            password: {
                type: Sequelize.STRING
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};