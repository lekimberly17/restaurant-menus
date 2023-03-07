// Define the model! Here are the details:
// Create a new Item file in the models directory
// The Item model should have name and image properties, both of which are strings

// The Item model should also have price (number) and vegetarian (boolean) properties

// Make sure to export the model and import it anywhere you need it!

const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Item model
let Item;

Item = sequelize.define('Item', {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.NUMBER,
    vegetarian: Sequelize.BOOLEAN
})


module.exports = {Item};