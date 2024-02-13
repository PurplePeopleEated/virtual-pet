const { Pet, User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signToken, AuthenticationError } = require('../utils/auth');

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
    currentUser: async (_, __, { req }) => {
      // Extract the token from the request
      const token = req.headers.authorization || '';

      // Verify if the token has been revoked
      const isTokenRevoked = await isTokenRevoked(token);
      if (isTokenRevoked) {
        throw new AuthenticationError('Token has been revoked');
      }

      // Decode the token to get the user's information
      const decodedToken = decodeToken(token);

      // Ensure the token is valid and contains the necessary user information
      if (!decodedToken || !decodedToken._id) {
        throw new AuthenticationError('Invalid token');
      }

      // Fetch the user based on the decoded token
      const user = await User.findById(decodedToken._id);
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      return user;
    },

  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      
      await user.save();
      
      const token = signToken(user);
      return { _id: user._id, username: user.username, email: user.email, password: hashedPassword, token };
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = signToken(user);
      return { token, user };
    },

    logoutUser: async (_, __, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('User not logged in');
      }

      const token = currentUser.token;

      await revokeToken(token);

      return 'Logged out successfully';
    },

    createPet: async (_, { name, species, ownerId }) => {
      try {
    
        /*const ownerId = currentUser.data._id*/
    
        const pet = new Pet({ name, species, owner: ownerId });
        await pet.save();
    
        const user = await User.findById(ownerId);
        user.pets.push(pet._id);
        await user.save();
    
        //return { pet, owner: user };

        return { 
          _id: pet._id, // Return the pet's _id
          name: pet.name,
          species: pet.species,
          hunger: pet.hunger,
          lastFed: pet.lastFed,
          lastPlayed: pet.lastPlayed,
          owner: user 
        };
      } catch (error) {
        throw new Error(`Failed to create pet: ${error.message}`);
      }
    },

    updatePetName: async (_, { id, name }, { currentUser }) => {
      if (!currentUser) {
        throw new Error('Authentication required');
      }
      
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

    deletePet: async (_, { id }, { currentUser }) => {
      if (!currentUser) {
        throw new Error('Authentication required');
      }

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

    feedPet: async (_, { id, hunger }, { currentUser }) => {
      if (!currentUser) {
        throw new Error('Authentication required');
      }

      const pet = await Pet.findById(id);
      if (!pet) {
        throw new Error('Pet not found');
      }
      pet.hunger += 10;
      pet.lastFed = Date.now();

      await pet.save();
      return pet;
    },

    playWithPet: async (_, { id }, { currentUser }) => {
      if (!currentUser) {
        throw new Error('Authentication required');
      }

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

async function revokeToken(token) {
  try {
    await RevokedToken.create({ token });
    console.log('Token revoked successfully:', token);
  } catch (error) {
    console.error('Failed to revoke token:', error);
    throw new Error('Failed to revoke token');
  }
}

async function isTokenRevoked(token) {
  try {
    // Check if the token exists in the RevokedToken collection
    const revokedToken = await RevokedToken.findOne({ token });
    return revokedToken !== null;
  } catch (error) {
    console.error('Failed to check token revocation:', error);
    throw new Error('Failed to check token revocation');
  }
}

function decodeToken(token) {
  try {
    // Decode the token to get the user's information
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken;
  } catch (error) {
    console.error('Failed to decode token:', error);
    throw new AuthenticationError('Failed to decode token');
  }
}

module.exports = resolvers;