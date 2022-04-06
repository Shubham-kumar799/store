import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      _id
      name
      slug
    }
  }
`;

export const GET_SUB_CATEGORIES_BY_PARENT_ID = gql`
  query getSubCategoriesByParentId($parentId: ID!) {
    getSubCategoriesByParentId(parentId: $parentId) {
      _id
      name
      parent
      slug
    }
  }
`;
