const db = require('../config/connection');
const { Pet } = require('../models');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

const userData = [
    
    {
      "username": "TestUser",
      "email": "test@example.com",
      "password": "test123",
      "pets": []
      
    },
    {
    "username": "TestUser2",
    "email": "test2@example.com",
    "password": "TestUser",
    "pets": []
    }
  
];

const petData = [
    {
      "name": "Doge",
      "species": "Dog",
      "hunger": 50,
      "lastFed": 0,
      "lastPlayed": 0
      
    },
    {
      "name": "TestPET",
      "species": "Cat",
      "hunger": 0,
      "lastFed": 0,
      "lastPlayed": 0
    }
  ];



db.once('open', async () => {
  //await cleanDB('Pet', 'teches');
  try {
    await cleanDB('User');
    await cleanDB('Pet');

    const users = await User.insertMany(userData);
    console.log('Users seeded: ', users);

    const pets = await Pet.insertMany(petData.map((pet, index) => ({
      ...pet,
      owner: users[index]._id
    })));
    console.log('Pets seeded:', pets);

    await Promise.all(users.map(async (user, index) => {
      user.pets.push(pets[index]._id);
      await user.save();
    }));

    console.log('Pets added to owners!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});