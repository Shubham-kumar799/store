//components
import { AppSpinner } from '@components/global';
import { Box, Center, Flex } from '@chakra-ui/react';
import { LeftCart, RightCart, EmptyCart } from '@components/cart';

//types
import { NextPage } from 'next';

//utils
import { useAppSelector, selectUser } from '@store';
import { useQuery } from '@apollo/client';
import { GET_CART_BY_USER_ID } from '@graphql/cart';

const View: NextPage = () => {
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
      {data.getCartByUserId && data.getCartByUserId.products.length !== 0 ? (
        <Flex>
          <Box wordBreak={'break-word'} flex="3">
            <LeftCart
              cartId={data.getCartByUserId._id}
              cartProducts={data.getCartByUserId.products}
              cartTotal={data.getCartByUserId.cartTotal}
            />
          </Box>
          <Box flex="1">
            <RightCart
              cartCount={data.getCartByUserId.products.length}
              cartTotal={data.getCartByUserId.cartTotal}
            />
          </Box>
        </Flex>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default View;
