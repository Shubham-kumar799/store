//components
import { Box } from '@chakra-ui/react';
import { Body, NoData } from '@components/myOrders';
import { AppLoading } from '@components/global';

//types
import { FC } from 'react';

//utils
import { useQuery } from '@apollo/client';
import { GET_ORDERS_BY_USER_ID } from '@graphql/order';
import { selectUser, useAppSelector } from '@store';

const MyOrders: FC = () => {
  const user = useAppSelector(selectUser);
  const { data, loading } = useQuery(GET_ORDERS_BY_USER_ID, {
    variables: { userId: user._id },
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Box p={4}>
      {data.getOrdersByUserId && data.getOrdersByUserId.length !== 0 ? (
        <Body orderData={data.getOrdersByUserId} />
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default MyOrders;
