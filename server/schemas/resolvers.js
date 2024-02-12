const { Pet, User } = require('../models');
const bcrypt = require('bcrypt');

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
    },
    currentUser: async (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error('Authentication required');
      }

      return await User.findById(currentUser._id);
    }
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      
      await user.save();
      
      return { _id: user._id, username: user.username, email: user.email };
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

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