const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Restaurant model
let Restaurant;

Restaurant = sequelize.define('Restaurant', {
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    cuisine: Sequelize.STRING
})

module.exports = {Restaurant};