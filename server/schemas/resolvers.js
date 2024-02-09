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
    updatePetName: async (_, { id, name }) => {
      try {
        const pet = await Pet.findById(id);
        if (!pet) {
          throw new Error('Pet not found');
        }

        pet.name = name;

        await pet.save();

        return pet;
      } catch (error) {
        throw new Error(`Failed to update pet's name: ${error.message}`);
      }
    },

    deletePet: async (_, { id }) => {
      try {
        const pet = await Pet.findById(id);
        if (!pet) {
          throw new Error('Pet not found');
        }

        await pet.remove();

        return pet;
      } catch (error) {
        throw new Error(`Failed to delete pet: ${error.message}`);
      }
    },

    feedPet: async (_, { id }) => {
      const pet = await Pet.findById(id);
      if (!pet) {
        throw new Error('Pet not found');
      }
      pet.hunger += 10;
      pet.lastFed = Date.now();

      await pet.save();
      return pet;
    },

    playWithPet: async (_, { id }) => {
      const pet = await Pet.findById(id);
      if (!pet) {
        throw new Error('Pet not found');
      }

      pet.happiness += 10;
      pet.lastPlayed = Date.now();

      await pet.save();
      return pet;
    }
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