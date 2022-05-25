//components
import { Text, Grid } from '@chakra-ui/react';
import OrderCard from './OrderCard';

//types
import { FC } from 'react';
import { MyOrder } from '@appTypes/order';

interface Props {
  orderData: MyOrder[];
}

const Body: FC<Props> = ({ orderData }) => {
  return (
    <>
      <Text fontSize="2xl" fontWeight={'bold'}>
        Your Orders
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {orderData.map((order: MyOrder) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </Grid>
    </>
  );
};

export default Body;
