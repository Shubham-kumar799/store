import { gql } from '@apollo/client';

export const GET_COUPONS = gql`
  query getCoupons {
    getCoupons {
      name
      _id
      expiryDate
      discount
    }
  }
`;
