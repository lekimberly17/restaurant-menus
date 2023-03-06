const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
} = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });

        // Populate the database with seed data
        await Restaurant.bulkCreate(seedRestaurant);
        await Menu.bulkCreate(seedMenu);
    });

    test('can create a Restaurant', async () => {
        const restaurant = await Restaurant.create({
            name: 'Pizza Hut',
            location: 'New York',
            cuisine: 'Pizza',
        });
        expect(restaurant.name).toBe('Pizza Hut');
        expect(restaurant.location).toBe('New York');
        expect(restaurant.cuisine).toBe('Pizza');
    });

    test('can create a Menu', async () => {
        const menu = await Menu.create({
            title: 'Desserts',
        });
        expect(menu.title).toBe('Desserts');
    });

    test('can find Restaurants', async () => {
        const restaurants = await Restaurant.findAll();
        expect(restaurants.length).toBe(4);
        expect(restaurants[0].name).toBe('AppleBees');
        expect(restaurants[1].name).toBe('LittleSheep');
        expect(restaurants[2].name).toBe('Spice Grill');
    });

    test('can find Menus', async () => {
        const menus = await Menu.findAll();
        expect(menus.length).toBe(4);
        expect(menus[0].title).toBe('Breakfast');
        expect(menus[1].title).toBe('Lunch');
        expect(menus[2].title).toBe('Dinner');
    });

    test('can delete Restaurants', async () => {
        // Find a restaurant to delete
        const restaurantToDelete = await Restaurant.findOne({ where: { name: 'AppleBees' } });
        await restaurantToDelete.destroy();

        // Make sure the restaurant was deleted
        const restaurants = await Restaurant.findAll();
        expect(restaurants.length).toBe(3);
        expect(restaurants[0].name).toBe('LittleSheep');
        expect(restaurants[1].name).toBe('Spice Grill');
    });
});
