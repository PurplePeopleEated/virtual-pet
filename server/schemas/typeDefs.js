const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
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
    lastPlayed: String!
    owner: User!
  }

  type Query {
    user(id: ID!): User
    pet(id: ID!): Pet
    petsByUser(userId: ID!): [Pet!]!
    getAllUsers: [User!]!
    getAllPets: [Pet!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createPet(name: String!, species: String!, ownerId: ID!): Pet!
    updatePetName(id: ID!, name: String!): Pet!
    deletePet(id: ID!): Pet!
  }
`;

module.exports = typeDefs;