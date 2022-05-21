//components
import { AppSpinner } from '@components/global';
import { Box, Center, Flex } from '@chakra-ui/react';
import { LeftCart, RightCart } from '@components/cart';

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
  });

  if (loading)
    return (
      <Center>
        <AppSpinner />
      </Center>
    );

  return (
    <Flex>
      <Box bgColor="red" flex="3">
        <LeftCart />
      </Box>
      <Box bgColor="blue" flex="1">
        <RightCart />
      </Box>
    </Flex>
  );
};

export default View;
