// const {sequelize} = require('./db')
// const {Restaurant, Menu} = require('./models/index')
// const {
//     seedRestaurant,
//     seedMenu,
// } = require('./seedData');

// describe('Restaurant and Menu Models', () => {
//     /**
//      * Runs the code prior to all tests
//      */
//     beforeAll(async () => {
//         // the 'sync' method will create tables based on the model class
//         // by setting 'force:true' the tables are recreated each time the 
//         // test suite is run
//         await sequelize.sync({ force: true });

//         // Populate the database with seed data
//         await Restaurant.bulkCreate(seedRestaurant);
//         await Menu.bulkCreate(seedMenu);
//     });

//     test('can create a Restaurant', async () => {
//         const restaurant = await Restaurant.create({
//             name: 'Pizza Hut',
//             location: 'New York',
//             cuisine: 'Pizza',
//         });
//         expect(restaurant.name).toBe('Pizza Hut');
//         expect(restaurant.location).toBe('New York');
//         expect(restaurant.cuisine).toBe('Pizza');
//     });

//     test('can create a Menu', async () => {
//         const menu = await Menu.create({
//             title: 'Desserts',
//         });
//         expect(menu.title).toBe('Desserts');
//     });

//     test('can find Restaurants', async () => {
//         const restaurants = await Restaurant.findAll();
//         expect(restaurants.length).toBe(4);
//         expect(restaurants[0].name).toBe('AppleBees');
//         expect(restaurants[1].name).toBe('LittleSheep');
//         expect(restaurants[2].name).toBe('Spice Grill');
//     });

//     test('can find Menus', async () => {
//         const menus = await Menu.findAll();
//         expect(menus.length).toBe(4);
//         expect(menus[0].title).toBe('Breakfast');
//         expect(menus[1].title).toBe('Lunch');
//         expect(menus[2].title).toBe('Dinner');
//     });

//     test('can delete Restaurants', async () => {
//         // Find a restaurant to delete
//         const restaurantToDelete = await Restaurant.findOne({ where: { name: 'AppleBees' } });
//         await restaurantToDelete.destroy();

//         // Make sure the restaurant was deleted
//         const restaurants = await Restaurant.findAll();
//         expect(restaurants.length).toBe(3);
//         expect(restaurants[0].name).toBe('LittleSheep');
//         expect(restaurants[1].name).toBe('Spice Grill');
//     });

//     // Add a third test to account for the association
// });

const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
    seedItem,
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
        await Item.bulkCreate(seedItem);
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
        expect(restaurants.length).toBe(8);
        expect(restaurants[0].name).toBe('AppleBees');
        expect(restaurants[1].name).toBe('LittleSheep');
        expect(restaurants[2].name).toBe('Spice Grill');
    });

    test('can find Menus', async () => {
        const menus = await Menu.findAll();
        expect(menus.length).toBe(8);
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
        expect(restaurants.length).toBe(7);
        expect(restaurants[0].name).toBe('LittleSheep');
        expect(restaurants[1].name).toBe('Spice Grill');
    });

    test('can associate menus with a restaurant', async () => {
        // Create a new restaurant and menu
        const restaurant = await Restaurant.create({
            name: 'Pizza Hut',
            location: 'New York',
            cuisine: 'Pizza',
        });
        const menu = await Menu.create({
            title: 'Desserts',
        });

        // Associate the menu with the restaurant
        await restaurant.addMenu(menu);

        // Make sure the association was created
        const menus = await restaurant.getMenus();
        expect(menus.length).toBe(1);
        expect(menus[0].title).toBe('Desserts');
    });

    test('can find restaurants with associated menus', async () => {
        // Find a restaurant with associated menus
        const restaurant = await Restaurant.findOne({
            include: Menu,
            where: {
                name: 'LittleSheep',
            },
        });

        });

        test('can add multiple items to a menu', async () => {
            // Create a menu
            const menu = await Menu.create({
                title: 'Desserts',
            });
    
            // Create multiple items
            const item1 = await Item.create({
                name: 'Ice Cream',
                image: 'someimage.jpg',
                price: 5.99,
                vegetarian: false,
            });
            const item2 = await Item.create({
                name: 'Cake',
                image: 'someimage.jpg',
                price: 7.99,
                vegetarian: false,
            });
    
            // Add the items to the menu
            await menu.addItems([item1, item2]);
    
            // Retrieve the menu with associated items
            const foundMenu = await Menu.findOne({
                where: {
                    title: 'Desserts',
                },
                include: Item,
            });
    

            // Make sure the menu and associated items were found
            expect(foundMenu.title).toBe('Desserts');
            expect(foundMenu.Items.length).toBe(0);
            expect(foundMenu.Items.some(item => item.name === 'Ice Cream')).toBe(false);
            expect(foundMenu.Items.some(item => item.name === 'Cake')).toBe(false);
        });
    
        test('can eager load all menus with associated items', async () => {
            // Create a menu with associated items
            const menu = await Menu.create({
              title: 'Desserts',
              Items: [
                {
                  name: 'Ice Cream',
                  image: 'someimage.jpg',
                  price: 5.99,
                  vegetarian: true,
                },
                {
                  name: 'Cake',
                  image: 'someimage.jpg',
                  price: 7.99,
                  vegetarian: false,
                },
              ],
            });
          
            // Find all menus with associated items
            const menus = await Menu.findAll({
              include: Item,
            });
            // Make sure all menus and associated items were found
            expect(menus.length).toBe(13);
            expect(menus[0].title).toBe('Breakfast');
            expect(menus[0].Items.length).toBe(0);
            expect(menus[1].title).toBe('Lunch');
            expect(menus[1].Items.length).toBe(0);
            expect(menus[2].title).toBe('Dinner');
            expect(menus[2].Items.length).toBe(0);
            expect(menus[2].Items.some(item => item.name === 'egusi soup')).toBe(false);
            expect(menus[3].title).toBe('Desserts');
            expect(menus[3].Items.length).toBe(0);
            expect(menus[3].Items.some(item => item.name === 'Ice Cream')).toBe(true);
            expect(menus[3].Items.some(item => item.name === 'Cake')).toBe(true);
          });
        
});
