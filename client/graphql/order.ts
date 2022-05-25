import { gql } from '@apollo/client';

export const GET_ORDERS_BY_USER_ID = gql`
  query getOrdersByUserId($userId: String!) {
    getOrdersByUserId(userId: $userId) {
      _id
      orderedBy
      createdAt
      paymentIntent {
        id
        object
        client_secret
        livemode
        payment_method
        status
        payment_method_types
        currency
        capture_method
        amount
      }
      createdAt
      products {
        product {
          _id
          name
          description
          slug
          price
          images {
            public_id
            url
          }
        }
        count
      }
      orderStatus
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      _id

      orderedBy
      createdAt
      updatedAt
      orderStatus
      paymentIntent {
        id
        amount
        status
      }
      products {
        count
        product {
          _id
          price
        }
      }
    }
  }
`;
