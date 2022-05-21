import { gql } from '@apollo/client';

export const GET_CART_BY_USER_ID = gql`
  query getCartByUserId($userId: ID!) {
    getCartByUserId(userId: $userId) {
      products {
        count
        product {
          _id
          name
          description
          slug
          price
          quantity
          images {
            url
          }
          shipping
          color
          ratings {
            star
          }
          brand
        }
      }
      cartTotal
    }
  }
`;
