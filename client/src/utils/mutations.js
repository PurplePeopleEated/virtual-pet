import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      message
    }
  }
`

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

export const UPDATE_PET_NAME = gql`
  mutation UpdatePetName($id: ID!, $name: String!) {
    updatePetName(id: $id, name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_PET = gql`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id) {
      _id
      name
    }
  }
`;

// TODO: Add mutation to update pet's hunger
export const UPDATE_PET_HUNGER = gql`
  mutation FeedPet($_id: ID!, $hunger: Int!) {
    feedPet(_id: $_id, hunger: $hunger) {
      _id
      name
      hunger
      lastFed
    }
  }
`;

// TODO: Add mutation to update pet's lastPlayed timestamp
export const UPDATE_PET_LAST_PLAYED = gql`
  mutation UpdatePetLastPlayed($_id: ID!, $lastPlayed: String!) {
    updatePetLastPlayed(_id: $_id, lastPlayed: $lastPlayed) {
      _id
      name
      happiness
      lastPlayed
    }
  }
`;