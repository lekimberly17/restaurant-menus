const path = require('path');
const { Sequelize } = require('sequelize');

// TODO - connect to db via sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database123.sqlite"
})

module.exports = {
    sequelize
};
