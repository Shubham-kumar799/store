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

export const GET_PRODUCT_BY_SLUG = gql`
  query getProductBySlug($slug: String!) {
    getProductBySlug(slug: $slug) {
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
