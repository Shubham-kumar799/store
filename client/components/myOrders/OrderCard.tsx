//components
import { Box, HStack, Badge, Text, Divider } from '@chakra-ui/react';
import OrderTable from './OrderTable';

//types
import { FC } from 'react';
import { MyOrder } from '@appTypes/order';
import Image from 'next/image';
import { BiRupee } from 'react-icons/bi';

interface Props {
  order: MyOrder;
}

const badgeColors = {
  Not_Processed: 'gray',
  Fulfilled: 'brand.tertiary',
  Processing: 'brand.primary',
  Out_For_Delivery: 'yellow',
  Cancelled: 'red',
};

const OrderCard: FC<Props> = ({ order }) => {
  return (
    <Box borderWidth={2} m={4} rounded="xl">
      <HStack m={4} justifyContent={'space-between'}>
        <HStack>
          <Text>Order Id : </Text>
          <Text fontWeight={'bold'}>{order._id}</Text>
        </HStack>
        {/* @ts-ignore */}
        <Badge colorScheme={badgeColors[order.orderStatus]}>
          {order.orderStatus}
        </Badge>
      </HStack>
      <Divider />
      <OrderTable productInfo={order.products} />
      <HStack p={4}>
        <Text>Amount Paid : </Text>
        <BiRupee />
        <Text fontWeight={'bold'}>{order.paymentIntent.amount / 100}</Text>
      </HStack>
    </Box>
  );
};

export default OrderCard;
