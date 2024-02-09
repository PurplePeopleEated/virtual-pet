import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      _id
      username
      email
      pets {
        _id
        name
        species
        hunger
        lastFed
        lastPlayed
      }
      petCount
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const GET_PET = gql`
  query GetPet($petId: ID!) {
    pet(id: $petId) {
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

export const GET_PETS_BY_USER = gql`
  query GetPetsByUser($userId: ID!) {
    petsByUser(userId: $userId) {
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

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      username
      email
    }
  }
`;

export const GET_ALL_PETS = gql`
  query GetAllPets {
    getAllPets {
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