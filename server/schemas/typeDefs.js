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
    hunger: Int!
    lastFed: String!
    lastPlayed: String!
    owner: User!
  }

  type Query {
    user(id: ID!): User
    pet(id: ID!): Pet
    petsByUser(userId: ID!): [Pet!]!
  }

  type Mutation {
    createUser(username: String!, email: String!): User!
    createPet(name: String!, species: String!, ownerId: ID!): Pet!
  }
`;

module.exports = typeDefs;