const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    "Query to get all categories"
    getCategories: [Category!]
    "Query to get all sub categories"
    getSubCategories: [SubCategory!]
    "Query sub categories by their parent category id"
    getSubCategoriesByParentId(parentId: ID!): [SubCategory!]
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
  type SubCategory {
    "Mongo ID of the category"
    _id: ID!
    "Name of the category"
    name: String
    "slug of the category"
    slug: String
    "parent id of sub category"
    parent: ID!
    createdAt: String
    updatedAt: String
  }
`;

module.exports = typeDefs;
