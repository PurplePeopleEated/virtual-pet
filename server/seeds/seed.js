const db = require('../config/connection');
const { Pet } = require('../models');
const cleanDB = require('./cleanDB');

const petData = require('./petData.json');

db.once('open', async () => {
  //await cleanDB('Pet', 'teches');
  await cleanDB('Pet');

  await Pet.insertMany(petData);

  console.log('Pets seeded!');
  process.exit(0);
});
