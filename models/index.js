const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

// Multiple menus can be added to a Restaurant.

Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)

// Many-to-Many
Item.belongsToMany(Menu,{ through: 'item_menus' });
Menu.belongsToMany(Item,{ through: 'item_menus' });

module.exports = { Restaurant, Menu, Item }
