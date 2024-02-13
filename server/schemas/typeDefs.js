const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    pets: [Pet!]
    petCount: Int!
  }

  type Pet {
    _id: ID!
    name: String!
    species: String!
    birthday: String!
    hunger: Int!
    lastFed: String!
    happiness: Int!
    lastPlayed: String!
    owner: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    user(id: ID!): User
    pet(id: ID!): Pet
    petsByUser(userId: ID!): [Pet!]!
    getAllUsers: [User!]!
    getAllPets: [Pet!]!
    currentUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): AuthPayload
    logoutUser: Boolean!
    createPet(name: String!, species: String!, ownerId: ID!): Pet!
    updatePetName(id: ID!, name: String!): Pet!
    deletePet(id: ID!): Pet!
    feedPet(id: ID!, hunger: Int): Pet!
    playWithPet(id: ID!, lastPlayed: String): Pet!
  }
`;

module.exports = typeDefs;