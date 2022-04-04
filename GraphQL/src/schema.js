const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    getCategories: [Category!]
  }

  type Category {
    "Mongo ID of the category"
    _id: ID!
    "Name of the category"
    name: String
    "slug of the category"
    slug: String
    createdAt: String
    updatedAt: String
  }
`;

module.exports = typeDefs;
