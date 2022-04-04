import { gql } from '@apollo/client';

export const GETCATEGORIES = gql`
  query getCategories {
    getCategories {
      _id
      name
      slug
    }
  }
`;
