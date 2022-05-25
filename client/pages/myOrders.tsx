//components
import { Box, Text, Center, Grid } from '@chakra-ui/react';

//types
import { FC } from 'react';
import { MyOrder } from '@appTypes/order';

//utils
import { useQuery } from '@apollo/client';
import { GET_ORDERS_BY_USER_ID } from '@graphql/order';
import { selectUser, useAppSelector } from '@store';
import { AppSpinner } from '@components/global';
import { OrderCard } from '@components/myOrders';

const MyOrders: FC = () => {
  const user = useAppSelector(selectUser);
  const { data, loading } = useQuery(GET_ORDERS_BY_USER_ID, {
    variables: { userId: user._id },
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <Center>
        <AppSpinner />
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight={'bold'}>
        Your Orders
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {data?.getOrdersByUserId.map((order: MyOrder) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </Grid>

      {/* <Flex justifyContent={'space-between'} wrap="wrap">
        {data?.getOrdersByUserId.map((order: MyOrder) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </Flex> */}
    </Box>
  );
};

export default MyOrders;
