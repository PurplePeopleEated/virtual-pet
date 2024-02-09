import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const CREATE_PET = gql`
  mutation CreatePet($name: String!, $species: String!, $ownerId: ID!) {
    createPet(name: $name, species: $species, ownerId: $ownerId) {
      _id
      name
      species
      hunger
      lastFed
      lastPlayed
      owner {
        _id
        username
        email
      }
    }
  }
`;