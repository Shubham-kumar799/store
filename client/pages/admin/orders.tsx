//components
import { Box, Center, Divider, Grid } from '@chakra-ui/react';
import { Header, OrderCardForAdmin } from '@components/orders';

//types
import { NextPage } from 'next';
import { Order } from '@appTypes/order';

//utils
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '@graphql/order';
import { AppSpinner } from '@components/global';

const Orders: NextPage = () => {
  const { loading, data } = useQuery(GET_ORDERS);

  if (loading) {
    return (
      <Center>
        <AppSpinner />
      </Center>
    );
  }
  return (
    <Box>
      <Header />
      <Divider />
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {data?.getOrders.map((o: Order) => (
          <OrderCardForAdmin order={o} />
        ))}
      </Grid>

      {/* <Flex wrap="wrap">
        {data?.getOrders.map((o: Order) => (
          <OrderCardForAdmin order={o} />
        ))}
      </Flex> */}
    </Box>
  );
};

export default Orders;
