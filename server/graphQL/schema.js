const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    getUsers: [User!]
    getUser(id: ID!): User
  }

  "A user is any entity that user the app"
  type User {
    "Name of the user"
    name: String!
    "Email of the user"
    email: String!
    "Cart of the User"
    cart: [String]
    "Address of the user"
    address: String
    "Role of the User"
    role: String
  }
`;

module.exports = typeDefs;
