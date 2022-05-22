//components
import { Box, Flex, Center } from '@chakra-ui/react';
import { OrderSummary, OrderInfo } from '@components/checkout';
import { AppSpinner } from '@components/global';

//types
import type { NextPage } from 'next';

//utils
import { useQuery } from '@apollo/client';
import { GET_CART_BY_USER_ID } from '@graphql/cart';
import { useAppSelector, selectUser } from '@store';

const Checkout: NextPage = () => {
  const user = useAppSelector(selectUser);
  const { data, loading } = useQuery(GET_CART_BY_USER_ID, {
    variables: { userId: user._id },
    fetchPolicy: 'network-only',
  });

  if (loading)
    return (
      <Center>
        <AppSpinner />
      </Center>
    );

  return (
    <>
      {data?.getCartByUserId && (
        <Flex>
          <Box p={2} wordBreak={'break-word'} flex="2">
            <OrderInfo />
          </Box>
          <Box p={2} flex="2">
            <OrderSummary
              products={data.getCartByUserId.products}
              grandTotal={data.getCartByUserId.cartTotal}
            />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Checkout;
