const { Pet, User } = require('../models');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    pet: async (_, { id }) => {
      return await Pet.findById(id);
    },
    petsByUser: async (_, { userId }) => {
      return await Pet.find({ owner: userId });
    },
    getAllUsers: async () => {
      return await User.find();
    },
    getAllPets: async () => {
      return await Pet.find();
    }
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    createPet: async (_, { name, species, ownerId }) => {
      const pet = new Pet({ name, species, owner: ownerId });
      await pet.save();
      return pet;
    },
  },
  User: {
    pets: async (user) => {
      return await Pet.find({ owner: user._id });
    },
    petCount: (user) => {
      return user.pets.length;
    },
  },
  Pet: {
    owner: async (pet) => {
      return await User.findById(pet.owner);
    },
  },
};

module.exports = resolvers;