import { gql } from '@apollo/client';

export const ALL_USERS = gql`
  query AllUsers {
    users: allUsers {
      id
      name
      country
      city
      birthDate
      position
      comments
      
    }
  }

`;

export const ADD_USERS = gql`
mutation AddUSers(
  $name:String!
  $country: String!
  $city: String!
  $birthDate:  String!
  $position: String!
  $comments: String!
){
    newUsers:createUser(
      name:$name
      country: $country,
      city: $city,
      birthDate: $birthDate,
      position: $position,
      comments: $comments,
    ) {
        name
        country
        city
        birthDate
        position
        comments
    }
}
`;
export const UPDATE_USERS = gql`
mutation UpdateUser(
  $id: ID!
  $name:String
  $country: String
  $city: String
  $birthDate: String
  $position: String
  $comments: String
){
  updateUser(
    id:$id
    name:$name
    country: $country,
    city: $city,
    birthDate: $birthDate,
    position: $position,
    comments: $comments,
  ) {
    id
    name
    country
    city
    birthDate
    position
    comments
  }
}
`;

export const DELETE_USER = gql`
  mutation RemoveUser($id: ID!){
    removeUser(id:$id) {
      id
      name
    }
  }
`;

