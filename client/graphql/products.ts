import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      _id
      category {
        _id
        name
        slug
      }
      slug
      brand
      createdAt
      updatedAt
      subCategories {
        name
        _id
        slug
      }
      name
      description
      price
      quantity
      sold
      images {
        public_id
        url
      }
      shipping
      color
    }
  }
`;
