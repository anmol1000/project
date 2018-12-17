var Sequelize = require('sequelize');
var UserMapping = require('./role-permission');

module.exports = function (sequelize) {
    return sequelize.define('User',
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            msisdn: {
                type: Sequelize.STRING,
                allowNull: false
            },
            firebaseId: {
                field:'firebase_id',
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            parentCode: {
                field:'parent_code',
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null
            },
            gender: {
                type: Sequelize.STRING
            },
            age:{
                type:Sequelize.INTEGER
            },
            occupation: {
                type:Sequelize.STRING
            }
        }, {
            tableName: 'users',
            createdAt:'created_ts',
            updatedAt: 'updated_ts'
        }
    );
};
