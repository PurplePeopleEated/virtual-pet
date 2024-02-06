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
      "owner": userData[0]._id,
      "hunger": 50,
      "lastFed": 0,
      "lastPlayed": 0
      
    },
    {
      "name": "TestPET",
      "species": "Cat",
      "owner": userData[1]._id,
      "hunger": 0,
      "lastFed": 0,
      "lastPlayed": 0
    }
  ];



db.once('open', async () => {
  //await cleanDB('Pet', 'teches');
  await cleanDB('Pet');

  await Pet.insertMany(petData);
  await User.insertMany(userData)

  console.log('Pets/Users seeded!');
  process.exit(0);
});