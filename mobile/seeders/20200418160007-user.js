'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            uName: "张三",
            password: "111111"
        }, {
            uName: "李四",
            password: "111111"
        }, {
            uName: "王五",
            password: "111111"
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};